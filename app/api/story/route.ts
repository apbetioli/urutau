import { generateStory } from '@/utils/server/ai'

import { getUserByClerkId } from '@/utils/server/auth'
import { invokeLambda } from '@/utils/server/aws'
import { prisma } from '@/utils/server/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const maxDuration = 30

export const POST = async (request: Request) => {
  const user = await getUserByClerkId()

  const { prompt, language } = await request.json()

  const aiStory = await generateStory(prompt, language)
  const story = await prisma.story.create({
    data: {
      userId: user.id,
      public: false,
      language,
      ...aiStory,
    },
  })

  const { id, subject, content } = story
  const contentWithTitle = subject + '. ' + content

  await Promise.all([
    invokeLambda('urutau-serverless-dev-generateImage', { id, subject }),
    invokeLambda('urutau-serverless-dev-generateSpeech', {
      id,
      content: contentWithTitle,
    }),
  ])

  revalidatePath('/stories')
  revalidatePath('/feed')

  return NextResponse.json({ data: story })
}

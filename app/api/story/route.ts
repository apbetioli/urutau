import { generateImage, generateSpeech, generateStory } from '@/utils/server/ai'

import { NextResponse } from 'next/server'
import { getUserByClerkId } from '@/utils/server/auth'
import { prisma } from '@/utils/server/db'
import { revalidatePath } from 'next/cache'

export const maxDuration = 30

export const POST = async (request: Request) => {
  const user = await getUserByClerkId()

  const { prompt, language } = await request.json()

  const aiStory = await generateStory(prompt, language)
  const story = await prisma.story.create({
    data: {
      userId: user.id,
      language,
      ...aiStory,
    },
  })

  await Promise.all([
    generateImage(story.subject).then((buffer) =>
      prisma.image.create({
        data: {
          buffer,
          storyId: story.id,
        },
      }),
    ),
    generateSpeech(`${story.subject}.\n${story.content}`).then((buffer) =>
      prisma.speech.create({
        data: {
          buffer,
          storyId: story.id,
        },
      }),
    ),
  ])

  revalidatePath('/stories')
  revalidatePath('/feed')

  return NextResponse.json({ data: story })
}

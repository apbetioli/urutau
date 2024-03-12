import { generateImage, generateSpeech, generateStory } from '@/utils/server/ai'

import { getUserByClerkId } from '@/utils/server/auth'
import { prisma } from '@/utils/server/db'
import { uploadImage, uploadSpeech } from '@/utils/server/s3'
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

  const [image_url, speech_url] = await Promise.all([
    generateImage(story.subject).then((buffer) =>
      uploadImage(story.id, buffer),
    ),
    generateSpeech(`${story.subject}.\n${story.content}`).then((buffer) =>
      uploadSpeech(story.id, buffer),
    ),
  ])

  const updated = await prisma.story.update({
    data: {
      image_url,
      speech_url,
    },
    where: {
      id: story.id,
    },
  })

  revalidatePath('/stories')
  revalidatePath('/feed')

  return NextResponse.json({ data: updated })
}

import { prisma } from '@/utils/server/db'
import { uploadImage, uploadSpeech } from '@/utils/server/s3'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const stories = await prisma.story.findMany({
    include: {
      image: true,
      speech: true,
    },
  })

  await Promise.all(
    stories.map(async (story) => {
      const [image_url, speech_url] = await Promise.all([
        uploadImage(story.id, story.image!.buffer),
        uploadSpeech(story.id, story.speech!.buffer),
      ])

      await prisma.story.update({
        data: {
          image_url,
          speech_url,
        },
        where: {
          id: story.id,
        },
      })
    }),
  )

  return NextResponse.json({ data: 'ok' })
}

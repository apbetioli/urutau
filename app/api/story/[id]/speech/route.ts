import { NextResponse } from 'next/server'
import { generateTTS } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'

export const POST = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const user = await getUserByClerkId()

  const { id } = params

  const story = await prisma.story.findUniqueOrThrow({
    where: {
      id_userId: {
        id,
        userId: user.id,
      },
    },
    include: {
      speech: true,
    },
  })

  const buffer = await generateTTS(story.content)

  const speech = await prisma.speech.upsert({
    create: {
      buffer,
      storyId: story.id,
    },
    update: {
      buffer,
    },
    where: {
      storyId: story.id,
    },
    select: {
      id: true,
    },
  })

  revalidatePath(`/story/${id}`)

  return NextResponse.json({ data: speech })
}

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const user = await getUserByClerkId()

  const { id } = params

  const story = await prisma.story.findUniqueOrThrow({
    where: {
      id_userId: {
        id,
        userId: user.id,
      },
    },
    include: {
      speech: true,
    },
  })

  if (!story.speech?.buffer) {
    return new Response('Not found', {
      status: 404,
    })
  }

  return new Response(story.speech.buffer, {
    status: 200,
    headers: {
      'Content-Disposition': 'attachment; filename=story.mp3',
      'Content-Type': 'audio/mpeg',
    },
  })
}

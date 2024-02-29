import { NextResponse } from 'next/server'
import { generateSpeech } from '@/utils/server/ai'
import { getUserByClerkId } from '@/utils/server/auth'
import { prisma } from '@/utils/server/db'
import { revalidatePath } from 'next/cache'

export const maxDuration = 300

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

  const buffer = await generateSpeech(`${story.subject}.\n${story.content}`)

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

  revalidatePath(`/stories/${id}`)

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

  if (!story.speech) {
    return new Response(null, {
      status: 404,
    })
  }

  return new Response(story.speech.buffer, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
    },
  })
}

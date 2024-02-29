import { NextResponse } from 'next/server'
import { generateImage } from '@/utils/server/ai'
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
  })

  const buffer = await generateImage(story.subject)

  const image = await prisma.image.upsert({
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

  return NextResponse.json({ data: image })
}

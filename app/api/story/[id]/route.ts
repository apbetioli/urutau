import { getUserByClerkId } from '@/utils/server/auth'
import { prisma } from '@/utils/server/db'
import { deleteImage, deleteSpeech } from '@/utils/server/s3'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const user = await getUserByClerkId()

  const story = await request.json()
  const { id } = params

  const updated = await prisma.story.update({
    data: {
      content: story.content,
      subject: story.subject,
      public: story.public,
    },
    where: {
      id_userId: {
        id,
        userId: user.id,
      },
    },
  })

  revalidatePath('/feed')
  revalidatePath('/stories')
  revalidatePath(`/stories/${id}`)

  return NextResponse.json({ data: updated })
}

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const user = await getUserByClerkId()
  const { id } = params

  await Promise.all([deleteImage(id), deleteSpeech(id)])

  const deleted = await prisma.story.delete({
    where: {
      id_userId: {
        id,
        userId: user.id,
      },
    },
  })

  revalidatePath('/feed')
  revalidatePath('/stories')
  revalidatePath(`/stories/${id}`)

  return NextResponse.json({ data: deleted })
}

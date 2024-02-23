import { NextResponse } from 'next/server'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'

export const PATCH = async (request: Request, { params }) => {
  const user = await getUserByClerkId()

  const { content, subject } = await request.json()
  const { id } = params

  const story = await prisma.story.update({
    data: {
      content,
      subject,
    },
    where: {
      id_userId: {
        id,
        userId: user.id,
      },
    },
  })

  revalidatePath('/stories')

  return NextResponse.json({ data: story })
}

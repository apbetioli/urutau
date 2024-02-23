import { NextResponse } from 'next/server'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { qa } from '@/utils/ai'

export const POST = async (request: Request) => {
  const { question } = await request.json()
  const user = await getUserByClerkId()

  const stories = await prisma.story.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  const answer = await qa(question, stories)

  return NextResponse.json({ data: answer })
}

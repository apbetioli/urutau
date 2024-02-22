import { NextResponse } from 'next/server'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

export const PATCH = async (request: Request, { params }) => {
  const { content } = await request.json()
  const user = await getUserByClerkId()
  const { id } = params
  const entry = await prisma.entry.update({
    data: {
      content,
    },
    where: {
      id_userId: {
        id,
        userId: user.id,
      },
    },
  })

  return NextResponse.json({ data: entry })
}

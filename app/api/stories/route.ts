import { getUserByClerkId } from '@/utils/server/auth'
import { prisma } from '@/utils/server/db'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const feed = Boolean(searchParams.get('feed') || false)
  const skip = Number(searchParams.get('skip') || 0)
  const take = Number(searchParams.get('take') || 10)
  let where = {}

  if (feed) {
    where = {
      public: true,
    }
  } else {
    const user = await getUserByClerkId()
    where = {
      userId: user.id,
    }
  }

  const stories = await prisma.story.findMany({
    skip,
    take,
    where,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  })

  return NextResponse.json({ data: stories })
}

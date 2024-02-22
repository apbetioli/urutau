import { Analysis } from '@prisma/client'
import { NextResponse } from 'next/server'
import { analyze } from '@/utils/ai'
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
    include: {
      analysis: true,
    },
  })

  const analysis: Partial<Analysis> | undefined = await analyze(content)
  if (analysis) {
    entry.analysis = await prisma.analysis.upsert({
      create: {
        entryId: entry.id,
        ...analysis,
      },
      update: {
        ...analysis,
      },
      where: {
        entryId: entry.id,
      },
    })
  }

  return NextResponse.json({ data: entry })
}

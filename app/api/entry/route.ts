import { NextResponse } from 'next/server'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'

export const POST = async () => {
  const user = await getUserByClerkId()
  const entry = await prisma.entry.create({
    data: {
      userId: user.id,
      content: 'Edit me!',
    },
  })

  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      mood: 'neutral',
      color: 'gray',
      summary: 'No summary available',
      negative: false,
      subject: 'No subject available',
      sentimentScore: 0
    },
  })

  revalidatePath('/dashboard')

  return NextResponse.json({ data: entry })
}

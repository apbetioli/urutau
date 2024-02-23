import { NextResponse } from 'next/server'
import { createStory } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'

export const POST = async (request: Request) => {
  const user = await getUserByClerkId()

  const { prompt } = await request.json()

  const aiStory = await createStory(prompt)

  const story = await prisma.story.create({
    data: {
      userId: user.id,
      ...aiStory,
    },
  })

  revalidatePath('/stories')

  return NextResponse.json({ data: story })
}

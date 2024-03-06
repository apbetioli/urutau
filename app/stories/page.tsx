import Feed from '@/components/Feed'
import { getUserByClerkId } from '@/utils/server/auth'
import { prisma } from '@/utils/server/db'
import { Story } from '@prisma/client'

type StoryWithImage = Story & { image?: { id: string } }

const getStories = async () => {
  const user = await getUserByClerkId()
  return await prisma.story.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      image: {
        select: {
          id: true,
        },
      },
    },
  })
}

export default async function StoriesPage() {
  const stories = (await getStories()) as StoryWithImage[]

  return <Feed stories={stories} />
}

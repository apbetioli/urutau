import Feed from '@/components/Feed'
import { prisma } from '@/utils/server/db'
import { Story } from '@prisma/client'

type StoryWithImage = Story & { image?: { id: string } }

const getStories = async () => {
  return await prisma.story.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      image: {
        select: {
          id: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  })
}

export default async function FeedPage() {
  const stories = (await getStories()) as StoryWithImage[]

  return <Feed stories={stories} />
}

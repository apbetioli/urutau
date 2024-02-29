import Button from '@/components/Button'
import Empty from '@/components/Empty'
import Link from 'next/link'
import { Story } from '@prisma/client'
import StoryCard from '@/components/StoryCard'
import { getUserByClerkId } from '@/utils/server/auth'
import { prisma } from '@/utils/server/db'

type StoryWithImage = Story & { image?: { id: string; url: string } }

const getStories = async () => {
  const user = await getUserByClerkId()
  const stories = (await prisma.story.findMany({
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
  })) as StoryWithImage[]

  return stories.map((story) => {
    if (story.image) {
      story.image.url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/stories/${story.id}/image`
    }
    return story
  })
}

const NewStoryButton = () => (
  <Link href="/stories/new">
    <Button>New story</Button>
  </Link>
)

export default async function StoriesPage() {
  const stories = await getStories()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-5">
        <h2>My stories</h2>
        <NewStoryButton />
      </div>
      {stories.length === 0 ? (
        <Empty
          title="No stories yet"
          text="Get started by clicking on the button below"
        >
          <NewStoryButton />
        </Empty>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-5">
          {stories.map((story) => (
            <Link key={story.id} href={`/stories/${story.id}`}>
              <StoryCard
                story={story}
                previewContent
                className="border-2 border-gray-700 hover:border-indigo-500 transition duration-300 h-full"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

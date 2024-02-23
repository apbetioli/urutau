import Empty from '@/components/Empty'
import Link from 'next/link'
import StoryCard from '@/components/StoryCard'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const geStories = async () => {
  const user = await getUserByClerkId()
  return await prisma.story.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export default async function StoriesPage() {
  const stories = await geStories()

  return (
    <div className="p-8">
      <h2 className="mb-5">Stories</h2>
      {stories.length === 0 ? (
        <Empty
          title="No stories yet"
          text="Get started by clicking on the button below"
        >
          <Link
            href="/stories/new"
            className="bg-primary-600 hover:bg-primary-700 rounded-lg py-4 px-6 font-semibold"
          >
            New story
          </Link>
        </Empty>
      ) : (
        <div className="grid grid-cols-3 gap-4 mt-5">
          {stories.map((story) => (
            <Link key={story.id} href={`/stories/${story.id}`}>
              <StoryCard story={story} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

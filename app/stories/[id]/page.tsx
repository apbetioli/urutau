import Button from '@/components/Button'
import Empty from '@/components/Empty'
import StoryDetail from '@/components/StoryDetail'
import { getUserByClerkId } from '@/utils/server/auth'
import { prisma } from '@/utils/server/db'
import Link from 'next/link'

const getStory = async (id: string) => {
  const story = await prisma.story.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!story.public) {
    const user = await getUserByClerkId()
    if (story.userId !== user.id) {
      throw new Error('Not found!')
    }
  }

  return story
}

export default async function StoryPage({
  params,
}: {
  params: { id: string }
}) {
  const story = await getStory(params.id)
  return (
    <div className="flex flex-col w-full h-full">
      {story ? (
        <StoryDetail story={story} />
      ) : (
        <Empty
          title="Story not found"
          text="Click on the button below to check for available stories."
        >
          <Link href="/stories">
            <Button>Check avaliable stories</Button>
          </Link>
        </Empty>
      )}
    </div>
  )
}

import StoryDetail from '@/components/StoryDetail'
import { getUserByClerkId } from '@/utils/server/auth'
import { prisma } from '@/utils/server/db'
import { notFound } from 'next/navigation'

const getStory = async (id: string) => {
  const story = await prisma.story.findUnique({
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

  if (!story) {
    notFound()
  }

  if (!story.public) {
    const user = await getUserByClerkId()
    if (story.userId !== user.id) {
      notFound()
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
      <StoryDetail story={story} />
    </div>
  )
}

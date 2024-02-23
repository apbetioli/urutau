import Editor from '@/components/Editor'
import EmptyResult from '@/components/EmptyResult'
import Link from 'next/link'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getStory = async (id: string) => {
  const user = await getUserByClerkId()
  return await prisma.story.findUnique({
    where: {
      id_userId: {
        id,
        userId: user.id,
      },
    },
    include: {
      speech: {
        select: {
          id: true,
        },
      },
    },
  })
}

export default async function StoryPage({ params }) {
  const story = await getStory(params.id)
  return (
    <div className="flex flex-col w-full h-full">
      {story ? (
        <Editor story={story} />
      ) : (
        <EmptyResult
          title="Story not found"
          text="Click on the button below to check for available stories."
        >
          <Link
            href="/stories"
            className="bg-primary-600 hover:bg-primary-700 rounded-lg py-4 px-6 font-semibold"
          >
            Check avaliable stories
          </Link>
        </EmptyResult>
      )}
    </div>
  )
}

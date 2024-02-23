import { Speech, Story } from '@prisma/client'

import Empty from '@/components/Empty'
import Link from 'next/link'
import StoryEditor from '@/components/StoryEditor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

type StoryWithSpeech = Story & { speech?: Pick<Speech, 'id'> }

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

export default async function StoryPage({
  params,
}: {
  params: { id: string }
}) {
  const story = (await getStory(params.id)) as StoryWithSpeech
  return (
    <div className="flex flex-col w-full h-full">
      {story ? (
        <StoryEditor story={story} />
      ) : (
        <Empty
          title="Story not found"
          text="Click on the button below to check for available stories."
        >
          <Link
            href="/stories"
            className="bg-primary-600 hover:bg-primary-700 rounded-lg py-4 px-6 font-semibold"
          >
            Check avaliable stories
          </Link>
        </Empty>
      )}
    </div>
  )
}

import { Image, Speech, Story } from '@prisma/client'

import Button from '@/components/Button'
import Empty from '@/components/Empty'
import StoryDetail from '@/components/StoryDetail'
import { prisma } from '@/utils/server/db'
import Link from 'next/link'

type StoryWithMedia = Story & {
  speech?: Pick<Speech, 'id'>
  image?: Pick<Image, 'id'>
}

const getStory = async (id: string) => {
  return await prisma.story.findUnique({
    where: {
      id,
    },
    include: {
      speech: {
        select: {
          id: true,
        },
      },
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

export default async function StoryPage({
  params,
}: {
  params: { id: string }
}) {
  const story = (await getStory(params.id)) as StoryWithMedia
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

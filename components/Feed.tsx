'use client'

import LoadingPage from '@/app/loading'
import StoryCard from '@/components/StoryCard'
import { Story } from '@prisma/client'
import { useInfiniteQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import Button from './Button'
import Empty from './Empty'
import { Spinner } from './icons'

type StoryWithMedia = Story & { image?: { id: string } } & {
  speech?: { id: string }
}

export default function Feed({
  load,
}: {
  load: (skip?: number, take?: number) => Promise<{ data: StoryWithMedia[] }>
}) {
  const loadStories = async ({ pageParam = 0 }) => {
    const { data } = await load(pageParam)
    if (!data.length) {
      return { data }
    }
    return {
      data,
      nextCursor: pageParam + data.length,
    }
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: loadStories,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  })

  if (isLoading) {
    return <LoadingPage />
  }

  if (isError) {
    return (
      <div className="w-full max-w-xl p-2 m-auto flex flex-col gap-4">
        <Empty title="Error" text={error.message} />
      </div>
    )
  }

  if (!data?.pages[0].data.length) {
    return (
      <div className="w-full max-w-xl p-2 m-auto flex flex-col gap-4">
        <Empty title="No stories yet" text="Get started adding one above" />
      </div>
    )
  }

  return (
    <div className="w-full max-w-xl p-2 m-auto flex flex-col gap-4">
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.map((story) => (
            <Link key={story.id} href={`/stories/${story.id}`}>
              <StoryCard
                story={story}
                className="border-2 border-gray-700 hover:border-indigo-500 transition duration-300 h-full"
              />
            </Link>
          ))}
        </React.Fragment>
      ))}
      {hasNextPage ? (
        <Button disabled={isFetchingNextPage} onClick={fetchNextPage}>
          {isFetchingNextPage && <Spinner />}
          {isFetchingNextPage ? 'Loading more... Please wait' : 'Load more'}
        </Button>
      ) : (
        <Button disabled>No more stories to load</Button>
      )}
    </div>
  )
}

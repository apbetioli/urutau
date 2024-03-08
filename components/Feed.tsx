'use client'

import LoadingPage from '@/app/loading'
import NewStory from '@/components/NewStory'
import StoryCard from '@/components/StoryCard'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { Story } from '@prisma/client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
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
  const fetched = useRef(false)
  const [stories, setStories] = useState<StoryWithMedia[]>([])
  const [isLoading, setLoading] = useState(true)
  const [isLoadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  const [take, setTake] = useState(10)
  const [skip, setSkip] = useState(0)

  const loadData = async () => {
    const { data } = await load(skip, take)
    setStories([...stories, ...data])
    if (data.length > 0) {
      setSkip(skip + take)
      setHasMore(true)
    } else {
      setHasMore(false)
    }
  }

  const loadMore = async () => {
    setLoadingMore(true)
    try {
      await loadData()
    } finally {
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    if (!fetched.current) {
      fetched.current = true
      loadData().finally(() => {
        setLoading(false)
      })
    }
  }, [])

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <div className="w-full max-w-xl p-2 md:p-8 m-auto flex flex-col gap-8">
      <SignedIn>
        <NewStory />
      </SignedIn>
      <SignedOut>
        <Link href="/stories">
          <Button>Create a story</Button>
        </Link>
      </SignedOut>
      {stories.length === 0 && (
        <Empty title="No stories yet" text="Get started adding one above" />
      )}
      {stories.map((story) => (
        <Link key={story.id} href={`/stories/${story.id}`}>
          <StoryCard
            story={story}
            className="border-2 border-gray-700 hover:border-indigo-500 transition duration-300 h-full"
          />
        </Link>
      ))}
      {hasMore && (
        <Button disabled={isLoadingMore} onClick={loadMore}>
          {isLoadingMore && <Spinner />}
          {isLoadingMore ? 'Loading more... Please wait' : 'Load more'}
        </Button>
      )}
    </div>
  )
}

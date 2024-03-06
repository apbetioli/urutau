'use client'

import NewStory from '@/components/NewStory'
import StoryCard from '@/components/StoryCard'
import { SignedIn } from '@clerk/nextjs'
import { Story } from '@prisma/client'
import Link from 'next/link'
import Empty from './Empty'

type StoryWithMedia = Story & { image?: { id: string } } & {
  speech?: { id: string }
}

export default function Feed({ stories }: { stories: StoryWithMedia[] }) {
  return (
    <div className="w-full max-w-xl p-2 md:p-8 m-auto flex flex-col gap-8 mt-5">
      <SignedIn>
        <NewStory />
      </SignedIn>
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
    </div>
  )
}

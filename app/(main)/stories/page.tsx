'use client'

import Feed from '@/components/Feed'
import NewStory from '@/components/NewStory'
import { getStories } from '@/utils/api'

export default function StoriesPage() {
  return (
    <>
      <div className="w-full max-w-xl p-2 m-auto flex flex-col">
        <NewStory />
      </div>
      <Feed load={getStories} />
    </>
  )
}

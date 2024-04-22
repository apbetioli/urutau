'use client'

import Button from '@/components/Button'
import Feed from '@/components/Feed'
import NewStory from '@/components/NewStory'
import { getStories } from '@/utils/api'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'

export default function FeedPage() {
  return (
    <>
      <div className="w-full max-w-xl p-2 m-auto flex flex-col">
        <Link href="/stories">
          <Button>Create a story</Button>
        </Link>
      </div>
      <Feed load={(skip, take) => getStories(skip, take, /*feed=*/ true)} />
    </>
  )
}

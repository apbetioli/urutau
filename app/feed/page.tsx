'use client'

import Feed from '@/components/Feed'
import { getStories } from '@/utils/api'

export default function FeedPage() {
  return <Feed load={(skip, take) => getStories(skip, take, /*feed=*/ true)} />
}

'use client'

import Feed from '@/components/Feed'
import { getStories } from '@/utils/api'

export default function StoriesPage() {
  return <Feed load={getStories} />
}

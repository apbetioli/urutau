'use client'

import { Image, Speech, Story } from '@prisma/client'

import StoryCard from './StoryCard'

type StoryWithMedia = Story & {
  speech?: Pick<Speech, 'id'>
  image?: Pick<Image, 'id'>
}

type Props = {
  story: StoryWithMedia
  edit?: boolean
}

export default function StoryEditor({ story }: Props) {
  return (
    <div className="h-full w-full flex flex-col md:grid md:grid-cols-3">
      <aside className="md:col-span-1 flex flex-col gap-4 border-l border-white/20 p-4">
        <StoryCard story={story} />
      </aside>

      <main className="md:col-span-2 p-4 grow relative">
        <div className="bg-gray-800 rounded-lg p-4 h-full">
          {story.content.split('\n').map((paragraph, index) => {
            return (
              <p key={index} className="mb-3">
                {paragraph}
              </p>
            )
          })}
        </div>
      </main>
    </div>
  )
}

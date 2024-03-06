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

export default function StoryDetail({ story }: Props) {
  return (
    <div className="w-full max-w-xl p-2 md:p-8 m-auto flex flex-col gap-8 mt-5">
      <StoryCard story={story}>
        <main className="mt-8">
          {story.content.split('\n').map((paragraph, index) => {
            return (
              <p key={index} className="mb-3">
                {paragraph}
              </p>
            )
          })}
        </main>
      </StoryCard>
    </div>
  )
}

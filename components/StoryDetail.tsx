'use client'

import { updateStory } from '@/utils/api'
import { Story } from '@prisma/client'
import { useEffect, useState } from 'react'
import Button from './Button'
import StoryCard from './StoryCard'
import { Spinner } from './icons'
import { SignedIn } from '@clerk/nextjs'

type Props = {
  story: Story
  edit?: boolean
}

const FETCH_INTERVAL = 5000

export default function StoryDetail({ story }: Props) {
  const [detail, setDetail] = useState(story)
  const [isBusy, setBusy] = useState(false)

  useEffect(() => {
    if (story.image_url) {
      return
    }

    const image_url = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/images/${story.id}.webp`

    var intervalId: any = setInterval(() => {
      console.log('Checking image generation status')

      fetch(image_url).then(async (res: Response) => {
        console.log('Image generation status == ', res.status)
        if (res.status === 200) {
          console.log('Image ready')
          clearInterval(intervalId)
          intervalId = null
          await updateStory(story.id, {
            image_url,
          })

          setDetail((current) => ({ ...current, image_url }))
        }
      })
    }, FETCH_INTERVAL)

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [story])

  useEffect(() => {
    if (story.speech_url) {
      return
    }

    const speech_url = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/audio/${story.id}.mp3`

    var intervalId: any = setInterval(() => {
      fetch(speech_url).then(async (res: Response) => {
        console.log('Checking speech generation status == ', res.status)
        if (res.status === 200) {
          console.log('Speech ready')
          clearInterval(intervalId)
          intervalId = null
          await updateStory(story.id, {
            speech_url,
          })
          setDetail((current) => ({ ...current, speech_url }))
        }
      })
    }, FETCH_INTERVAL)

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [story])

  const publish = async () => {
    setBusy(true)
    try {
      const { data } = await updateStory(detail.id, {
        public: !detail.public,
      })
      setDetail(data)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="w-full max-w-xl p-2 md:px-8 m-auto flex flex-col gap-8">
      <StoryCard story={detail}>
        {detail.speech_url && (
          <audio className="my-8" controls src={detail.speech_url} />
        )}
        <main className="mt-8">
          {detail.content.split('\n').map((paragraph, index) => {
            return (
              <p key={index} className="mb-3">
                {paragraph}
              </p>
            )
          })}
        </main>
      </StoryCard>
      <SignedIn>
        <Button disabled={isBusy} onClick={publish}>
          {isBusy && <Spinner />}
          {detail.public ? 'Make story private' : 'Publish to public feed'}
        </Button>
      </SignedIn>
    </div>
  )
}

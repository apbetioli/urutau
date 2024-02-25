'use client'

import { Image, Speech, Story } from '@prisma/client'
import { generateImage, generateSpeech, updateStory } from '@/utils/api'

import Loading from '@/app/loading'
import StoryCard from './StoryCard'
import { useAutosave } from 'react-autosave'
import { useState } from 'react'

type StoryWithMedia = Story & {
  speech?: Pick<Speech, 'id'>
  image?: Pick<Image, 'id'>
}

type Props = {
  story: StoryWithMedia
}

export default function StoryEditor({ story }: Props) {
  const [content, setContent] = useState(story.content)
  const [subject, setSubject] = useState(story.subject)
  const [hasSpeech, setHasSpeech] = useState(!!story.speech)
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isSpeechGenerating, setIsSpeechGenerating] = useState(false)
  const [isImageGenerating, setIsImageGenerating] = useState(false)

  useAutosave({
    data: content,
    onSave: async (newContent) => {
      setIsSaving(true)
      try {
        await updateStory(story.id, {
          content: newContent,
        })
      } finally {
        setIsSaving(false)
      }
    },
    interval: 2000,
  })

  const updateSubject = async (newSubject: string) => {
    setIsSaving(true)
    const updated = await updateStory(story.id, {
      subject: newSubject,
    })
    setSubject(updated.data.subject)
    setIsEditing(false)
    setIsSaving(false)
  }

  const handleDelete = async () => {
    console.log('TODO delete')
  }

  const handleGenerateSpeech = async () => {
    setIsSpeechGenerating(true)
    const { data } = await generateSpeech(story.id)
    if (data.id) {
      setHasSpeech(true)
    }
    setIsSpeechGenerating(false)
  }

  const handleGenerateImage = async () => {
    setIsImageGenerating(true)
    await generateImage(story.id)
    setIsImageGenerating(false)
  }

  return (
    <div className="h-full w-full flex flex-col lg:grid lg:grid-cols-3">
      <aside className="lg:col-span-1 flex flex-col gap-4 border-l border-white/20 p-4">
        {/*isEditing ? (
          <div className="flex gap-1">
            <input
              className="grow"
              type="text"
              value={subject}
              disabled={isSaving}
              onChange={(e) => setSubject(e.target.value)}
            />
            <button
              className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg"
              disabled={isSaving}
              onClick={() => updateSubject(subject)}
            >
              Save
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-700 p-2 rounded-lg"
              disabled={isSaving}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <h3 onClick={() => setIsEditing((e) => !e)}>{subject}</h3>
        )*/}

        <StoryCard story={story} />

        <button
          className="hidden bg-red-600 px-4 py-2 rounded-lg text-xl text-white"
          onClick={() => handleDelete()}
        >
          Delete story
        </button>
        {hasSpeech && !isSpeechGenerating ? (
          <audio controls src={`/api/speech/${story.speech?.id}`} />
        ) : (
          <button
            className=" bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2"
            disabled={isSpeechGenerating}
            onClick={() => handleGenerateSpeech()}
          >
            {isSpeechGenerating
              ? 'Generating audio... Please wait'
              : 'Generate audio'}
          </button>
        )}
        {/*
        <button
          className=" bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2"
          disabled={isImageGenerating}
          onClick={() => handleGenerateImage()}
        >
          {isImageGenerating
            ? 'Generating image... Please wait'
            : 'Generate image'}
        </button>
        <div>{isImageGenerating && <Loading />}</div>
          */}
      </aside>
      <main className="lg:col-span-2 p-4 grow">
        <div className="relative flex items-center gap-2">
          {isSaving && (
            <div className="absolute top-3 right-1 flex items-center gap-2">
              <Loading /> Saving...
            </div>
          )}
        </div>
        <textarea
          className="bg-slate-800 p-10 text-2xl outline-none w-full h-[90%] rounded-lg"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </main>
    </div>
  )
}

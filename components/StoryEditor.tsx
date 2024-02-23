'use client'

import { Speech, Story } from '@prisma/client'
import { generateSpeech, updateStory } from '@/utils/api'

import Loading from '@/app/loading'
import { useAutosave } from 'react-autosave'
import { useState } from 'react'

type Props = {
  story: Story & { speech?: Pick<Speech, 'id'> }
}

export default function StoryEditor({ story }: Props) {
  const [content, setContent] = useState(story.content)
  const [subject, setSubject] = useState(story.subject)
  const [hasSpeech, setHasSpeech] = useState(!!story.speech)
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isSpeechGenerating, setIsSpeechGenerating] = useState(false)

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

  return (
    <div className="h-full w-full grid grid-cols-3">
      <main className="col-span-3 lg:col-span-2 p-8">
        <div className="flex items-center mb-8 gap-2">
          {isEditing ? (
            <>
              <input
                className="w-1/2"
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
            </>
          ) : (
            <h2 onClick={() => setIsEditing((e) => !e)}>{subject}</h2>
          )}
          <div className="grow" />
          {isSaving && (
            <div className="flex items-center gap-2">
              <Loading /> Saving...
            </div>
          )}
        </div>
        <textarea
          className="bg-slate-800 p-10 text-2xl outline-none w-full h-[90%]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </main>
      <aside className="col-span-3 lg:col-span-1 flex flex-col gap-4 border-l border-white/20 p-8">
        <h3>Details</h3>
        <div className="flex flex-col gap-2">
          <span className="font-semibold">Prompt</span>
          <span>{story.prompt}</span>
        </div>
        <button
          className="hidden bg-red-600 px-4 py-2 rounded-lg text-xl text-white"
          onClick={() => handleDelete()}
        >
          Delete story
        </button>
        {hasSpeech && !isSpeechGenerating && (
          <audio controls src={`/api/story/${story.id}/speech`} />
        )}
        <button
          className=" bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2"
          disabled={isSpeechGenerating}
          onClick={() => handleGenerateSpeech()}
        >
          {isSpeechGenerating
            ? 'Generating audio... Please wait'
            : 'Generate audio'}
        </button>
        <div className="p-8">{isSpeechGenerating && <Loading />}</div>
      </aside>
    </div>
  )
}
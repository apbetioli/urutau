'use client'

import { Entry } from '@prisma/client'
import Loading from '@/app/loading'
import { updateEntry } from '@/utils/api'
import { useAutosave } from 'react-autosave'
import { useState } from 'react'

type Props = {
  entry: Entry
}

export default function Editor({ entry }: Props) {
  const [content, setContent] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)
  const analysis = [
    { name: 'Summary', value: '' },
    { name: 'Subject', value: '' },
    { name: 'Mood', value: '' },
    { name: 'Negative', value: false },
  ]

  useAutosave({
    data: content,
    onSave: async (newContent) => {
      setIsSaving(true)
      try {
        await updateEntry(entry.id, newContent)
      } finally {
        setIsSaving(false)
      }
    },
    interval: 5000,
  })

  const handleDelete = async () => {}

  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="relative col-span-2">
        <textarea
          className="bg-slate-800 p-10 text-2xl outline-none w-full h-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {isSaving && (
          <div className="absolute top-0 right-0 flex items-center gap-2">
            <Loading /> Saving...
          </div>
        )}
      </div>
      <aside className="flex flex-col gap-4 border-l border-white/20">
        <div>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysis.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between border-b border-t"
              >
                <span className="text-lg font-semibold p-4">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="bg-red-600 px-4 py-2 rounded-lg text-xl text-white"
          onClick={() => handleDelete()}
        >
          Delete entry
        </button>
      </aside>
    </div>
  )
}

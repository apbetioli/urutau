'use client'

import { newEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'

export default function NewEntryCard() {
  const router = useRouter()

  const handleOnClick = async () => {
    const { data } = await newEntry()
    router.push(`/dashboard/${data.id}`)
  }

  return (
    <button
      className="bg-primary-600 px-4 py-2 rounded-lg text-xl text-white"
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </button>
  )
}

'use client'

import Button from '@/components/Button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="mt-6 flex h-96 items-center rounded-lg border text-center dark:border-gray-700">
      <div className="mx-auto flex w-full max-w-sm flex-col px-4">
        <h1 className="mt-3 text-gray-800 dark:text-white">Oops!</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{error.message}</p>
        <div className="mx-auto mt-4 flex items-center gap-x-3">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  )
}

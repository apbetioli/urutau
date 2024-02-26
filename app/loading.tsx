import { Spinner } from '@/components/icons'

export default function LoadingPage() {
  return (
    <div
      className="flex h-full w-full justify-center items-center"
      role="status"
    >
      <Spinner />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

import Button from '@/components/Button'
import Empty from '@/components/Empty'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col w-full h-full">
      <Empty
        title="Not found!"
        text="Click on the button below to check out some stories"
      >
        <Link href="/feed">
          <Button>Go to stories feed</Button>
        </Link>
      </Empty>
    </div>
  )
}

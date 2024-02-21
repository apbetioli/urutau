import Link from 'next/link'
import { auth } from '@clerk/nextjs'

export default function Home() {
  const { userId } = auth()

  const href = userId ? '/get-started' : '/new-user'

  return (
    <div className="w-full max-w-xl m-auto">
      <h1 className="text-6xl">Urutau</h1>
      <p className="text-2xl text-white/60 mb-4">
        Unlimited AI generated bedtime stories at one click distance.
      </p>
      <div>
        <Link
          href={href}
          className="bg-purple-600 px-4 py-2 rounded-lg text-xl"
        >
          Get started
        </Link>
      </div>
    </div>
  )
}

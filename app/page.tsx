import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex h-full justify-center items-center">
      <div className="max-w-xl">
        <h1 className="text-6xl">Urutau</h1>
        <p className="text-2xl text-white/60 mb-4">
          Unlimited AI generated bedtime stories at one click distance.
        </p>
        <div>
          <Link
            href="/dashboard"
            className="bg-primary-600 px-4 py-2 rounded-lg text-xl text-white"
          >
            Get started
          </Link>
        </div>
      </div>
    </main>
  )
}

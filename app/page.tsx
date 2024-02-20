import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex w-screen h-screen bg-black justify-center items-center text-white">
      <div className="w-full max-w-xl m-auto">
        <h1 className="text-6xl">Urutau</h1>
        <p className="text-2xl text-white/60 mb-4">
          Unlimited bedtime stories at one click.
        </p>
        <div>
          <Link
            href="/get-started"
            className="bg-purple-600 px-4 py-2 rounded-lg text-xl"
          >
            Get started
          </Link>
        </div>
      </div>
    </main>
  )
}

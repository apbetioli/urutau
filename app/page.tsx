import GradientBackground from '@/components/GradientBackground'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex h-full justify-center items-center">
      <div className="flex flex-col max-w-xl gap-y-8">
        <h1 className="text-6xl">AI generated bedtime stories</h1>
        <p className="text-2xl text-white/60">
          When your son wants more stories and you have no ideas left, Urutau is
          here to help! Create lovely stories for reading, generate audio for
          listening and even create a magic picture.
        </p>

        <div>
          <Link
            href="/stories"
            className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg text-xl text-white"
          >
            Get started
          </Link>
        </div>
      </div>
      <GradientBackground />
    </main>
  )
}

import Button from '@/components/Button'
import Footer from '@/components/Footer'
import GradientBackground from '@/components/GradientBackground'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <main className="flex h-[calc(100%-5rem)] justify-center items-center">
        <div className="flex flex-col max-w-xl gap-8 p-8">
          <h1 className="text-6xl">Magic stories</h1>
          <p className="text-2xl text-white/60">
            Give your kids a magical experience every night with the power of
            AI, and never run out of bedtime stories again. Create delightful
            tales both in written and audio format for your little ones to
            enjoy.
          </p>

          <div>
            <Link href="/stories">
              <Button>Get started</Button>
            </Link>
          </div>
        </div>
        <GradientBackground />
      </main>
      <Footer />
    </>
  )
}

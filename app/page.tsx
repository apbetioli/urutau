import Button from '@/components/Button'
import { Github } from '../components/icons'
import GradientBackground from '@/components/GradientBackground'
import Link from 'next/link'

export default function HomePage() {
  const footerLinks = [
    { href: '/soon', label: 'Pricing', className: 'sm:hidden' },
    { href: '/soon', label: 'FAQs', className: 'sm:hidden' },
    { href: '/soon', label: 'Terms of service' },
    { href: '/soon', label: 'Privacy policy' },
    { href: 'https://github.com/apbetioli/urutau', label: <Github /> },
  ]
  return (
    <>
      <main className="flex h-[calc(100%-5rem)] justify-center items-center">
        <div className="flex flex-col max-w-xl gap-8 p-8">
          <h1 className="text-6xl">AI generated bedtime stories</h1>
          <p className="text-2xl text-white/60">
            When your kid wants more stories, and you have no ideas left, Urutau
            is here to help! Create lovely stories for reading, generate audio
            for listening, and even create a magic picture.
          </p>

          <div>
            <Link href="/stories">
              <Button>Get started</Button>
            </Link>
          </div>
        </div>
        <GradientBackground />
      </main>
      <footer className="flex flex-col sm:flex-row items-center sm:h-20 gap-6 p-8 font-medium border-t border-white/20 text-sm">
        <span>Urutau © 2024</span>
        <nav className="flex justify-end grow items-center gap-6 flex-col sm:flex-row ">
          {footerLinks.map((link) => {
            return (
              <Link key={link.href} href={link.href} className={link.className}>
                {link.label}
              </Link>
            )
          })}
        </nav>
      </footer>
    </>
  )
}

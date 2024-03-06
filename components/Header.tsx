import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Header() {
  const signedOutLinks = [
    { href: '/', label: 'Feed', className: 'hidden sm:block' },
    { href: '/stories', label: 'My Stories', className: 'hidden sm:block' },
    { href: '/sign-in', label: 'Log in' },
    {
      href: '/sign-up',
      label: 'Sign up',
      className: 'bg-purple-500 hover:bg-purple-600 py-1.5 px-2 rounded-lg',
    },
  ]

  const signedInLinks = [{ href: '/stories', label: 'My stories' }]

  return (
    <header className="flex w-full items-center h-20 gap-6 px-8 border-b border-white/20 font-semibold">
      <Link href="/" className="flex items-center h-20 gap-2 sm:gap-4">
        <h1 className="text-3xl font-bold">Urutau</h1>
      </Link>

      <div className="grow" />

      <SignedOut>
        {signedOutLinks.map((link) => {
          return (
            <Link key={link.href} href={link.href} className={link.className}>
              {link.label}
            </Link>
          )
        })}
      </SignedOut>

      <SignedIn>
        {signedInLinks.map((link) => {
          return (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          )
        })}

        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </header>
  )
}

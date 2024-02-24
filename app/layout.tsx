import './globals.css'

import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { Github } from './icons'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Urutau',
  description: 'Bedtime stories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const signedOutLinks = [
    { href: '/stories', label: 'Stories', className: 'hidden sm:block' },
    { href: '/', label: 'Pricing', className: 'hidden sm:block' },
    { href: '/', label: 'FAQs', className: 'hidden sm:block' },
    { href: '/sign-in', label: 'Log in' },
    {
      href: '/sign-up',
      label: 'Sign up',
      className: 'bg-success-600 hover:bg-success-700 py-1.5 px-2 rounded-lg',
    },
  ]

  const signedInLinks = [{ href: '/stories', label: 'Stories' }]

  const footerLinks = [
    { href: '/', label: 'Stories', className: 'sm:hidden' },
    { href: '/', label: 'Pricing', className: 'sm:hidden' },
    { href: '/', label: 'FAQs', className: 'sm:hidden' },
    { href: '/', label: 'Terms of service' },
    { href: '/', label: 'Privacy policy' },
    { href: 'https://github.com/apbetioli/urutau', label: <Github /> },
  ]

  return (
    <html lang="en" className="dark">
      <ClerkProvider
        appearance={{
          variables: { colorPrimary: '#000000' },
          elements: {
            formButtonPrimary: 'bg-primary-600 hover:bg-primary-700',
            socialButtonsBlockButton:
              'bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black',
            socialButtonsBlockButtonText: 'font-semibold',
            formButtonReset:
              'bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black',
            membersPageInviteButton:
              'bg-black border border-black border-solid hover:bg-white hover:text-black',
            card: 'bg-[#fafafa]',
          },
        }}
      >
        <body className={`${inter.className} h-screen flex flex-col `}>
          <header className="flex w-full items-center h-20 gap-6 px-8 border-b border-white/20 font-semibold">
            <Link href="/" className="flex items-center h-20 gap-2 sm:gap-4">
              <h1 className="text-3xl font-bold">Urutau</h1>
            </Link>

            <div className="grow" />
            <SignedOut>
              {signedOutLinks.map((link) => {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={link.className}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </SignedOut>

            <SignedIn>
              {signedInLinks.map((link) => {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={link.className}
                  >
                    {link.label}
                  </Link>
                )
              })}

              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </header>
          <main className="grow">{children}</main>
          <footer className="flex flex-col sm:flex-row items-center sm:h-20 gap-6 p-8 font-medium border-t border-white/20 text-sm">
            <span>Urutau © 2024</span>
            <nav className="flex justify-end grow items-center gap-6 flex-col sm:flex-row ">
              {footerLinks.map((link) => {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={link.className}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </footer>
        </body>
      </ClerkProvider>
    </html>
  )
}

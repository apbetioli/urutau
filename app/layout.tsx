import './globals.css'

import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

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
    { href: '/', label: 'Home', className: 'hidden sm:block' },
    { href: '/soon', label: 'Pricing', className: 'hidden sm:block' },
    { href: '/soon', label: 'FAQs', className: 'hidden sm:block' },
    { href: '/sign-in', label: 'Log in' },
    {
      href: '/sign-up',
      label: 'Sign up',
      className: 'bg-purple-500 hover:bg-purple-600 py-1.5 px-2 rounded-lg',
    },
  ]

  const signedInLinks = [{ href: '/stories', label: 'My stories' }]

  return (
    <html lang="en" className="dark">
      <ClerkProvider
        appearance={{
          variables: { colorPrimary: '#000000' },
          elements: {
            formButtonPrimary: 'bg-purple-500 hover:bg-purple-600',
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
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                )
              })}

              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </header>
          <main className="grow">{children}</main>
        </body>
      </ClerkProvider>
    </html>
  )
}

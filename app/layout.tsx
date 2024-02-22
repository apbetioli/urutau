import './globals.css'

import {
  ClerkProvider,
  OrganizationSwitcher,
  SignedIn,
  UserButton,
} from '@clerk/nextjs'

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
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          variables: { colorPrimary: '#000000' },
          elements: {
            formButtonPrimary:
              'bg-black border border-black border-solid hover:bg-white hover:text-black',
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
        <body
          className={`${inter.className} h-screen flex flex-col bg-black text-white`}
        >
          <SignedIn>
            <header className="flex w-full items-center h-20 gap-4 px-4 border-b border-white/20 border-solid sm:px-8 border-opacity-20">
              <Link href="/" className="flex items-center h-20 gap-2 sm:gap-4">
                <h1 className="text-2xl">Urutau</h1>
              </Link>
              <div className="grow" />
              <div className="hidden sm:block">
                <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard" />
              </div>
              <div className="block sm:hidden">
                <OrganizationSwitcher
                  afterCreateOrganizationUrl="/dashboard"
                  appearance={{
                    elements: {
                      organizationSwitcherTriggerIcon: `hidden`,
                      organizationPreviewTextContainer: `hidden`,
                      organizationSwitcherTrigger: `pr-0`,
                    },
                  }}
                />
              </div>
              <UserButton afterSignOutUrl="/" />
            </header>
          </SignedIn>
          <main className="grow">{children}</main>
        </body>
      </ClerkProvider>
    </html>
  )
}

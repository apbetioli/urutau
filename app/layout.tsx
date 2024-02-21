import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Urutau',
  description: 'Bedtime stories',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex w-screen h-screen bg-slate-900 justify-center items-center text-white">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}

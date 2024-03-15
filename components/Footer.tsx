'use client'

import Link from 'next/link'
import { GithubIcon } from './icons'

export default function Footer() {
  const footerLinks = [
    { href: '/soon?p=pricing', label: 'Pricing' },
    { href: '/soon?p=faqs', label: 'FAQs' },
    { href: '/soon?p=terms', label: 'Terms of service' },
    { href: '/soon?p=privacy', label: 'Privacy policy' },
    { href: 'https://github.com/apbetioli/urutau', label: <GithubIcon /> },
  ]
  return (
    <footer className="flex flex-col sm:flex-row items-center sm:h-20 gap-6 p-8 font-medium border-t border-white/20 text-sm">
      <span>Urutau © 2024</span>
      <nav className="flex justify-end grow items-center gap-6 flex-col sm:flex-row ">
        {footerLinks.map((link) => {
          return (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          )
        })}
      </nav>
    </footer>
  )
}

import Link from "next/link"
import { Github } from "./icons"

export default function Footer() {
    const footerLinks = [
        { href: '/soon', label: 'Pricing'},
        { href: '/soon', label: 'FAQs' },
        { href: '/soon', label: 'Terms of service' },
        { href: '/soon', label: 'Privacy policy' },
        { href: 'https://github.com/apbetioli/urutau', label: <Github /> },
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
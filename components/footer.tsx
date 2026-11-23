"use client"

import Link from "next/link"
import { Linkedin, Mail } from "lucide-react"

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:fahrezirakhan@gmail.com", label: "Email" },
]

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">R</span>
              </div>
              <span className="font-semibold text-lg text-foreground">Rakhan Fahrezi</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Data Analyst & Business Intelligence Specialist • S1 Sistem Informasi Universitas Mercu Buana, Jakarta.
            </p>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:block">
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="hidden md:block">
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Get In Touch</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Terbuka untuk diskusi, kolaborasi proyek data, maupun peluang Data Analyst & BI.
            </p>
            <Link
              href="/contact"
              className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Hubungi Saya
            </Link>
          </div>
        </div>

        {/* Social Links - Mobile */}
        <div className="md:hidden mb-8">
          <h3 className="font-semibold text-foreground mb-4">Connect</h3>
          <div className="flex space-x-4">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                  aria-label={link.label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Rakhan Fahrezi Aritonang. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">Jakarta, Indonesia</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
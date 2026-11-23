"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import ContactInfo from "@/components/contact-info"
import { Sparkles } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl opacity-25"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  Open to Data Analyst & BI Opportunities
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold gradient-text">Hubungi Saya</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Terbuka untuk diskusi seputar peran Data Analyst, Business Intelligence, analisis data operasional,
                maupun kolaborasi proyek. Silakan kirim pesan melalui formulir atau kontak langsung di bawah ini.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
              {/* Contact Form */}
              <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl border border-border/50 bg-card/50">
                <h2 className="text-2xl font-bold text-foreground mb-2">Kirim Pesan</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Isi detail pesan Anda di bawah ini untuk terhubung langsung via WhatsApp atau Email.
                </p>
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div>
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
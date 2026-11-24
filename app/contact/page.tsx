"use client"

import { useState, type FormEvent } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Send,
} from "lucide-react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const mailSubject = encodeURIComponent(
      subject.trim() || `Pesan Portofolio dari ${name.trim() || "Pengunjung"}`
    )
    const mailBody = encodeURIComponent(
      `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
    )

    window.location.href = `mailto:rakhanfahrezi04@gmail.com?subject=${mailSubject}&body=${mailBody}`
    setSubmitted(true)
  }

  const contactItems = [
    {
      icon: MessageSquare,
      label: "WhatsApp",
      value: "+62 856-0984-1374",
      helper: "Respon cepat untuk diskusi rekrutmen & peluang kerja",
      href: "https://wa.me/6285609841374",
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: "rakhanfahrezi04@gmail.com",
      helper: "Cocok untuk kirim detail posisi, undangan interview, atau kerja sama",
      href: "mailto:rakhanfahrezi04@gmail.com",
      external: false,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Rakhan Fahrezi Aritonang",
      helper: "Riwayat pengalaman, pendidikan & jaringan profesional",
      href: "https://www.linkedin.com",
      external: true,
    },
      ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Header Kontak */}
        <section className="py-16 md:py-24 border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl opacity-25" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  Jakarta Barat, Indonesia • Terbuka untuk Peluang Data &amp; BI
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Hubungi <span className="gradient-text">Saya</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Terbuka untuk peluang penuh waktu, magang, atau kolaborasi proyek di bidang{" "}
                <strong className="text-foreground">Data Analyst</strong>,{" "}
                <strong className="text-foreground">Business Intelligence</strong>, maupun{" "}
                <strong className="text-foreground">Operational Analytics</strong> di area Jakarta
                maupun skema kerja fleksibel.
              </p>
            </div>
          </div>
        </section>

        {/* Kartu Kontak & Form Pesan */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Kanal Kontak Langsung */}
              <div className="lg:col-span-5 space-y-4">
                <h2 className="text-xl font-bold text-foreground mb-2">Kanal Kontak Langsung</h2>

                {contactItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="block p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {item.label}
                          </p>
                          <p className="text-base font-bold text-foreground group-hover:text-primary transition-colors truncate mt-0.5">
                            {item.value}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{item.helper}</p>
                        </div>
                      </div>
                    </a>
                  )
                })}

                <div className="p-5 rounded-2xl border border-border bg-card/70 space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Domisili &amp; Ketersediaan
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Jakarta Barat, DKI Jakarta
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Siap bergabung dan beradaptasi cepat untuk kebutuhan pelaporan BI, analisis
                    data SQL &amp; Python, serta koordinasi operasional berbasis data.
                  </p>
                </div>
              </div>

              {/* Form Kirim Pesan */}
              <div className="lg:col-span-7">
                <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Kirim Pesan</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Isi formulir di bawah ini untuk mengirim pesan langsung melalui aplikasi email
                      Anda.
                    </p>
                  </div>

                  {submitted && (
                    <div className="flex items-start gap-3 p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-sm text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Draf email telah disiapkan.</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Jika aplikasi email tidak terbuka otomatis, Anda dapat langsung mengirim
                          pesan ke <span className="font-medium text-foreground">rakhanfahrezi04@gmail.com</span> atau menghubungi WhatsApp di{" "}
                          <span className="font-medium text-foreground">+62 856-0984-1374</span>.
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                          Nama Lengkap
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Nama Anda atau perusahaan"
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                          Alamat Email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="nama@perusahaan.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Subjek / Topik
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Contoh: Peluang Posisi Data Analyst / Business Intelligence"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Pesan
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tuliskan detail posisi, jadwal diskusi, atau pertanyaan Anda..."
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto rounded-xl gap-2 font-semibold"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim Pesan</span>
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
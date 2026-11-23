"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Mail } from "lucide-react"

const WHATSAPP_NUMBER = "6285609841374"
const CONTACT_EMAIL = "rakhanfahrezi@gmail.com"

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const formatMessageBody = () => {
    return [
      `Halo Rakhan, saya *${formState.name}* (${formState.email}).`,
      `*Subjek:* ${formState.subject}`,
      "",
      formState.message,
    ].join("\n")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const encodedText = encodeURIComponent(formatMessageBody())
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, "_blank", "noopener,noreferrer")
      setSubmitMessage("Mengarahkan ke WhatsApp... Terima kasih telah menghubungi!")
      setFormState({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setSubmitMessage(""), 5000)
    } catch {
      setSubmitMessage("Terjadi kendala saat membuka WhatsApp. Silakan coba kirim melalui Email.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailFallback = () => {
    const subject = encodeURIComponent(formState.subject || "Kontak dari Portofolio")
    const body = encodeURIComponent(
      `Nama: ${formState.name || "-"}\nEmail: ${formState.email || "-"}\n\n${formState.message || ""}`
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Nama Lengkap
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Masukkan nama Anda"
            value={formState.name}
            onChange={handleChange}
            required
            className="bg-card border-border"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Alamat Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="nama@perusahaan.com"
            value={formState.email}
            onChange={handleChange}
            required
            className="bg-card border-border"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          Subjek
        </label>
        <Input
          id="subject"
          name="subject"
          placeholder="Contoh: Peluang Data Analyst / BI / Kolaborasi Proyek"
          value={formState.subject}
          onChange={handleChange}
          required
          className="bg-card border-border"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Pesan
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tuliskan detail kebutuhan, posisi, atau proyek data yang ingin didiskusikan..."
          value={formState.message}
          onChange={handleChange}
          required
          rows={5}
          className="bg-card border-border resize-none"
        />
      </div>

      {submitMessage && (
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-foreground text-sm">
          {submitMessage}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-semibold"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          {isSubmitting ? "Membuka WhatsApp..." : "Kirim via WhatsApp"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleEmailFallback}
          className="sm:w-auto h-11 border-border hover:bg-accent/10 font-medium"
        >
          <Mail className="w-4 h-4 mr-2" />
          Kirim via Email
        </Button>
      </div>
    </form>
  )
}
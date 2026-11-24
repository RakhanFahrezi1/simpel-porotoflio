"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Mail, CheckCircle2, AlertCircle } from "lucide-react"

const WHATSAPP_NUMBER = "6285609841374"
const CONTACT_EMAIL = "rakhanfahrezi@gmail.com"

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

const INITIAL_FORM_STATE: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{
    type: "success" | "error" | null
    text: string
  }>({ type: null, text: "" })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (status.type) {
      setStatus({ type: null, text: "" })
    }
  }

  const formatWhatsAppBody = () => {
    return [
      `Halo Rakhan, saya *${formState.name.trim()}* (${formState.email.trim()}).`,
      `*Subjek:* ${formState.subject.trim()}`,
      "",
      formState.message.trim(),
    ].join("\n")
  }

  const formatEmailBody = () => {
    return [
      `Nama: ${formState.name.trim() || "-"}`,
      `Email: ${formState.email.trim() || "-"}`,
      "",
      formState.message.trim() || "",
    ].join("\n")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const name = formState.name.trim()
    const email = formState.email.trim()
    const subject = formState.subject.trim()
    const message = formState.message.trim()

    if (!name || !email || !subject || !message) {
      setStatus({
        type: "error",
        text: "Mohon lengkapi semua kolom sebelum mengirim pesan.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const encodedText = encodeURIComponent(formatWhatsAppBody())
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`
      const newWindow = window.open(waUrl, "_blank", "noopener,noreferrer")

      if (!newWindow) {
        setStatus({
          type: "error",
          text: "Pop-up diblokir browser. Izinkan pop-up atau gunakan tombol Kirim via Email.",
        })
        return
      }

      setStatus({
        type: "success",
        text: "Tab WhatsApp telah dibuka. Silakan tekan Kirim di WhatsApp untuk menyelesaikan pesan.",
      })

      setTimeout(() => {
        setFormState(INITIAL_FORM_STATE)
      }, 1500)
    } catch {
      setStatus({
        type: "error",
        text: "Terjadi kendala saat membuka WhatsApp. Silakan coba kirim melalui Email.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailFallback = () => {
    const subject = encodeURIComponent(
      formState.subject.trim() || "Kontak dari Portofolio Rakhan Fahrezi"
    )
    const body = encodeURIComponent(formatEmailBody())
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Nama Lengkap
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
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
            autoComplete="email"
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
          type="text"
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

      {status.type && (
        <div
          role="alert"
          className={`p-4 rounded-xl border text-sm flex items-start gap-2.5 ${
            status.type === "success"
              ? "bg-primary/10 border-primary/30 text-foreground"
              : "bg-destructive/10 border-destructive/30 text-destructive"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
          ) : (
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-destructive" />
          )}
          <span>{status.text}</span>
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
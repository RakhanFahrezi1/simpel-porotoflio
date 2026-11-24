"use client"

import { useState } from "react"
import { config } from "@/lib/site-config"
import { Mail, Phone, MapPin, Check, Copy } from "lucide-react"

export default function ContactInfo() {
  const { email, phone, location } = config.personal
  const socials = config.socialMedia
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    } catch {
      setCopiedKey(null)
    }
  }

  const contactItems = [
    {
      key: "email",
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      copyValue: email,
    },
    {
      key: "phone",
      icon: Phone,
      label: "Telepon / WhatsApp",
      value: phone,
      href: `tel:${phone.replace(/[^\d+]/g, "")}`,
      copyValue: phone,
    },
    {
      key: "location",
      icon: MapPin,
      label: "Lokasi",
      value: location,
      href: null,
      copyValue: null,
    },
  ]

  const formatSocialHandle = (key: string, username: string) => {
    const clean = username.trim()
    if (!clean) return ""
    if (key.toLowerCase().includes("whatsapp") || /^\+?\d[\d\s-]{6,}$/.test(clean)) {
      return clean
    }
    return clean.startsWith("@") ? clean : `@${clean}`
  }

  return (
    <div className="space-y-8">
      {/* Contact Items */}
      <div className="space-y-6">
        {contactItems.map((item) => {
          const Icon = item.icon
          const isCopied = copiedKey === item.key

          return (
            <div key={item.key}>
              <div className="flex items-center space-x-3 mb-1.5">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">{item.label}</h3>
              </div>

              <div className="flex items-center justify-between gap-2 ml-11">
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors break-all"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                )}

                {item.copyValue && (
                  <button
                    type="button"
                    onClick={() => handleCopy(item.key, item.copyValue!)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors shrink-0"
                    aria-label={`Salin ${item.label}`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Social Links */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Terhubung di Media Sosial</h3>
        <div className="space-y-3">
          {Object.entries(socials).map(([key, social]) => {
            const handle = formatSocialHandle(key, social.username)

            return (
              <a
                key={key}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-colors"
              >
                <span className="text-sm font-medium text-foreground capitalize">
                  {key}
                </span>
                {handle && (
                  <span className="text-xs text-muted-foreground">{handle}</span>
                )}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
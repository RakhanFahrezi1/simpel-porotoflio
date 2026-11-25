"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Database,
  Download,
  Layers,
  LineChart,
  Sparkles,
  X,
} from "lucide-react"

const certificatesData = [
  {
    title: "Sertifikasi Kompetensi BNSP",
    image: "/images/certificates/bnsp.png",
  },
  {
    title: "Certificate of Appreciation — Data Analyst",
    image: "/images/certificates/data-analyst.png",
  },
  {
    title: "Certificate of Experience — Magang PT Integrasi Jaringan Ekosistem (WEAVE)",
    image: "/images/certificates/magang-weave.png",
  },
  {
    title: "Oracle Academy — Database Design",
    image: "/images/certificates/database-design.png",
  },
  {
    title: "Oracle Academy — Database Programming with SQL",
    image: "/images/certificates/oracle-sql.png",
  },
  {
    title: "Sertifikat PKM — Universitas Mercu Buana",
    image: "/images/certificates/pkm.png",
  },
  {
    title: "Sertifikat Visualize Data Like a Pro — Smartpath",
    image: "/images/certificates/smartpath.png",
  },
  {
    title: "Oracle Academy — Java Fundamentals",
    image: "/images/certificates/java-fundamental.png",
  },
]

export default function Home() {
  const [openCertificates, setOpenCertificates] = useState(false)
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null)

  const handleCloseModal = () => {
    setOpenCertificates(false)
    setSelectedCertIndex(null)
  }

  const toggleCertificate = (idx: number) => {
    setSelectedCertIndex((prev) => (prev === idx ? null : idx))
  }

  const features = [
    {
      icon: Database,
      title: "SQL & Data Modeling",
      description: "Querying, Star Schema, ERD, SQLite, DBeaver, serta Google BigQuery.",
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: BarChart3,
      title: "Business Intelligence",
      description: "Dashboard interaktif dan metrik operasional di Metabase, Power BI, Looker Studio, dan Tableau.",
      color: "from-emerald-600 to-teal-600",
    },
    {
      icon: LineChart,
      title: "Python & Statistical Analysis",
      description: "Pengolahan, segmentasi, dan pemodelan data menggunakan Python (Pandas, NumPy, SciPy) serta Excel.",
      color: "from-violet-600 to-indigo-600",
    },
    {
      icon: Layers,
      title: "Operational Analytics",
      description: "Menghubungkan data transaksi, stok, dan pengeluaran harian dengan keputusan operasional terukur.",
      color: "from-amber-600 to-orange-600",
    },
  ]

  const stats = [
    { number: "S1", label: "Sistem Informasi (BNSP Certified)" },
    { number: "SQL & BI", label: "BigQuery, DBeaver, Metabase, Power BI" },
    { number: "Python", label: "Pandas, NumPy & Data Analytics" },
    { number: "Jakarta", label: "Mercu Buana & Operasional" },
  ]

  const workflowSteps = [
    {
      step: "01",
      title: "Problem & Metric Framing",
      desc: "Menentukan KPI, tujuan bisnis, dan definisi metrik yang jelas.",
    },
    {
      step: "02",
      title: "Extraction & Cleaning",
      desc: "Menarik, merapikan, dan menyusun skema data di SQL, Python, atau Excel.",
    },
    {
      step: "03",
      title: "Analysis & Modeling",
      desc: "Menggali tren, segmentasi, dan pola statistik menggunakan SQL, Python, dan Excel.",
    },
    {
      step: "04",
      title: "BI Dashboard & Action",
      desc: "Menyajikan visualisasi di Metabase, Power BI, Looker Studio, atau Tableau untuk tindakan nyata.",
    },
  ]

  const highlights = [
    {
      title: "Starlite Wi-Fi Operational Dashboard",
      context: "Data Analyst Intern • PT Integrasi Jaringan Ekosistem (WEAVE)",
      summary:
        "Merancang dashboard monitoring layanan internet di Metabase untuk memantau registrasi pelanggan, permintaan coverage, performa mitra sales, dan pendapatan.",
      stack: "Metabase • SQL • Operational Metrics",
    },
    {
      title: "Uih Ka Imah Operational & Cost Tracking",
      context: "Koordinator Operasional & Data • Warung Uih Ka Imah",
      summary:
        "Mengelola operasional harian, jadwal tim, stok, serta dashboard pengeluaran dan pembelian bahan baku di Looker Studio untuk efisiensi biaya.",
      stack: "Looker Studio • Excel • Cost & Inventory Ops",
    },
    {
      title: "RFM Segmentation & Demand Simulator",
      context: "Data & BI Analytics • SQL, Python & Next.js",
      summary:
        "Menerapkan segmentasi pelanggan RFM berbasis SQL & Python serta simulator proyeksi permintaan dan Reorder Point untuk mendukung keputusan bisnis.",
      stack: "SQL • Python (Pandas) • Forecasting & ROP",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="min-h-[88vh] flex items-center justify-center relative overflow-hidden py-16">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-35" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl opacity-25" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  S1 Sistem Informasi (BI) • BNSP Certified • Universitas Mercu Buana
                </span>
              </div>

              <div className="flex justify-center">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-br from-primary to-accent shadow-xl">
                  <img
                    src="/images/profile.jpg"
                    alt="Rakhan Fahrezi Aritonang"
                    className="w-full h-full object-cover object-top rounded-full bg-card"
                  />
                </div>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight">
                <span className="block text-foreground">Rakhan Fahrezi Aritonang</span>
                <span className="block gradient-text">Data &amp; BI Analyst</span>
              </h1>

              <p className="text-base sm:text-lg text-foreground/85 max-w-3xl mx-auto leading-relaxed">
                Lulusan S1 Sistem Informasi (Universitas Mercu Buana) bersertifikasi BNSP dengan
                spesialisasi Business Intelligence dan Operational Analytics. Berpengalaman membangun
                dashboard monitoring layanan internet di PT Integrasi Jaringan Ekosistem (WEAVE)
                menggunakan Metabase. Mengelola Data Operasional dan efisiensi biaya Bisnis F&B Uih
                Ka Imah. Terbiasa mengolah data menggunakan SQL, Python, Excel, Power BI, Looker Studio,
                dan Tableau untuk menghasilkan insight bisnis yang terukur.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center pt-2">
                <a
                  href="/projects"
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-2xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
                >
                  Lihat Proyek Data
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="/about"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border border-primary/40 bg-card text-foreground rounded-2xl font-semibold text-sm sm:text-base hover:bg-primary/10 transition-all"
                >
                  Profil &amp; Keahlian
                </a>

                <a
                  href="/CV Rakhan Fahrezi Aritonang.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-border bg-card text-foreground rounded-2xl font-semibold text-sm sm:text-base hover:border-primary/50 transition-all"
                >
                  <Download className="w-4 h-4 text-primary" />
                  <span>Unduh CV</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCertIndex(null)
                    setOpenCertificates(true)
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-border bg-card text-foreground rounded-2xl font-semibold text-sm sm:text-base hover:border-primary/50 transition-all"
                >
                  <Award className="w-4 h-4 text-primary" />
                  <span>Sertifikat</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-y border-border bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center rounded-2xl border border-border bg-card p-6 shadow-xs"
                >
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-foreground font-medium leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Analytics Stack Section — Kontras Tinggi & Tanpa Terpotong */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Core <span className="gradient-text">Analytics Stack</span>
              </h2>
              <p className="text-base sm:text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Kombinasi SQL, Business Intelligence, pemrograman analitik, dan pemahaman proses bisnis operasional
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="h-full flex flex-col justify-start p-7 rounded-3xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all"
                  >
                    <div
                      className={`inline-flex w-fit p-3.5 rounded-2xl bg-gradient-to-br ${feature.color} mb-5 shadow-md`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 leading-snug break-words">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-foreground/80 leading-relaxed break-words">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Analytics Workflow Section — Semua Langkah 01-04 Terbaca Jelas */}
        <section className="py-20 md:py-28 border-y border-border bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Analytics <span className="gradient-text">Workflow</span>
              </h2>
              <p className="text-base sm:text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Pendekatan sistematis dari perumusan masalah bisnis hingga dashboard dan insight siap pakai
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowSteps.map((process) => (
                <div
                  key={process.step}
                  className="h-full flex flex-col items-center text-center rounded-3xl border border-border bg-card p-7 shadow-sm hover:border-primary/50 transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg mb-5 shadow-md">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2.5 leading-snug break-words">
                    {process.title}
                  </h3>
                  <p className="text-sm text-foreground/80 leading-relaxed break-words">
                    {process.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights / Experience & Case Studies Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Experience &amp; <span className="gradient-text">Case Highlights</span>
              </h2>
              <p className="text-base sm:text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Ringkasan pengalaman analitik, operasional, dan studi kasus data yang pernah dikerjakan
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="h-full p-7 rounded-3xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-2 text-primary text-sm font-semibold mb-3">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{item.context}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-foreground/80 mb-6 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                  <div className="text-xs sm:text-sm text-foreground font-semibold pt-4 border-t border-border">
                    {item.stack}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-border relative overflow-hidden bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 px-9 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Hubungi Saya
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/projects"
                className="inline-flex items-center gap-3 px-9 py-4 border-2 border-primary bg-card text-primary rounded-2xl font-bold text-base sm:text-lg hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Lihat Semua Proyek
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Modal Daftar Sertifikat */}
      {openCertificates && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Sertifikat</h2>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Tutup sertifikat"
                className="p-2 rounded-xl border border-border hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {certificatesData.map((cert, idx) => {
                const isOpen = selectedCertIndex === idx
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border/70 bg-background/60 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleCertificate(idx)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-foreground">{cert.title}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 border-t border-border/50">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full rounded-xl border border-border/50 object-contain bg-muted mt-2"
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
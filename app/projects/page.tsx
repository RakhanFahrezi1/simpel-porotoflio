"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProjectCard, { type ProjectItem } from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, CheckCircle2, X } from "lucide-react"

const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: "Project Magang — Starlite Wi-Fi Monitoring Dashboard",
    category: "BI & Dashboard",
    role: "Data Analyst Intern • PT Integrasi Jaringan Ekosistem (WEAVE)",
    period: "2025 • Metabase",
    image: "/images/projects/project-1-magang-starlite.png",
    shortDescription: "Dashboard monitoring metrik layanan, registrasi pelanggan, prospek, dan performa Starlite Wi-Fi",
    description:
      "Merancang dan mengembangkan dashboard interaktif menggunakan Metabase selama magang untuk memantau kinerja layanan Starlite Wi-Fi, tingkat registrasi pelanggan, performa prospek, serta distribusi wilayah dan transaksi.",
    highlights: [
      "Monitoring KPI utama, tingkat konversi/registrasi, dan persebaran wilayah layanan",
      "Mengubah data operasional menjadi ringkasan visual untuk evaluasi bisnis",
    ],
    technologies: ["Metabase", "SQL", "Business Intelligence", "KPI Dashboard"],
    featured: true,
  },
  {
    id: 2,
    title: "Dashboard Pengeluaran & Pembelian Bahan Baku Uih Ka Imah",
    category: "Operations & Data",
    role: "Koordinator Operasional & Data • Warung Uih Ka Imah",
    period: "Looker Studio",
    image: "/images/projects/project-2-uih-ka-imah.jpg",
    shortDescription: "Pemantauan total pengeluaran, perbandingan cabang, kategori beban, vendor, dan pembelian bahan baku",
    description:
      "Membangun dashboard pelaporan di Looker Studio untuk melacak pengeluaran operasional per cabang, proporsi kategori beban, rincian transaksi, serta harga dan pembelian bahan baku berdasarkan vendor dan metode bayar.",
    highlights: [
      "Filter interaktif berdasarkan cabang dan bulan untuk pemantauan rutin",
      "Rekapitulasi pengeluaran per cabang, kategori beban, dan top vendor bahan baku",
    ],
    technologies: ["Looker Studio", "Operational Data", "Cost & Vendor Tracking", "Reporting"],
    featured: true,
  },
  {
    id: 3,
    title: "Dashboard Penjualan Multi-Channel & Promosi (2025)",
    category: "BI & Dashboard",
    role: "Business Intelligence / Data Analyst",
    period: "Power BI",
    image: "/images/projects/project-3-sales-channel-promo.png",
    shortDescription: "Analisis revenue, net revenue, transaksi bulanan, promo, channel penjualan, dan segmen pelanggan",
    description:
      "Menganalisis performa penjualan lintas channel (POS Kasir, GrabFood, GoFood, Website, Tokopedia, ShopeeFood) beserta dampak promo, metode pembayaran, wilayah provinsi, produk terlaris, dan segmen pelanggan.",
    highlights: [
      "Monitoring Revenue (86M), Net Revenue (78M), Quantity Terjual, Total Transaksi, dan Diskon",
      "Pemetaan penjualan per channel, segmen pelanggan, provinsi, dan produk",
    ],
    technologies: ["Power BI", "Sales Analytics", "Promo & Channel Analysis", "Data Visualization"],
    featured: true,
  },
  {
    id: 4,
    title: "Dashboard Supermarket — Profit & Product Line",
    category: "BI & Dashboard",
    role: "Business Intelligence / Data Analyst",
    period: "BI Dashboard",
    image: "/images/projects/project-4-supermarket.png",
    shortDescription: "Pemantauan profit, revenue, net revenue, rating rata-rata, dan metode pembayaran per product line",
    description:
      "Menyusun dashboard performa supermarket untuk memantau jumlah product line, kuantitas terjual, revenue, net revenue, tren profit harian, rata-rata rating pelanggan, serta kontribusi metode pembayaran.",
    highlights: [
      "Filter berdasarkan metode pembayaran (Payment) dan gender",
      "Perbandingan performa dan rating antar lini produk (Food & beverages, Fashion, dll.)",
    ],
    technologies: ["Data Visualization", "Retail Analytics", "KPI Reporting", "Dashboard Design"],
    featured: false,
  },
  {
    id: 5,
    title: "Dashboard Data Covid Regional Indonesia",
    category: "BI & Dashboard",
    role: "Business Intelligence / Data Analyst",
    period: "Tableau Public",
    image: "/images/projects/project-5-covid-tableau.jpg",
    shortDescription: "Visualisasi total kasus, kasus baru, kematian, pemulihan, dan peta persebaran per provinsi",
    description:
      "Mengolah dan memvisualisasikan data kasus regional di Tableau Public guna memantau perkembangan total kasus, kasus baru, total kematian, total pemulihan, serta persebaran antarprovinsi di Indonesia.",
    highlights: [
      "Peta interaktif dan perbandingan metrik per provinsi",
      "Visualisasi tren tahunan, total kematian, dan pemulihan wilayah",
    ],
    technologies: ["Tableau", "Geo Mapping", "Data Visualization", "Public Analytics"],
    featured: false,
  },
  {
    id: 6,
    title: "Mental Care — Prototipe Aplikasi Kesehatan Mental",
    category: "Analytics & Research",
    role: "UI/UX & Product Prototype • PKM",
    period: "Mobile UI/UX",
    image: "/images/projects/project-6-mental-care.jpg",
    shortDescription: "Rancangan alur pendaftaran, topik konseling, rekomendasi psikolog, jadwal sesi, dan pembayaran",
    description:
      "Merancang antarmuka aplikasi mobile Mental Care yang menyediakan alur pendaftaran, pemilihan topik konseling, direktori rekomendasi psikolog, pemilihan jadwal konsultasi, hingga pembayaran dalam satu aplikasi.",
    highlights: [
      "Alur eksplorasi topik konseling dan rekomendasi psikolog terpercaya",
      "Desain layar penjadwalan waktu konsultasi dan metode pembayaran",
    ],
    technologies: ["UI/UX Design", "Mobile Prototyping", "User Flow", "Product Design"],
    featured: false,
  },
  {
    id: 7,
    title: "Interactive BI Playground — E-Commerce & Digital Marketing",
    category: "BI & Dashboard",
    role: "Data & BI Analyst • Portfolio Project",
    period: "2026 • Next.js & Recharts",
    image: "/images/projects/playground.jpg",
    shortDescription:
      "Dashboard BI interaktif berbasis web untuk mengeksplorasi dataset E-Commerce Indonesia dan Digital Marketing (ROAS) dalam Rupiah, lengkap dengan filter dan upload CSV mandiri.",
    description:
      "Membangun halaman BI Playground interaktif di Next.js untuk mendemonstrasikan analisis KPI penjualan e-commerce dan efisiensi kampanye digital secara langsung bagi HRD maupun hiring manager.",
    highlights: [
      "Beralih instan antara dataset E-Commerce Indonesia dan Digital Marketing & ROAS dalam Rupiah",
      "Filter channel/platform dinamis, KPI card, insight otomatis, serta fitur upload file CSV mandiri",
    ],
    technologies: ["Next.js", "TypeScript", "PapaParse", "Recharts", "Tailwind CSS"],
    featured: true,
    href: "/projects/bi-playground",
    
  },
  
]

const categories = ["All", "BI & Dashboard", "Operations & Data", "Analytics & Research"] as const

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === selectedCategory)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl opacity-25" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  Data Analytics, Business Intelligence &amp; Operations Portfolio
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold gradient-text">Proyek &amp; Pengalaman Data</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Kumpulan proyek dashboard Business Intelligence, pelaporan operasional, visualisasi data, serta
                perancangan produk berbasis data.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2.5 mt-8">
              {categories.map((category) => {
                const isActive = selectedCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      isActive
                        ? "px-4 py-2 rounded-xl text-sm font-medium transition-all bg-primary text-primary-foreground shadow-sm"
                        : "px-4 py-2 rounded-xl text-sm font-medium transition-all bg-card/60 text-muted-foreground border border-border/60 hover:border-primary/40 hover:text-foreground"
                    }
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(item) => setSelectedProject(item)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Modal Detail Proyek */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {selectedProject.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{selectedProject.period}</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground pt-1">{selectedProject.title}</h2>
                <p className="text-sm font-medium text-primary">{selectedProject.role}</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Tutup detail"
                className="p-2 rounded-xl border border-border hover:bg-muted transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full rounded-2xl overflow-hidden border border-border bg-muted">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full max-h-80 object-contain bg-background"
              />
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {selectedProject.description}
            </p>

            {selectedProject.highlights && selectedProject.highlights.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Poin Utama</h3>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 border-t border-border/60">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Tools &amp; Teknologi
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

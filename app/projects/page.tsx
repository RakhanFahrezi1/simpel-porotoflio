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
    shortDescription:
      "Dashboard monitoring layanan Starlite Wi-Fi untuk mengevaluasi konversi registrasi, performa prospek, dan distribusi wilayah",
    description:
      "Merancang dan mengembangkan dashboard interaktif berbasis Metabase selama magang di PT Integrasi Jaringan Ekosistem (WEAVE) guna membantu tim memantau kinerja layanan Starlite Wi-Fi, laju registrasi pelanggan, performa prospek, serta sebaran wilayah dan transaksi secara real-time.",
    highlights: [
      "Menyatukan KPI utama, tingkat konversi registrasi pelanggan, dan persebaran wilayah layanan dalam satu tampilan terpusat",
      "Mempercepat evaluasi performa prospek dan kesehatan transaksi operasional bagi tim bisnis",
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
    shortDescription:
      "Kontrol pengeluaran cabang, kategori beban, vendor, dan pembelian bahan baku untuk efisiensi biaya operasional",
    description:
      "Membangun dashboard pelaporan di Looker Studio untuk mengendalikan pengeluaran operasional per cabang, memetakan proporsi kategori beban, serta mengevaluasi fluktuasi harga dan pembelian bahan baku berdasarkan vendor dan metode bayar di Warung Uih Ka Imah.",
    highlights: [
      "Menyediakan filter interaktif per cabang dan bulan untuk mendeteksi lonjakan beban operasional lebih dini",
      "Membandingkan efisiensi pembelian bahan baku antar-vendor dan metode pembayaran guna mendukung negosiasi supplier",
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
    shortDescription:
      "Evaluasi revenue, net revenue, efektivitas diskon, dan kontribusi channel penjualan untuk optimasi promosi",
    description:
      "Menganalisis performa penjualan lintas channel (POS Kasir, GrabFood, GoFood, Website, Tokopedia, ShopeeFood) untuk mengukur dampak program promo terhadap margin, metode pembayaran, potensi wilayah provinsi, produk terlaris, dan segmen pelanggan.",
    highlights: [
      "Memantau rasio Revenue (86M) terhadap Net Revenue (78M), total diskon, kuantitas terjual, dan frekuensi transaksi",
      "Mengidentifikasi channel penjualan, wilayah provinsi, dan lini produk dengan kontribusi tertinggi untuk alokasi anggaran promo",
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
    shortDescription:
      "Analisis profitabilitas lini produk, tren laba harian, kepuasan pelanggan, dan preferensi metode pembayaran",
    description:
      "Menyusun dashboard performa ritel supermarket untuk mengevaluasi kontribusi profit per product line, pergerakan laba harian, rata-rata rating kepuasan pelanggan, serta preferensi metode pembayaran berdasarkan segmen pembeli.",
    highlights: [
      "Memungkinkan segmentasi cepat berdasarkan metode pembayaran (Payment) dan gender untuk memahami pola belanja pelanggan",
      "Membandingkan margin keuntungan dan skor rating antar lini produk (Food & beverages, Fashion, dll.) sebagai dasar prioritas stok",
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
    shortDescription:
      "Pemetaan sebaran kasus regional, rasio pemulihan, dan tren tahunan antarprovinsi di Indonesia",
    description:
      "Mengolah dan memvisualisasikan data epidemiologi regional di Tableau Public guna memantau perbandingan kasus aktif, kasus baru, tingkat kematian, dan tingkat pemulihan antarprovinsi di Indonesia secara geografis maupun historis.",
    highlights: [
      "Menyajikan peta interaktif antarprovinsi untuk mengidentifikasi wilayah dengan konsentrasi kasus tertinggi secara cepat",
      "Melacak tren tahunan dan perbandingan rasio pemulihan terhadap total kasus per wilayah",
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
    shortDescription:
      "Perancangan alur layanan konseling digital mulai dari pemetaan topik, pemilihan psikolog, hingga penjadwalan",
    description:
      "Merancang prototipe aplikasi mobile Mental Care berbasis kebutuhan pengguna untuk menyederhanakan perjalanan pasien dalam memilih topik konseling, mencocokkan rekomendasi psikolog, mengatur jadwal sesi, hingga menyelesaikan pembayaran dalam satu alur terpadu.",
    highlights: [
      "Merancang alur eksplorasi topik konseling dan pencocokan profil psikolog untuk menurunkan hambatan awal pengguna",
      "Menyederhanakan proses booking jadwal konsultasi dan pembayaran guna meningkatkan kelancaran konversi sesi",
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
    image: "/images/projects/bi-foto.jpg",
    shortDescription:
      "Dashboard BI interaktif berbasis web untuk mengeksplorasi dataset E-Commerce Indonesia dan Digital Marketing (ROAS) dalam Rupiah, lengkap dengan filter dan upload CSV mandiri",
    description:
      "Membangun halaman BI Playground interaktif di Next.js untuk mendemonstrasikan analisis KPI penjualan e-commerce dan efisiensi kampanye digital (ROAS) dalam Rupiah secara langsung bagi HRD maupun hiring manager.",
    highlights: [
      "Beralih instan antara dataset E-Commerce Indonesia dan Digital Marketing & ROAS dalam Rupiah untuk evaluasi channel dan kampanye",
      "Filter channel/platform dinamis, KPI card, insight otomatis, serta fitur upload file CSV mandiri untuk eksplorasi data langsung",
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

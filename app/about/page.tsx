"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import {
  BarChart3,
  Database,
  LineChart,
  Layers,
  Award,
  GraduationCap,
  Briefcase,
  FolderKanban,
  Table2,
  Cpu,
  CheckCircle2,
} from "lucide-react"

interface SkillItem {
  name: string
  detail: string
  badgeColor: string
}

export default function AboutPage() {
  const stats = [
    {
      label: "Pendidikan",
      value: "S1",
      icon: GraduationCap,
      color: "from-orange-600 to-orange-400",
      desc: "Sistem Informasi (BI) • Lulus 2026",
    },
    {
      label: "Magang BI",
      value: "WEAVE",
      icon: Briefcase,
      color: "from-blue-600 to-blue-400",
      desc: "Starlite Wi-Fi Metabase",
    },
    {
      label: "Operasional & Data",
      value: "Uih Ka Imah",
      icon: Layers,
      color: "from-green-600 to-green-400",
      desc: "2+ Tahun • Stok, Jadwal & Biaya",
    },
    {
      label: "BI & Visualisasi",
      value: "4+ Tools",
      icon: BarChart3,
      color: "from-purple-600 to-purple-400",
      desc: "Metabase, Power BI, Looker, Tableau",
    },
    {
      label: "Data & Modeling",
      value: "SQL • Py • R",
      icon: Database,
      color: "from-red-600 to-red-400",
      desc: "BigQuery, SQLite, DBeaver, Excel",
    },
    {
      label: "Kompetisi & Riset",
      value: "PKM & Gemastik",
      icon: Award,
      color: "from-yellow-600 to-yellow-400",
      desc: "Mental Care, Skripsi & Anemia BI",
    },
  ]

  const expertises = [
    {
      icon: Database,
      title: "SQL & Database Modeling",
      description:
        "Menulis query analitik, merancang skema relasional & Star Schema, serta menyusun pipeline data ke Google BigQuery.",
      skills: ["PostgreSQL", "SQLite", "Google BigQuery", "DBeaver", "Star Schema", "ERD"],
      level: 90,
      focusArea: "Data & BI",
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: BarChart3,
      title: "Business Intelligence & Dashboarding",
      description:
        "Merancang dasbor operasional dan metrik kinerja yang jelas menggunakan Metabase, Power BI, Looker Studio, dan Tableau.",
      skills: ["Metabase", "Power BI", "Looker Studio", "Tableau", "KPI Tracking", "Operational Metrics"],
      level: 92,
      focusArea: "Reporting",
      color: "from-emerald-600 to-teal-600",
    },
    {
      icon: LineChart,
      title: "Python & Statistical Analysis",
      description:
        "Mengolah, memvalidasi, dan memodelkan data menggunakan Python serta R untuk kebutuhan analitik dan statistik.",
      skills: ["Python", "Pandas", "NumPy", "SciPy", "Streamlit", "R & Spline Regression"],
      level: 88,
      focusArea: "Analytics",
      color: "from-violet-600 to-indigo-600",
    },
    {
      icon: Table2,
      title: "Microsoft Excel & Data Prep",
      description:
        "Pembersihan data, rekapitulasi, dan analisis terstruktur menggunakan Microsoft Excel untuk kebutuhan operasional.",
      skills: ["Microsoft Excel", "Data Cleaning", "Pivot & Lookup", "Sales & Stock Sheets"],
      level: 90,
      focusArea: "Spreadsheets",
      color: "from-amber-600 to-orange-600",
    },
    {
      icon: Layers,
      title: "Operational & POS Coordination",
      description:
        "Menghubungkan data transaksi, stok harian, jadwal operasional tim, dan pengeluaran bahan baku dengan eksekusi lapangan.",
      skills: ["Inventory Control", "Staff Scheduling", "Cost & Vendor Tracking", "Daily Operations"],
      level: 88,
      focusArea: "Operations",
      color: "from-indigo-600 to-blue-600",
    },
    {
      icon: FolderKanban,
      title: "Research & Team Execution",
      description:
        "Kolaborasi tim lintas fungsi, visualisasi data publik, dan penyusunan riset analitik berbasis data.",
      skills: ["PKM Team Leader", "Gemastik Visualization", "Data Storytelling", "Documentation"],
      level: 86,
      focusArea: "Execution",
      color: "from-teal-600 to-emerald-600",
    },
  ]

  const skillGroups: Record<string, SkillItem[]> = {
    "SQL & Databases": [
      { name: "SQLite", detail: "Local & Star Schema", badgeColor: "#0F80CC" },
      { name: "Google BigQuery", detail: "Cloud Data Pipeline", badgeColor: "#4285F4" },
      { name: "DBeaver", detail: "DB & ERD Client", badgeColor: "#382923" },
    ],
    "Business Intelligence": [
      { name: "Metabase", detail: "Starlite Wi-Fi Dashboard", badgeColor: "#509EE3" },
      { name: "Power BI", detail: "Interactive BI Reports", badgeColor: "#F2C811" },
      { name: "Looker Studio & Tableau", detail: "Cost & Geo Dashboards", badgeColor: "#E97627" },
      { name: "Microsoft Excel", detail: "Data Processing & Ops", badgeColor: "#217346" },
    ],
    Python: [
      { name: "Python", detail: "Pandas, NumPy, SciPy", badgeColor: "#3776AB" },
      { name: "Streamlit & Scrapy", detail: "Apps & Data Scraping", badgeColor: "#FF4B4B" },
      { name: "Data Validation", detail: "Cleaning & Quality Check", badgeColor: "#10B981" },
    ],
    "Domain & Workflow": [
      { name: "WEAVE (Starlite Wi-Fi)", detail: "Data Analyst Intern", badgeColor: "#6366F1" },
      { name: "Uih Ka Imah", detail: "Ops, Stok, Jadwal & Biaya", badgeColor: "#F97316" },
      { name: "PKM Mental Care", detail: "Team Leader", badgeColor: "#EC4899" },
      { name: "Gemastik Anemia", detail: "Data Visualization", badgeColor: "#14B8A6" },
    ],
  }

  const timeline = [
    {
      category: "Work Experience",
      year: "2025 – 2026",
      title: "Koordinator Operasional & Data — Warung Uih Ka Imah",
      desc: "Mengelola operasional harian, penjadwalan shift tim, rekonsiliasi stok, pembelian bahan baku, serta pelaporan pengeluaran dan efisiensi biaya di Looker Studio.",
      icon: Layers,
      achievements: ["2+ Tahun Operasional", "Cost & Vendor Tracking", "Staff & Stock Ops"],
    },
    {
      category: "Internship",
      year: "2025",
      title: "Data Analyst Intern — PT Integrasi Jaringan Ekosistem (WEAVE)",
      desc: "Merancang dan mengembangkan dasbor interaktif di Metabase untuk memantau registrasi pelanggan, permintaan coverage, performa sales, dan pendapatan layanan Starlite Wi-Fi.",
      icon: Briefcase,
      achievements: ["Metabase Dashboard", "Starlite Wi-Fi", "Operational & Revenue Metrics"],
    },
    {
      category: "Academic / PKM Project",
      year: "Nov 2024",
      title: "Program Kreativitas Mahasiswa (PKM) — Mental Care",
      desc: "Memimpin tim lintas fungsi sebagai Team Leader di Universitas Mercu Buana dalam merancang alur dan prototipe aplikasi mobile layanan konseling kesehatan mental.",
      icon: FolderKanban,
      achievements: ["Academic / PKM Project", "Team Leader", "Mental Care Prototype"],
    },
    {
      category: "Academic / PKM Project",
      year: "Apr 2023",
      title: "Gemastik — Anemia Data Visualization Dashboard",
      desc: "Berperan sebagai anggota tim dalam mengolah dataset kesehatan regional dan membangun dasbor visualisasi data untuk memetakan tren anemia di Indonesia.",
      icon: BarChart3,
      achievements: ["Academic / PKM Project", "Health Dataset", "Interactive Dashboard"],
    },
  ]

  const corePillars = [
    {
      tag: "Pendidikan",
      title: "S1 Sistem Informasi — Fokus Business Intelligence",
      detail: "Universitas Mercu Buana • Lulus 2026",
    },
    {
      tag: "Sertifikasi",
      title: "BNSP Certified — Kompetensi Data & Sistem Informasi",
      detail: "Sertifikasi kompetensi nasional terverifikasi",
    },
    {
      tag: "Pengalaman",
      title: "2+ Tahun Operasional & Data",
      detail: "Koordinator Operasional & Data (Warung Uih Ka Imah)",
    },
    {
      tag: "Keahlian Teknis",
      title: "End-to-End BI Stack",
      detail: "SQL, Python, Metabase, Power BI, Looker Studio",
    },
  ]

  const favoriteStack = [
    { name: "SQL", sub: "BigQuery & SQLite" },
    { name: "Python", sub: "Pandas, NumPy & SciPy" },
    { name: "Metabase", sub: "Operational BI" },
    { name: "Power BI & Looker", sub: "Interactive Dashboards" },
    { name: "Excel", sub: "Data & Ops Reporting" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero / Profile Section */}
        <section className="py-20 md:py-28 border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-25" />
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/25 rounded-full blur-3xl opacity-20" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-gradient-to-br from-primary via-accent to-emerald-500 p-1 shadow-2xl">
                    <div className="w-full h-full rounded-3xl bg-card overflow-hidden flex items-center justify-center">
                      <img
                        src="/images/profile.jpg"
                        alt="Rakhan Fahrezi Aritonang"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-3 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2.5 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                      <span className="text-sm font-bold">Data &amp; BI Analyst</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
                  <span className="text-sm font-semibold text-primary">
                    Rakhan Fahrezi Aritonang • Universitas Mercu Buana
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                  <span className="text-foreground">Data Analyst &amp; </span>
                  <span className="gradient-text">Business Intelligence</span>
                  <span className="text-foreground text-xl sm:text-2xl mt-2.5 block font-semibold">
                    S1 Sistem Informasi • Jakarta Barat
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
                  Lulusan S1 Sistem Informasi peminatan Business Intelligence Universitas Mercu Buana
                  (2026) dengan sertifikasi BNSP. Memiliki pengalaman magang Data Analyst di PT
                  Integrasi Jaringan Ekosistem (WEAVE) menggunakan Metabase serta pengelolaan
                  operasional, stok, dan biaya di Warung Uih Ka Imah, didukung keahlian SQL,
                  Python, Excel, Power BI, Looker Studio, dan Tableau.
                </p>
              </div>
            </div>

            {/* 4 Kotak Metrik / Highlight — Lebar Penuh & Font Tegas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {corePillars.map((pillar, i) => (
                <div
                  key={i}
                  className="h-full flex flex-col justify-between p-6 rounded-2xl bg-card border border-border shadow-sm hover:border-primary/50 transition-colors"
                >
                  <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                      {pillar.tag}
                    </span>
                    <div className="text-base sm:text-lg font-bold text-foreground leading-snug">
                      {pillar.title}
                    </div>
                  </div>
                  <div className="text-sm text-foreground/80 mt-3 leading-relaxed">
                    {pillar.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Summary Stats */}
        <section className="py-16 border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div
                    key={i}
                    className="h-full p-5 rounded-2xl border border-border bg-card shadow-xs hover:border-primary/50 transition-all text-center flex flex-col items-center justify-between"
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-md mb-3`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold gradient-text mb-1">
                        {stat.value}
                      </div>
                      <p className="text-sm font-bold text-foreground mb-1">{stat.label}</p>
                      <p className="text-xs text-foreground/80 leading-snug">{stat.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Technical Expertise */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-14 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Core <span className="gradient-text">Competencies</span>
              </h2>
              <p className="text-base sm:text-lg text-foreground/80 max-w-3xl mx-auto">
                Kemampuan analitik, pemodelan data, pelaporan BI, dan pengelolaan operasional berbasis data
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertises.map((exp, i) => {
                const Icon = exp.icon
                return (
                  <div
                    key={i}
                    className="h-full flex flex-col justify-between p-7 rounded-3xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-5">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${exp.color} shadow-md`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-semibold text-foreground/80">
                              {exp.level}% Readiness
                            </span>
                            <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                              {exp.focusArea}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-foreground/80 mb-5 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    <div>
                      <div className="w-full bg-muted rounded-full h-2 mb-5">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${exp.color}`}
                          style={{ width: `${exp.level}%` }}
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold border border-primary/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Technology & Analytics Stack */}
        <section className="py-20 border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-14 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Tools &amp; <span className="gradient-text">Tech Stack</span>
              </h2>
              <p className="text-base sm:text-lg text-foreground/80">
                Perangkat analisis data, business intelligence, database, dan koordinasi operasional
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(skillGroups).map(([category, items]) => (
                <div
                  key={category}
                  className="p-6 rounded-2xl border border-border bg-card shadow-xs hover:border-primary/50 transition-all"
                >
                  <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-primary rounded-full" />
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-background border border-border"
                      >
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                          <Cpu className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-foreground truncate">{item.name}</div>
                          <div className="text-xs text-foreground/75 truncate">{item.detail}</div>
                        </div>
                        <span
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: item.badgeColor }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 p-8 rounded-3xl border border-border bg-card shadow-sm">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Primary Analytics Stack
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {favoriteStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex flex-col items-center gap-1.5 px-6 py-4 rounded-2xl bg-background border border-border min-w-[155px]"
                  >
                    <span className="text-base font-bold gradient-text">{tech.name}</span>
                    <span className="text-xs font-medium text-foreground/80 text-center">
                      {tech.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Project Timeline — Layout Konsisten & Seragam */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="mb-14 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Experience &amp; <span className="gradient-text">Milestones</span>
              </h2>
              <p className="text-base sm:text-lg text-foreground/80">
                Struktur terpisah antara pengalaman kerja, magang industri, dan proyek akademik / PKM
              </p>
            </div>

            <div className="space-y-6">
              {timeline.map((item, i) => {
                const Icon = item.icon
                const isAcademic = item.category === "Academic / PKM Project"

                return (
                  <div
                    key={i}
                    className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground shadow-md flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0 space-y-3">
                        {/* Baris Badge Peran & Periode yang Konsisten */}
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span
                            className={
                              isAcademic
                                ? "px-3 py-1 rounded-full text-xs font-bold bg-muted text-foreground border border-border"
                                : "px-3 py-1 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/30"
                            }
                          >
                            {item.category}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-background text-foreground border border-border">
                            {item.year}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
                          {item.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-1">
                          {item.achievements.map((achievement, achievementIndex) => (
                            <span
                              key={achievementIndex}
                              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold border border-primary/20"
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
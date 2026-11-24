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
        "Menulis query analitik, merancang skema relasional & Star Schema, serta menyusun pipeline data ke Google BigQuery",
      skills: ["PostgreSQL", "SQLite", "Google BigQuery", "DBeaver", "Star Schema", "ERD"],
      level: 90,
      focusArea: "Data & BI",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Business Intelligence & Dashboarding",
      description:
        "Merancang dasbor operasional dan metrik kinerja yang jelas menggunakan Metabase, Power BI, Looker Studio, dan Tableau",
      skills: ["Metabase", "Power BI", "Looker Studio", "Tableau", "KPI Tracking", "Operational Metrics"],
      level: 92,
      focusArea: "Reporting",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: LineChart,
      title: "Python & Statistical Analysis",
      description:
        "Mengolah, memvalidasi, dan memodelkan data menggunakan Python serta R untuk kebutuhan analitik dan statistik",
      skills: ["Python", "Pandas", "NumPy", "SciPy", "Streamlit", "R & Spline Regression"],
      level: 88,
      focusArea: "Analytics",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Table2,
      title: "Microsoft Excel & Data Prep",
      description:
        "Pembersihan data, rekapitulasi, dan analisis terstruktur menggunakan Microsoft Excel untuk kebutuhan operasional",
      skills: ["Microsoft Excel", "Data Cleaning", "Pivot & Lookup", "Sales & Stock Sheets"],
      level: 90,
      focusArea: "Spreadsheets",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Layers,
      title: "Operational & POS Coordination",
      description:
        "Menghubungkan data transaksi, stok harian, jadwal operasional tim, dan pengeluaran bahan baku dengan eksekusi lapangan",
      skills: ["Inventory Control", "Staff Scheduling", "Cost & Vendor Tracking", "Daily Operations"],
      level: 88,
      focusArea: "Operations",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: FolderKanban,
      title: "Research & Team Execution",
      description:
        "Kolaborasi tim lintas fungsi, visualisasi data publik, dan penyusunan riset analitik berbasis data",
      skills: ["PKM Team Leader", "Gemastik Visualization", "Data Storytelling", "Documentation"],
      level: 86,
      focusArea: "Execution",
      color: "from-teal-500 to-green-500",
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
      year: "2024 – 2026",
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
      title: "S1 Sistem Informasi — Fokus Business Intelligence",
      detail: "Universitas Mercu Buana • Lulus 2026",
    },
    {
      title: "BNSP Certified — Bussiness Intelligence",
      detail: "Sertifikasi kompetensi terverifikasi",
    },
    {
      title: "1+ Tahun Operasional & Data",
      detail: "Koordinator Operasional & Data (Warung Uih Ka Imah)",
    },
    {
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
        <section className="py-24 md:py-32 border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/40 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl opacity-25 animate-pulse delay-1000" />
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-500/20 rounded-full blur-3xl opacity-20 animate-pulse delay-500" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center lg:justify-start animate-fade-in">
                <div className="relative">
                  <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-3xl bg-gradient-to-br from-primary via-accent to-green-500 p-1 shadow-2xl">
                    <div className="w-full h-full rounded-3xl bg-card overflow-hidden relative flex items-center justify-center">
                      <img
                        src="/images/profile.jpg"
                        alt="Rakhan Fahrezi Aritonang"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-primary to-accent text-white px-5 py-3 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-300" />
                      <span className="text-sm font-bold">Data &amp; BI Analyst</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 animate-fade-in">
                <div className="inline-flex px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
                  <span className="text-sm font-semibold text-primary">
                    Rakhan Fahrezi Aritonang • Universitas Mercu Buana
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                  <span className="text-foreground">Data Analyst &amp;</span>
                  <span className="gradient-text block">Business Intelligence</span>
                  <span className="text-foreground text-xl sm:text-2xl mt-3 block font-semibold">
                    S1 Sistem Informasi • Jakarta Barat
                  </span>
                </h1>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Lulusan S1 Sistem Informasi peminatan Business Intelligence Universitas Mercu Buana
                  (2026) dengan sertifikasi BNSP. Memiliki pengalaman magang Data Analyst di PT
                  Integrasi Jaringan Ekosistem (WEAVE) menggunakan Metabase serta pengelolaan
                  operasional, stok, dan biaya di Warung Uih Ka Imah, didukung keahlian SQL,
                  Python, Excel, Power BI, Looker Studio, dan Tableau.
                </p>

                {/* 4 Kotak Highlight Utama */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {corePillars.map((pillar, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors"
                    >
                      <div className="text-sm sm:text-base font-bold text-foreground leading-snug">
                        {pillar.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1.5">{pillar.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary Stats */}
        <section className="py-20 border-b border-border bg-gradient-to-b from-background to-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div
                    key={i}
                    className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all text-center group"
                  >
                    <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-xl font-bold gradient-text mb-2">{stat.value}</div>
                    <p className="text-sm font-semibold text-foreground mb-1">{stat.label}</p>
                    <p className="text-xs text-muted-foreground">{stat.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Technical Expertise */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Core <span className="gradient-text">Competencies</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Kemampuan analitik, pemodelan data, pelaporan BI, dan pengelolaan operasional berbasis data
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {expertises.map((exp, i) => {
                const Icon = exp.icon
                return (
                  <div
                    key={i}
                    className="p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${exp.color} shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="text-sm text-muted-foreground">{exp.level}% Readiness</div>
                          <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                            {exp.focusArea}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{exp.description}</p>

                    <div className="w-full bg-border/50 rounded-full h-2 mb-6">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${exp.color}`}
                        style={{ width: `${exp.level}%` }}
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Technology & Analytics Stack */}
        <section className="py-20 border-b border-border bg-gradient-to-b from-card/30 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Tools &amp; <span className="gradient-text">Tech Stack</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Perangkat analisis data, business intelligence, database, dan koordinasi operasional
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(skillGroups).map(([category, items]) => (
                <div
                  key={category}
                  className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all group"
                >
                  <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {category}
                  </h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center gap-3 p-4 rounded-xl bg-background/70 border border-border/60 hover:border-primary/30 transition-all"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                          <Cpu className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-foreground truncate">{item.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{item.detail}</div>
                        </div>
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: item.badgeColor }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 rounded-3xl border border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Primary Analytics Stack</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {favoriteStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl bg-card border border-border shadow-sm min-w-[140px]"
                  >
                    <span className="text-base font-bold gradient-text">{tech.name}</span>
                    <span className="text-xs text-muted-foreground text-center">{tech.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Project Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Experience &amp; <span className="gradient-text">Milestones</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Pemisahan jelas antara pengalaman kerja, magang industri, serta proyek akademik / PKM
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-green-500 rounded-full transform -translate-x-1/2 z-0 hidden md:block" />

              <div className="space-y-8 relative z-10">
                {timeline.map((item, i) => {
                  const Icon = item.icon
                  const isEven = i % 2 === 0
                  const isAcademic = item.category === "Academic / PKM Project"

                  return (
                    <div
                      key={i}
                      className={`flex flex-col md:flex-row gap-8 ${isEven ? "md:flex-row-reverse" : ""}`}
                    >
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-xl z-10">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-base font-bold text-primary mt-3">{item.year}</div>
                      </div>

                      <div className="flex-1">
                        <div className="p-8 rounded-3xl border border-border bg-card hover:border-primary/40 transition-all group">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span
                              className={
                                isAcademic
                                  ? "px-3 py-1 rounded-full text-xs font-semibold bg-muted text-foreground border border-border"
                                  : "px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/30"
                              }
                            >
                              {item.category}
                            </span>
                            <span className="text-xs text-muted-foreground">{item.year}</span>
                          </div>

                          <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                            {item.desc}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {item.achievements.map((achievement, achievementIndex) => (
                              <span
                                key={achievementIndex}
                                className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
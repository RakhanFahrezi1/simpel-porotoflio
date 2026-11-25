"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProjectCard, { type ProjectItem } from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Database,
  Lightbulb,
  LineChart,
  Target,
  X,
} from "lucide-react"

const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: "Project Magang — Starlite Wi-Fi Monitoring Dashboard",
    category: "BI & Dashboard",
    role: "Data Analyst Intern • PT Integrasi Jaringan Ekosistem (WEAVE)",
    period: "2025 • Metabase",
    image: "/images/projects/project-1-magang-starlite.png",
    shortDescription:
      "Mempercepat pemantauan pertumbuhan pelanggan, permintaan coverage, kinerja mitra sales, dan pendapatan layanan Wi-Fi Starlite di Metabase.",
    description:
      "Merancang dan mengembangkan dashboard interaktif berbasis Metabase selama magang di PT Integrasi Jaringan Ekosistem (WEAVE) untuk memantau kinerja layanan Starlite Wi-Fi, konversi registrasi, performa prospek, distribusi wilayah, dan pendapatan secara terpusat.",
    businessContext:
      "Tim operasional dan manajemen membutuhkan pemantauan terpusat atas pertumbuhan pelanggan, permintaan coverage, kinerja mitra sales, dan pendapatan layanan Wi-Fi Starlite tanpa rekap manual.",
    technicalAction:
      "Merancang dan membangun dashboard monitoring interaktif di Metabase berbasis kueri SQL yang terintegrasi dengan data operasional layanan dan registrasi lapangan.",
    businessImpact:
      "Mempercepat evaluasi performa mitra sales per wilayah serta membantu identifikasi area prioritas perluasan jaringan berdasarkan tren permintaan coverage.",
    dataSource:
      "Data registrasi pelanggan, log permintaan coverage wilayah, aktivitas mitra sales, dan rekap transaksi layanan Starlite Wi-Fi.",
    keyKpis: [
      "Pertumbuhan Pelanggan & Laju Registrasi",
      "Rasio Konversi Prospek & Permintaan Coverage",
      "Performa Transaksi & Kontribusi Mitra Sales",
      "Sebaran Pendapatan per Wilayah Layanan",
    ],
    keyInsights: [
      "Permintaan coverage terkonsentrasi pada klaster wilayah tertentu dengan tingkat konversi registrasi yang berbeda antar-area.",
      "Performa mitra sales menunjukkan variasi kecepatan closing prospek dan volume transaksi bulanan.",
      "Tampilan terpusat mempercepat pemantauan kesehatan transaksi dan respons tim operasional.",
    ],
    businessRecommendations: [
      "Prioritaskan perluasan jaringan pada wilayah dengan permintaan coverage tinggi dan kelayakan infrastruktur terbaik.",
      "Gunakan metrik konversi dan performa wilayah sebagai dasar evaluasi insentif serta pembinaan mitra sales.",
      "Pantau rasio registrasi terhadap permintaan coverage secara berkala untuk mendeteksi hambatan layanan lebih awal.",
    ],
    highlights: [
      "Dampak Bisnis: Mempercepat evaluasi performa mitra sales per wilayah dan identifikasi area prioritas perluasan jaringan.",
      "Aksi Teknis: Dashboard Metabase berbasis SQL untuk memantau pertumbuhan pelanggan, coverage, sales, dan pendapatan.",
    ],
    technologies: ["Metabase", "SQL", "Business Intelligence", "KPI Dashboard"],
    featured: true,
  },
  {
    id: 3,
    title: "Analisis Profit & Segmentasi Pelanggan RFM Menggunakan SQL dan Python",
    category: "Analytics & Research",
    role: "Data Analyst • SQL & Python Case Study",
    period: "2026 • BigQuery SQL & Pandas",
    image: "/images/projects/project-8-sql-python.jpg",
    shortDescription:
      "Mengelompokkan pelanggan ritel ke 5 segmen RFM dan menganalisis profitabilitas produk menggunakan SQL (BigQuery) serta Python (Pandas) untuk efisiensi retensi.",
    description:
      "Mengolah data transaksi ritel menggunakan SQL dan Python (Pandas) untuk membersihkan anomali data, menghitung margin bersih, serta mengelompokkan pelanggan ke segmen RFM beserta rekomendasi aksi retensi.",
    businessContext:
      "Strategi promosi yang seragam pada seluruh pelanggan membuat biaya pemasaran kurang efisien dan menyulitkan deteksi produk dengan margin rendah.",
    technicalAction:
      "Melakukan data cleaning, agregasi transaksi menggunakan SQL (BigQuery), serta pemodelan segmentasi RFM dan analisis profitabilitas menggunakan Python (Pandas).",
    businessImpact:
      "Mengelompokkan pelanggan ke dalam segmen prioritas (Champions, Loyal Customers, Potential Loyalist, At Risk, Hibernating) dan memetakan sub-kategori produk dengan rasio profit tertinggi untuk rekomendasi kampanye retensi.",
    dataSource:
      "Data transaksi ritel (ID transaksi, ID pelanggan, tanggal order, kategori produk, kuantitas, harga jual, dan biaya pokok/COGS).",
    keyKpis: [
      "Recency (Hari Sejak Transaksi Terakhir)",
      "Frequency (Jumlah Transaksi Pelanggan)",
      "Monetary (Total Nilai Belanja & Net Profit)",
      "Distribusi Pelanggan & Revenue per Segmen RFM",
    ],
    keyInsights: [
      "Pembersihan duplikasi, nilai kosong, dan margin negatif menjaga akurasi perhitungan profitabilitas transaksi.",
      "Segmen Champions dan Loyal Customers menyumbang porsi nilai transaksi utama, sementara At Risk perlu pendekatan win-back.",
      "Analisis profit per kategori membantu membedakan produk ber-omzet tinggi dengan produk ber-margin bersih optimal.",
    ],
    businessRecommendations: [
      "Pertahankan loyalitas segmen Champions lewat benefit eksklusif tanpa menggerus margin dengan diskon berlebih.",
      "Jalankan promo win-back yang relevan dengan riwayat belanja terakhir untuk segmen At Risk.",
      "Fokuskan dorongan repeat order pada Potential Loyalist dan prioritaskan item dengan rasio margin sehat.",
    ],
    highlights: [
      "Dampak Bisnis: Memetakan segmen prioritas (Champions, At Risk, Hibernating) dan profitabilitas produk untuk strategi retensi.",
      "Aksi Teknis: Data cleaning, CTE & Window Function SQL (BigQuery), serta RFM scoring & analisis profit di Python (Pandas).",
    ],
    technologies: ["SQL", "BigQuery", "Python", "Pandas", "RFM Analysis"],
    featured: true,
    href: "/projects/sql-python-case",
  },
  {
    id: 10,
    title: "Asisten Analitik Data, SQL & Insight BI Berbasis AI",
    category: "Analytics & Research",
    role: "Data & BI Analyst • AI Analytics Project",
    period: "2026 • Next.js & Gemini API",
    image: "/images/projects/ai.png",
    shortDescription:
      "Menggabungkan profiling kualitas data & statistik deterministik dengan Gemini API untuk menghasilkan draf SQL query, ringkasan temuan, dan rekomendasi bisnis.",
    description:
      "Membangun asisten analitik data interaktif di Next.js yang memproses dataset CSV melalui engine profiling kualitas data & statistik terlebih dahulu sebelum mengirim ringkasannya ke Gemini API untuk menyusun kueri SQL referensi, temuan utama, catatan kualitas data, dan rekomendasi tindakan bisnis.",
    businessContext:
      "Eksplorasi dataset baru dan penyusunan ringkasan analitik sering memakan waktu, sementara penggunaan AI langsung pada data mentah berisiko memunculkan angka yang tidak tervalidasi.",
    technicalAction:
      "Membangun alur profiling CSV (tipe kolom, missing values, min/max/rata-rata, nilai dominan) di TypeScript dan endpoint /api/analyze-insight berbasis Gemini API dengan validasi konteks statistik.",
    businessImpact:
      "Mempercepat eksplorasi dataset CSV dan penyusunan draf kueri SQL serta rekomendasi bisnis sambil menjaga transparansi kualitas data.",
    dataSource:
      "Dataset sampel E-Commerce Indonesia Sales dan Digital Marketing Campaign ID, serta file CSV yang diunggah pengguna.",
    keyKpis: [
      "Jumlah Baris & Kolom Terdeteksi",
      "Tingkat Missing Values per Kolom",
      "Draf SQL Query Referensi Terstruktur",
      "Key Insights & Rekomendasi Bisnis Berbasis Data",
    ],
    keyInsights: [
      "Memisahkan perhitungan statistik dasar dari narasi AI membantu menjaga akurasi angka dan menekan pemakaian token.",
      "Pemeriksaan missing values dan tipe kolom di awal membantu mendeteksi kesiapan data sebelum analisis lanjutan.",
      "Penyajian kueri SQL berdampingan dengan insight memudahkan verifikasi logika analisis.",
    ],
    businessRecommendations: [
      "Selalu periksa kolom dengan missing values atau distribusi tidak seimbang sebelum mengambil keputusan bisnis.",
      "Gunakan kueri SQL yang dihasilkan sebagai titik awal pengujian lanjutan di database atau BI tool.",
      "Uji beberapa pertanyaan analitik spesifik agar rekomendasi yang dihasilkan lebih tajam.",
    ],
    highlights: [
      "Dampak Bisnis: Mempercepat eksplorasi dataset CSV dan draf SQL query dengan rujukan statistik yang lebih terukur.",
      "Aksi Teknis: Data profiling otomatis + route handler /api/analyze-insight (Gemini API) + halaman interaktif Next.js.",
    ],
    technologies: ["Next.js", "TypeScript", "Gemini API", "SQL", "Data Profiling"],
    featured: true,
    href: "/projects/ai-insight-assistant",
  },
  {
    id: 4,
    title: "Dashboard Eksplorasi BI Interaktif: E-Commerce & Digital Marketing",
    category: "BI & Dashboard",
    role: "Data & BI Analyst • Portfolio Project",
    period: "2026 • Next.js & Recharts",
    image: "/images/projects/bi-foto.jpg",
    shortDescription:
      "Mempercepat eksplorasi KPI penjualan e-commerce dan efisiensi ROAS kampanye digital dalam Rupiah melalui dashboard web interaktif dan upload CSV.",
    description:
      "Membangun halaman BI Playground interaktif di Next.js untuk mendemonstrasikan analisis KPI penjualan e-commerce dan efisiensi kampanye digital (ROAS) dalam Rupiah secara langsung, lengkap dengan filter dinamis dan unggah CSV mandiri.",
    businessContext:
      "Tim bisnis dan pemasaran memerlukan cara cepat untuk mengevaluasi kinerja channel, memantau ROAS dalam Rupiah, serta menguji dataset CSV baru secara interaktif.",
    technicalAction:
      "Membangun halaman BI Playground berbasis Next.js, TypeScript, PapaParse, dan Recharts dengan filter channel/platform, kartu KPI otomatis, serta fitur unggah file CSV mandiri.",
    businessImpact:
      "Mempercepat identifikasi channel dan kampanye dengan efisiensi ROAS terbaik sekaligus memudahkan eksplorasi data CSV baru secara langsung.",
    dataSource:
      "Dataset sampel E-Commerce Indonesia dan Digital Marketing & ROAS (Rupiah), serta file CSV yang diunggah pengguna.",
    keyKpis: [
      "Gross / Net Revenue (IDR)",
      "Ad Spend & Return on Ad Spend (ROAS)",
      "Order / Conversion Volume per Channel",
      "Tren Harian & Perbandingan Antar-Platform",
    ],
    keyInsights: [
      "Efisiensi ROAS bervariasi antar-channel dan kampanye sehingga alokasi anggaran perlu berbasis return aktual.",
      "Filter channel membantu memisahkan kanal dengan volume transaksi besar dari kanal dengan efisiensi biaya iklan lebih tinggi.",
      "Fitur unggah CSV memungkinkan alur visualisasi diterapkan langsung pada data penjualan atau kampanye lain.",
    ],
    businessRecommendations: [
      "Tingkatkan alokasi anggaran secara bertahap pada channel dan kampanye dengan ROAS konsisten di atas target.",
      "Evaluasi biaya akuisisi berdampingan dengan margin produk agar pertumbuhan omzet tetap sehat.",
      "Gunakan filter periode sebelum mengambil keputusan anggaran agar efek musiman tidak bias.",
    ],
    highlights: [
      "Dampak Bisnis: Mempercepat evaluasi channel & ROAS dalam Rupiah serta memungkinkan uji data CSV mandiri secara langsung.",
      "Aksi Teknis: Dashboard interaktif Next.js + Recharts + PapaParse dengan filter dinamis dan insight otomatis.",
    ],
    technologies: ["Next.js", "TypeScript", "PapaParse", "Recharts", "Tailwind CSS"],
    featured: true,
    href: "/projects/bi-playground",
  },
  {
    id: 5,
    title: "Prediksi Demand, Margin & Stok Barang",
    category: "Operations & Data",
    role: "Business & Data Analyst • Decision Simulator",
    period: "2026 • Next.js & Recharts",
    image: "/images/projects/simulasi.png",
    shortDescription:
      "Menguji dampak kenaikan harga bahan baku, diskon promo, dan lonjakan akhir pekan terhadap net margin serta Reorder Point (ROP) stok 14 hari ke depan.",
    description:
      "Membangun simulator analitik bisnis interaktif untuk memproyeksikan permintaan 14 hari ke depan, menguji dampak perubahan harga bahan baku dan diskon promo terhadap net profit, serta menghitung rekomendasi pemesanan ulang stok berbasis safety stock dan lead time.",
    businessContext:
      "Perubahan harga bahan baku, diskon promo, dan lonjakan akhir pekan dapat memengaruhi margin bersih serta kebutuhan stok secara bersamaan.",
    technicalAction:
      "Membangun simulator berbasis Next.js dan Recharts yang menggabungkan proyeksi permintaan 14 hari, sensitivitas net margin, serta perhitungan safety stock dan Reorder Point (ROP) per bahan baku.",
    businessImpact:
      "Membantu mengantisipasi penurunan net margin akibat diskon atau kenaikan harga bahan baku sekaligus mencegah kehabisan stok pada item kritis.",
    dataSource:
      "Data historis permintaan harian 14 hari, lead time pemasok, stok tersedia, serta asumsi harga jual, diskon, dan biaya bahan baku.",
    keyKpis: [
      "Proyeksi Permintaan & Omzet 14 Hari",
      "Estimasi Net Profit & Net Margin (%)",
      "Reorder Point (ROP) & Safety Stock per Item",
      "Jumlah Bahan Baku Kritis & Estimasi Biaya Restock",
    ],
    keyInsights: [
      "Diskon promo dapat mendorong volume penjualan, tetapi berpotensi menekan net profit bila tidak diimbangi struktur biaya.",
      "Kenaikan harga bahan baku memengaruhi batas margin sehingga simulasi skenario penting dilakukan sebelum promosi.",
      "Item dengan lead time lebih panjang membutuhkan safety stock yang lebih besar saat permintaan akhir pekan naik.",
    ],
    businessRecommendations: [
      "Uji batas minimum net margin sebelum menjalankan program diskon agar volume tambahan tetap menguntungkan.",
      "Lakukan pemesanan ulang lebih awal saat stok mendekati Reorder Point pada bahan baku dengan lead time panjang.",
      "Siapkan stok tambahan menjelang akhir pekan atau periode puncak permintaan.",
    ],
    highlights: [
      "Dampak Bisnis: Mengukur sensitivitas net margin terhadap diskon & kenaikan harga bahan baku serta mencegah stockout lewat ROP.",
      "Aksi Teknis: Simulator What-If interaktif dengan grafik proyeksi 14 hari dan kalkulasi Reorder Point otomatis.",
    ],
    technologies: ["Next.js", "TypeScript", "Recharts", "Demand Forecasting", "Inventory ROP"],
    featured: true,
    href: "/projects/demand-forecast",
  },
  {
    id: 2,
    title: "Dashboard Pengeluaran & Pembelian Bahan Baku — Warung Uih Ka Imah",
    category: "Operations & Data",
    role: "Koordinator Operasional & Data • Warung Uih Ka Imah",
    period: "2024–2026 • Looker Studio",
    image: "/images/projects/project-2-uih-ka-imah.jpg",
    shortDescription:
      "Menekan risiko pembengkakan HPP dan ketidaksesuaian stok melalui pelacakan pengeluaran cabang, kategori beban, dan harga vendor di Looker Studio.",
    description:
      "Membangun dashboard pelaporan di Looker Studio untuk mengendalikan pengeluaran operasional per cabang, memetakan proporsi kategori beban, serta mengevaluasi fluktuasi harga dan pembelian bahan baku berdasarkan vendor dan metode bayar di Warung Uih Ka Imah.",
    businessContext:
      "Fluktuasi harga bahan baku dan pencatatan belanja harian berisiko memicu pembengkakan HPP (Cost of Goods Sold) serta ketidaksesuaian stok operasional.",
    technicalAction:
      "Membangun dashboard analitik pengeluaran operasional dan pembelian vendor di Looker Studio untuk melacak tren belanja harian, proporsi kategori bahan baku, dan pergerakan harga pemasok.",
    businessImpact:
      "Memudahkan deteksi pos pengeluaran tertinggi, mendukung negosiasi vendor, serta menjaga efisiensi biaya operasional harian.",
    dataSource:
      "Catatan pembelian bahan baku harian, data vendor/pemasok, kategori pengeluaran cabang, dan metode pembayaran.",
    keyKpis: [
      "Total Pengeluaran Operasional & Pembelian Bahan Baku",
      "Proporsi Biaya per Kategori & Cabang",
      "Perbandingan Biaya & Frekuensi Belanja per Vendor",
      "Tren Fluktuasi Harga Satuan Bahan Baku",
    ],
    keyInsights: [
      "Pengeluaran harian didominasi oleh kategori bahan baku utama yang sensitif terhadap perubahan harga pasar.",
      "Perbandingan antar-vendor dan periode membantu mengidentifikasi selisih harga satuan untuk peluang efisiensi.",
      "Pemantauan rutin mempermudah deteksi lonjakan beban operasional sebelum memengaruhi margin bulanan.",
    ],
    businessRecommendations: [
      "Evaluasi harga dan konsistensi suplai vendor utama secara berkala untuk memperkuat negosiasi harga.",
      "Terapkan batas pemantauan khusus pada kategori bahan baku dengan porsi terbesar terhadap HPP.",
      "Sesuaikan jadwal pembelian bahan baku dengan proyeksi permintaan harian dan hasil stok opname.",
    ],
    highlights: [
      "Dampak Bisnis: Memudahkan deteksi pos pengeluaran tertinggi, mendukung negosiasi vendor, dan menjaga efisiensi biaya harian.",
      "Aksi Teknis: Dashboard Looker Studio untuk melacak tren belanja, kategori bahan baku, dan pergerakan harga pemasok.",
    ],
    technologies: ["Looker Studio", "Operational Data", "Cost & Vendor Tracking", "Reporting"],
    featured: true,
  },
  {
    id: 6,
    title: "Dashboard Penjualan Multi-Channel & Promosi (2025)",
    category: "BI & Dashboard",
    role: "Business Intelligence / Data Analyst",
    period: "Power BI",
    image: "/images/projects/project-3-sales-channel-promo.png",
    shortDescription:
      "Mengevaluasi selisih Revenue vs Net Revenue, efektivitas diskon, serta kontribusi channel dan wilayah untuk mengoptimalkan anggaran promosi.",
    description:
      "Menganalisis performa penjualan lintas channel (POS Kasir, GrabFood, GoFood, Website, Tokopedia, ShopeeFood) untuk mengukur dampak program promo terhadap margin, metode pembayaran, potensi wilayah provinsi, produk terlaris, dan segmen pelanggan.",
    businessContext:
      "Penjualan lintas channel menyulitkan pemantauan dampak diskon terhadap pendapatan bersih serta identifikasi wilayah dan produk paling potensial.",
    technicalAction:
      "Membangun dashboard Power BI untuk membandingkan Revenue dan Net Revenue, total diskon, kuantitas terjual, frekuensi transaksi, serta performa per channel, provinsi, dan lini produk.",
    businessImpact:
      "Membantu mengarahkan anggaran promosi ke channel, wilayah, dan lini produk dengan kontribusi penjualan tertinggi.",
    dataSource:
      "Data transaksi POS Kasir, GrabFood, GoFood, Website, Tokopedia, dan ShopeeFood beserta diskon, wilayah provinsi, dan produk.",
    keyKpis: [
      "Revenue vs Net Revenue & Total Diskon",
      "Kuantitas Terjual & Frekuensi Transaksi",
      "Kontribusi Pendapatan per Channel Penjualan",
      "Performa Wilayah Provinsi & Produk Terlaris",
    ],
    keyInsights: [
      "Selisih Revenue dan Net Revenue menggambarkan porsi potongan promo serta penyesuaian transaksi lintas channel.",
      "Kontribusi transaksi berbeda antar-channel sehingga strategi promo perlu menyesuaikan karakter tiap kanal.",
      "Pemetaan wilayah dan produk membantu memfokuskan kampanye pada kantong penjualan utama.",
    ],
    businessRecommendations: [
      "Nilai efektivitas promo berdasarkan dampak pada Net Revenue dan repeat order, bukan hanya lonjakan transaksi sementara.",
      "Sesuaikan skema promo dengan biaya kanal pada masing-masing platform penjualan.",
      "Fokuskan promosi pada provinsi dan produk dengan performa tertinggi.",
    ],
    highlights: [
      "Dampak Bisnis: Membantu mengarahkan anggaran promosi ke channel, wilayah, dan produk dengan kontribusi tertinggi.",
      "Aksi Teknis: Dashboard Power BI multi-channel untuk memantau Revenue vs Net Revenue, diskon, wilayah, dan produk.",
    ],
    technologies: ["Power BI", "Sales Analytics", "Promo & Channel Analysis", "Data Visualization"],
    featured: false,
  },
  {
    id: 7,
    title: "Dashboard Supermarket — Profit & Product Line",
    category: "BI & Dashboard",
    role: "Business Intelligence / Data Analyst",
    period: "BI Dashboard",
    image: "/images/projects/project-4-supermarket.png",
    shortDescription:
      "Membandingkan profitabilitas lini produk, tren laba harian, kepuasan pelanggan, dan metode pembayaran untuk prioritas penataan stok ritel.",
    description:
      "Menyusun dashboard performa ritel supermarket untuk mengevaluasi kontribusi profit per product line, pergerakan laba harian, rata-rata rating kepuasan pelanggan, serta preferensi metode pembayaran berdasarkan segmen pembeli.",
    businessContext:
      "Pengelola ritel perlu mengetahui lini produk dengan profit terbaik, tren laba harian, kepuasan pembeli, serta metode pembayaran dominan.",
    technicalAction:
      "Menyusun dashboard ritel yang menampilkan profit per lini produk, tren laba harian, skor rating pelanggan, serta segmentasi metode pembayaran dan profil pembeli.",
    businessImpact:
      "Memudahkan penentuan prioritas stok dan lini produk unggulan berdasarkan margin keuntungan serta kepuasan pelanggan.",
    dataSource:
      "Data transaksi supermarket mencakup lini produk, profit harian, metode pembayaran, profil pembeli, dan rating kepuasan.",
    keyKpis: [
      "Total Profit & Tren Laba Harian",
      "Kontribusi Profit per Product Line",
      "Rata-Rata Rating Kepuasan Pelanggan",
      "Preferensi Metode Pembayaran",
    ],
    keyInsights: [
      "Margin dan kontribusi profit berbeda antar-lini produk sehingga alokasi stok perlu menyesuaikan performa tiap kategori.",
      "Tren laba harian membantu membaca dinamika penjualan harian dan hari puncak transaksi.",
      "Data metode pembayaran dan rating memberi masukan praktis bagi operasional kasir dan kualitas layanan.",
    ],
    businessRecommendations: [
      "Jaga ketersediaan stok pada lini produk dengan profit dan rating pelanggan yang tinggi.",
      "Tinjau produk dengan profit atau rating lebih rendah untuk evaluasi harga, stok, atau kualitas layanan.",
      "Optimalkan metode pembayaran yang paling banyak digunakan pembeli.",
    ],
    highlights: [
      "Dampak Bisnis: Membantu prioritas stok dan penataan lini produk berdasarkan profitabilitas, rating, dan metode pembayaran.",
      "Aksi Teknis: Dashboard ritel untuk melacak laba harian, profit per product line, rating, dan metode pembayaran.",
    ],
    technologies: ["Data Visualization", "Retail Analytics", "KPI Reporting", "Dashboard Design"],
    featured: false,
  },
  {
    id: 8,
    title: "Dashboard Data Covid Regional Indonesia",
    category: "BI & Dashboard",
    role: "Business Intelligence / Data Analyst",
    period: "Tableau Public",
    image: "/images/projects/project-5-covid-tableau.jpg",
    shortDescription:
      "Memetakan sebaran kasus regional, rasio pemulihan, dan tren tahunan antarprovinsi di Indonesia secara interaktif di Tableau Public.",
    description:
      "Mengolah dan memvisualisasikan data epidemiologi regional di Tableau Public guna memantau perbandingan kasus aktif, kasus baru, tingkat kematian, dan tingkat pemulihan antarprovinsi di Indonesia secara geografis maupun historis.",
    businessContext:
      "Rekapitulasi data regional lintas provinsi memerlukan visualisasi peta dan tren waktu agar perbandingan antarwilayah mudah dibaca.",
    technicalAction:
      "Membangun dashboard peta interaktif dan tren tahunan di Tableau Public untuk membandingkan kasus aktif, kematian, dan tingkat pemulihan antarprovinsi.",
    businessImpact:
      "Mempermudah identifikasi wilayah dengan konsentrasi kasus tinggi serta memantau perkembangan rasio pemulihan antarprovinsi.",
    dataSource:
      "Data rekapitulasi epidemiologi regional Indonesia per provinsi dan periode tahunan.",
    keyKpis: [
      "Kasus Terkonfirmasi & Kasus Aktif",
      "Tingkat Pemulihan (Recovery Rate)",
      "Tren Tahunan Kasus & Pemulihan",
      "Sebaran Geografis per Provinsi",
    ],
    keyInsights: [
      "Peta provinsi menunjukkan perbedaan konsentrasi kasus antarwilayah di Indonesia.",
      "Tren tahunan memudahkan pembacaan fase kenaikan maupun penurunan kasus dari waktu ke waktu.",
      "Rasio pemulihan membantu melengkapi pembacaan kondisi wilayah selain jumlah kasus kumulatif.",
    ],
    businessRecommendations: [
      "Gunakan kombinasi indikator kasus aktif dan rasio pemulihan saat membandingkan kondisi antarprovinsi.",
      "Baca tren tahunan bersama konteks periode dan mobilitas wilayah agar interpretasi tetap tepat.",
      "Sajikan rasio berdampingan dengan angka absolut untuk perbandingan lintas daerah.",
    ],
    highlights: [
      "Dampak Bisnis: Mempermudah identifikasi wilayah prioritas dan pemantauan rasio pemulihan lintas provinsi.",
      "Aksi Teknis: Peta interaktif dan grafik tren tahunan di Tableau Public untuk data regional Indonesia.",
    ],
    technologies: ["Tableau", "Geo Mapping", "Data Visualization", "Public Analytics"],
    featured: false,
  },
  {
    id: 9,
    title: "Mental Care — Prototipe Aplikasi Kesehatan Mental (Product & UI/UX Case Study)",
    category: "Product & UI/UX",
    role: "UI/UX & Product Prototype • PKM",
    period: "Mobile UI/UX",
    image: "/images/projects/project-6-mental-care.jpg",
    shortDescription:
      "Studi kasus perancangan alur layanan konseling digital (Product & UI/UX) dari pemilihan topik dan psikolog hingga penjadwalan sesi.",
    description:
      "Merancang prototipe aplikasi mobile Mental Care berbasis kebutuhan pengguna (proyek PKM di luar fokus utama BI) untuk menyederhanakan perjalanan pengguna dalam memilih topik konseling, mencocokkan psikolog, mengatur jadwal sesi, hingga pembayaran.",
    businessContext:
      "Calon pengguna konseling sering menghadapi hambatan awal saat memilih topik atau psikolog serta melakukan reservasi jadwal secara mandiri.",
    technicalAction:
      "Merancang alur pengguna (user flow) dan prototipe mobile Mental Care yang menghubungkan pemilihan topik konseling, rekomendasi psikolog, penjadwalan, dan pembayaran.",
    businessImpact:
      "Menyederhanakan alur dari eksplorasi topik hingga reservasi jadwal sesi agar langkah pengguna lebih jelas dan terarah.",
    dataSource:
      "Kebutuhan alur layanan konseling digital, topik konsultasi, ketersediaan jadwal psikolog, dan alur transaksi sesi.",
    keyKpis: [
      "Kelengkapan Alur (Topik → Psikolog → Jadwal → Pembayaran)",
      "Kejelasan Informasi Profil & Jadwal Konseling",
      "Kemudahan Langkah Reservasi Sesi",
    ],
    keyInsights: [
      "Pemetaan topik sebelum memilih psikolog membantu pengguna mengenali kebutuhan awal secara lebih terstruktur.",
      "Penyatuan jadwal dan pembayaran dalam satu alur mengurangi langkah terputus saat reservasi.",
      "Penyajian informasi yang jelas mendukung kenyamanan pengguna baru.",
    ],
    businessRecommendations: [
      "Pertahankan alur reservasi yang ringkas dengan informasi jadwal dan biaya yang transparan.",
      "Lengkapi informasi spesialisasi psikolog agar pemilihan layanan lebih tepat sasaran.",
      "Lakukan pengujian alur dengan calon pengguna untuk menyempurnakan titik interaksi.",
    ],
    highlights: [
      "Studi Kasus Product & UI/UX: Menyederhanakan alur pengguna dari pemilihan topik dan psikolog hingga penjadwalan sesi.",
      "Aksi Teknis: Perancangan user flow dan prototipe antarmuka mobile Mental Care pada kegiatan PKM.",
    ],
    technologies: ["UI/UX Design", "Mobile Prototyping", "User Flow", "Product Design"],
    featured: false,
  },
]

const categories = [
  "All",
  "BI & Dashboard",
  "Operations & Data",
  "Analytics & Research",
  "Product & UI/UX",
] as const

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
                Kumpulan proyek dashboard Business Intelligence, pelaporan operasional, analisis SQL &amp; Python,
                simulator bisnis interaktif, serta studi kasus produk berbasis data.
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

            {/* 1. Latar Belakang Masalah */}
            <div className="rounded-2xl border border-border bg-background/60 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                <Target className="w-4 h-4" />
                <span>1. Latar Belakang Masalah</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {selectedProject.businessContext}
              </p>
            </div>

            {/* 2. Sumber & Struktur Data */}
            <div className="rounded-2xl border border-border bg-background/60 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                <Database className="w-4 h-4" />
                <span>2. Sumber &amp; Struktur Data</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {selectedProject.dataSource}
              </p>
            </div>

            {/* 3. Metrik / KPI Utama */}
            <div className="rounded-2xl border border-border bg-background/60 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                <LineChart className="w-4 h-4" />
                <span>3. Metrik / KPI Utama</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-foreground">
                {selectedProject.keyKpis.map((kpi, idx) => (
                  <li key={idx} className="rounded-xl border border-border/80 bg-card px-3 py-2">
                    {kpi}
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Key Insights */}
            <div className="rounded-2xl border border-border bg-background/60 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                <BarChart3 className="w-4 h-4" />
                <span>4. Key Insights (Temuan Utama)</span>
              </div>
              <ul className="space-y-2">
                {selectedProject.keyInsights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. Rekomendasi Bisnis */}
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                <Lightbulb className="w-4 h-4" />
                <span>5. Rekomendasi Bisnis</span>
              </div>
              <ul className="space-y-2">
                {selectedProject.businessRecommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              {selectedProject.href && (
                <Link
                  href={selectedProject.href}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:opacity-95 transition-opacity"
                >
                  <span>Buka Halaman Interaktif</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Check,
  Code2,
  Copy,
  Database,
  Lightbulb,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SegmentDetail {
  id: string
  name: string
  badgeColor: string
  customers: number
  sharePct: string
  avgRecencyDays: number
  avgFrequency: number
  avgMonetaryRp: string
  totalRevenueRp: string
  summary: string
  businessAction: string
  sampleRows: {
    customerId: string
    recency: number
    frequency: number
    monetary: string
    rfmScore: string
  }[]
}

const SQL_CODE = `-- Retail Customer RFM Segmentation & Margin Analysis (BigQuery / PostgreSQL)
WITH cleaned_transactions AS (
  SELECT DISTINCT
    transaction_id,
    customer_id,
    DATE(transaction_date) AS order_date,
    product_category,
    quantity,
    (unit_price - unit_cost) * quantity AS net_profit,
    unit_price * quantity AS gross_revenue
  FROM retail_sales.transactions
  WHERE customer_id IS NOT NULL
    AND quantity > 0
    AND unit_price > unit_cost
    AND DATE(transaction_date) BETWEEN '2026-01-01' AND '2026-10-31'
),
rfm_base AS (
  SELECT
    customer_id,
    DATE_DIFF(DATE '2026-11-01', MAX(order_date), DAY) AS recency_days,
    COUNT(DISTINCT transaction_id) AS frequency_orders,
    SUM(gross_revenue) AS monetary_revenue,
    SUM(net_profit) AS total_profit
  FROM cleaned_transactions
  GROUP BY customer_id
),
rfm_scores AS (
  SELECT
    *,
    NTILE(4) OVER (ORDER BY recency_days DESC) AS r_score,
    NTILE(4) OVER (ORDER BY frequency_orders ASC) AS f_score,
    NTILE(4) OVER (ORDER BY monetary_revenue ASC) AS m_score
  FROM rfm_base
)
SELECT
  customer_id,
  recency_days,
  frequency_orders,
  monetary_revenue,
  total_profit,
  CONCAT(CAST(r_score AS STRING), CAST(f_score AS STRING), CAST(m_score AS STRING)) AS rfm_cell,
  CASE
    WHEN r_score >= 4 AND f_score >= 4 AND m_score >= 4 THEN 'Champions'
    WHEN r_score >= 3 AND f_score >= 3 THEN 'Loyal Customers'
    WHEN r_score >= 3 AND f_score <= 2 THEN 'Potential Loyalist'
    WHEN r_score <= 2 AND f_score >= 3 THEN 'At Risk'
    ELSE 'Hibernating'
  END AS customer_segment
FROM rfm_scores
ORDER BY monetary_revenue DESC;`

const PYTHON_CODE = `import pandas as pd
import numpy as np

# 1. Load & Data Cleaning
df = pd.read_csv("retail_transactions_2026.csv", parse_dates=["transaction_date"])
df = (
    df.dropna(subset=["customer_id", "transaction_id"])
      .drop_duplicates(subset=["transaction_id", "product_id"])
      .query("quantity > 0 and unit_price > unit_cost")
)

df["gross_revenue"] = df["quantity"] * df["unit_price"]
df["net_profit"] = df["quantity"] * (df["unit_price"] - df["unit_cost"])

# 2. Agregasi Metrik RFM per Pelanggan
snapshot_date = pd.Timestamp("2026-11-01")
rfm = df.groupby("customer_id").agg(
    recency_days=("transaction_date", lambda x: (snapshot_date - x.max()).days),
    frequency=("transaction_id", "nunique"),
    monetary=("gross_revenue", "sum"),
    total_profit=("net_profit", "sum"),
).reset_index()

# 3. Pemberian Skor Kuartil (1-4)
rfm["R"] = pd.qcut(rfm["recency_days"], q=4, labels=[4, 3, 2, 1]).astype(int)
rfm["F"] = pd.qcut(rfm["frequency"].rank(method="first"), q=4, labels=[1, 2, 3, 4]).astype(int)
rfm["M"] = pd.qcut(rfm["monetary"], q=4, labels=[1, 2, 3, 4]).astype(int)

# 4. Pelabelan Segmen Bisnis
def assign_segment(row):
    if row["R"] >= 4 and row["F"] >= 4 and row["M"] >= 4:
        return "Champions"
    elif row["R"] >= 3 and row["F"] >= 3:
        return "Loyal Customers"
    elif row["R"] >= 3 and row["F"] <= 2:
        return "Potential Loyalist"
    elif row["R"] <= 2 and row["F"] >= 3:
        return "At Risk"
    return "Hibernating"

rfm["segment"] = rfm.apply(assign_segment, axis=1)
summary = rfm.groupby("segment").agg(
    customers=("customer_id", "count"),
    avg_recency=("recency_days", "mean"),
    avg_frequency=("frequency", "mean"),
    total_revenue=("monetary", "sum"),
).round(1)`

const SEGMENTS: SegmentDetail[] = [
  {
    id: "champions",
    name: "Champions",
    badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    customers: 312,
    sharePct: "18.4%",
    avgRecencyDays: 6,
    avgFrequency: 14.2,
    avgMonetaryRp: "Rp 4.850.000",
    totalRevenueRp: "Rp 1.513.200.000",
    summary:
      "Pelanggan paling aktif dengan frekuensi belanja tinggi dan nilai transaksi terbesar dalam 10 bulan terakhir.",
    businessAction:
      "Berikan akses awal produk baru, program poin VIP tanpa perlu diskon besar agar margin tetap terjaga, serta insentif referral.",
    sampleRows: [
      { customerId: "CUST-1042", recency: 3, frequency: 18, monetary: "Rp 6.420.000", rfmScore: "444" },
      { customerId: "CUST-1189", recency: 5, frequency: 15, monetary: "Rp 5.190.000", rfmScore: "444" },
      { customerId: "CUST-1304", recency: 8, frequency: 13, monetary: "Rp 4.610.000", rfmScore: "444" },
    ],
  },
  {
    id: "loyal",
    name: "Loyal Customers",
    badgeColor: "bg-blue-500/15 text-blue-500 border-blue-500/30",
    customers: 468,
    sharePct: "27.5%",
    avgRecencyDays: 14,
    avgFrequency: 8.6,
    avgMonetaryRp: "Rp 2.740.000",
    totalRevenueRp: "Rp 1.282.320.000",
    summary:
      "Tulang punggung pendapatan ritel yang rutin melakukan pembelian ulang setiap bulan dengan keranjang belanja stabil.",
    businessAction:
      "Dorong kenaikan Average Order Value (AOV) lewat paket bundling produk bermargin tinggi dan tebus murah kategori pelengkap.",
    sampleRows: [
      { customerId: "CUST-2015", recency: 11, frequency: 10, monetary: "Rp 3.150.000", rfmScore: "343" },
      { customerId: "CUST-2140", recency: 15, frequency: 9, monetary: "Rp 2.680.000", rfmScore: "333" },
      { customerId: "CUST-2298", recency: 17, frequency: 7, monetary: "Rp 2.410.000", rfmScore: "333" },
    ],
  },
  {
    id: "potential",
    name: "Potential Loyalist",
    badgeColor: "bg-violet-500/15 text-violet-500 border-violet-500/30",
    customers: 385,
    sharePct: "22.6%",
    avgRecencyDays: 12,
    avgFrequency: 2.4,
    avgMonetaryRp: "Rp 920.000",
    totalRevenueRp: "Rp 354.200.000",
    summary:
      "Pelanggan baru atau pembeli berfrekuensi rendah yang baru saja bertransaksi dan berpotensi naik menjadi pelanggan loyal.",
    businessAction:
      "Kirimkan voucher repeat order kedua dengan masa berlaku 14 hari untuk membangun kebiasaan belanja rutin.",
    sampleRows: [
      { customerId: "CUST-3091", recency: 9, frequency: 2, monetary: "Rp 1.050.000", rfmScore: "422" },
      { customerId: "CUST-3177", recency: 13, frequency: 3, monetary: "Rp 940.000", rfmScore: "322" },
      { customerId: "CUST-3412", recency: 14, frequency: 2, monetary: "Rp 810.000", rfmScore: "312" },
    ],
  },
  {
    id: "at-risk",
    name: "At Risk",
    badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    customers: 275,
    sharePct: "16.2%",
    avgRecencyDays: 68,
    avgFrequency: 7.4,
    avgMonetaryRp: "Rp 2.390.000",
    totalRevenueRp: "Rp 657.250.000",
    summary:
      "Mantan pelanggan rutin dengan histori belanja tinggi, tetapi sudah lebih dari 2 bulan tidak kembali bertransaksi.",
    businessAction:
      "Jalankan kampanye win-back terpersonalisasi berdasarkan kategori produk favorit terakhir sebelum berpindah ke kompetitor.",
    sampleRows: [
      { customerId: "CUST-4018", recency: 61, frequency: 9, monetary: "Rp 2.980.000", rfmScore: "243" },
      { customerId: "CUST-4152", recency: 72, frequency: 7, monetary: "Rp 2.240.000", rfmScore: "233" },
      { customerId: "CUST-4389", recency: 75, frequency: 6, monetary: "Rp 1.950.000", rfmScore: "133" },
    ],
  },
  {
    id: "hibernating",
    name: "Hibernating",
    badgeColor: "bg-rose-500/15 text-rose-500 border-rose-500/30",
    customers: 260,
    sharePct: "15.3%",
    avgRecencyDays: 134,
    avgFrequency: 1.5,
    avgMonetaryRp: "Rp 410.000",
    totalRevenueRp: "Rp 106.600.000",
    summary:
      "Pelanggan pasif dengan frekuensi sangat rendah dan transaksi terakhir sudah lebih dari 4 bulan lalu.",
    businessAction:
      "Hindari pengeluaran biaya iklan berbayar tinggi; cukup jangkau lewat blast promo musiman berbiaya rendah.",
    sampleRows: [
      { customerId: "CUST-5022", recency: 121, frequency: 2, monetary: "Rp 480.000", rfmScore: "121" },
      { customerId: "CUST-5190", recency: 138, frequency: 1, monetary: "Rp 390.000", rfmScore: "111" },
      { customerId: "CUST-5311", recency: 146, frequency: 1, monetary: "Rp 350.000", rfmScore: "111" },
    ],
  },
]

export default function SqlPythonCasePage() {
  const [activeTab, setActiveTab] = useState<"sql" | "python">("sql")
  const [copied, setCopied] = useState(false)
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>("champions")

  const currentCode = activeTab === "sql" ? SQL_CODE : PYTHON_CODE
  const activeSegment =
    SEGMENTS.find((seg) => seg.id === selectedSegmentId) ?? SEGMENTS[0]

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Back Navigation */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Proyek</span>
          </Link>
        </div>

        {/* Header */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1.5">
              <Database className="w-3.5 h-3.5 text-primary" />
              SQL & Python Analytics
            </Badge>
            <Badge>Case Study</Badge>
            <span className="text-xs text-muted-foreground">
              BigQuery SQL • Python (Pandas & NumPy) • Retail Analytics
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Retail Customer Segmentation (RFM) & Basket Profit Analysis
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl">
            Studi kasus pengolahan data transaksi ritel mentah (1.700 pelanggan aktif) menggunakan{" "}
            <strong className="text-foreground">SQL CTE & Window Functions</strong> serta{" "}
            <strong className="text-foreground">Python (Pandas)</strong> untuk membersihkan anomali data, menghitung margin bersih, dan mengelompokkan pelanggan ke 5 segmen RFM sebagai dasar strategi retensi dan alokasi promo.
          </p>

          {/* KPI Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="rounded-2xl border border-border bg-background/60 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="w-4 h-4 text-primary" />
                <span>Total Pelanggan Dianalisis</span>
              </div>
              <p className="mt-2 text-xl font-bold text-foreground">1.700</p>
              <p className="text-xs text-muted-foreground mt-0.5">Periode Jan – Okt 2026</p>
            </div>

            <div className="rounded-2xl border border-border bg-background/60 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Wallet className="w-4 h-4 text-primary" />
                <span>Total Gross Revenue</span>
              </div>
              <p className="mt-2 text-xl font-bold text-foreground">Rp 3,91 M</p>
              <p className="text-xs text-muted-foreground mt-0.5">71,4% dari Champions & Loyal</p>
            </div>

            <div className="rounded-2xl border border-border bg-background/60 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Potensi Win-Back (At Risk)</span>
              </div>
              <p className="mt-2 text-xl font-bold text-foreground">Rp 657,2 Jt</p>
              <p className="text-xs text-muted-foreground mt-0.5">275 pelanggan prioritas retensi</p>
            </div>

            <div className="rounded-2xl border border-border bg-background/60 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Code2 className="w-4 h-4 text-primary" />
                <span>Data Anomali Dibersihkan</span>
              </div>
              <p className="mt-2 text-xl font-bold text-foreground">4,8%</p>
              <p className="text-xs text-muted-foreground mt-0.5">Duplikat, null ID & margin negatif</p>
            </div>
          </div>
        </section>

        {/* Code Explorer Section */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                1. Pipeline Pengolahan Data (SQL & Python)
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Pilih tab di bawah untuk melihat query SQL agregasi RFM atau script pembersihan & scoring di Python.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("sql")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === "sql"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                SQL Query
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("python")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === "python"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                Python (Pandas)
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-background text-xs font-medium text-foreground hover:bg-muted transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Tersalin" : "Copy"}</span>
              </button>
            </div>
          </div>

          <pre className="rounded-2xl border border-border bg-zinc-950 text-zinc-100 p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm leading-relaxed font-mono">
            <code>{currentCode}</code>
          </pre>
        </section>

        {/* Interactive Output & Business Action */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              2. Eksplorasi Hasil Segmentasi & Rekomendasi Bisnis
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Klik salah satu segmen pelanggan untuk memeriksa sampel output tabel dan strategi eksekusi bisnisnya.
            </p>
          </div>

          {/* Segment Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {SEGMENTS.map((seg) => {
              const isSelected = seg.id === activeSegment.id
              return (
                <button
                  key={seg.id}
                  type="button"
                  onClick={() => setSelectedSegmentId(seg.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-foreground hover:border-primary/40"
                  }`}
                >
                  {seg.name} ({seg.customers})
                </button>
              )
            })}
          </div>

          {/* Active Segment Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 rounded-2xl border border-border bg-background/60 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${activeSegment.badgeColor}`}>
                  {activeSegment.name}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  Porsi: {activeSegment.sharePct}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-border p-3">
                  <span className="text-muted-foreground block">Avg. Recency</span>
                  <span className="text-sm font-bold text-foreground mt-0.5 block">
                    {activeSegment.avgRecencyDays} hari
                  </span>
                </div>
                <div className="rounded-xl border border-border p-3">
                  <span className="text-muted-foreground block">Avg. Frequency</span>
                  <span className="text-sm font-bold text-foreground mt-0.5 block">
                    {activeSegment.avgFrequency}x order
                  </span>
                </div>
                <div className="rounded-xl border border-border p-3">
                  <span className="text-muted-foreground block">Avg. Spend</span>
                  <span className="text-sm font-bold text-foreground mt-0.5 block">
                    {activeSegment.avgMonetaryRp}
                  </span>
                </div>
                <div className="rounded-xl border border-border p-3">
                  <span className="text-muted-foreground block">Total Revenue</span>
                  <span className="text-sm font-bold text-foreground mt-0.5 block">
                    {activeSegment.totalRevenueRp}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {activeSegment.summary}
              </p>

              <div className="rounded-xl border border-primary/30 bg-primary/5 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <Lightbulb className="w-4 h-4" />
                  <span>Rekomendasi Aksi Bisnis</span>
                </div>
                <p className="text-xs text-foreground leading-relaxed">
                  {activeSegment.businessAction}
                </p>
              </div>
            </div>

            {/* Sample Output Table */}
            <div className="lg:col-span-2 rounded-2xl border border-border bg-background/60 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">
                  Sampel Output Query — Segmen {activeSegment.name}
                </h3>
                <span className="text-xs text-muted-foreground">Top 3 Customer ID</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="py-2.5 px-3 font-medium">Customer ID</th>
                      <th className="py-2.5 px-3 font-medium">Recency (Hari)</th>
                      <th className="py-2.5 px-3 font-medium">Frequency</th>
                      <th className="py-2.5 px-3 font-medium">Monetary</th>
                      <th className="py-2.5 px-3 font-medium">RFM Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeSegment.sampleRows.map((row) => (
                      <tr key={row.customerId} className="border-b border-border/60 last:border-none">
                        <td className="py-3 px-3 font-mono font-semibold text-foreground">{row.customerId}</td>
                        <td className="py-3 px-3 text-muted-foreground">{row.recency} hari</td>
                        <td className="py-3 px-3 text-muted-foreground">{row.frequency}x</td>
                        <td className="py-3 px-3 font-medium text-foreground">{row.monetary}</td>
                        <td className="py-3 px-3">
                          <Badge variant="secondary" className="font-mono text-xs">
                            {row.rfmScore}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
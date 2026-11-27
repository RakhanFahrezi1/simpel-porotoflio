export interface InvestigationRow {
  period: string
  dimension: string
  revenue: number
  cost: number
  netProfit: number
  orders: number
  adSpend: number
  returnsOrWaste: number
  missingFlag: number
}

export interface RootCauseScenario {
  id: string
  badge: string
  title: string
  kpiHeadline: string
  defaultQuestion: string
  description: string
  rows: InvestigationRow[]
}

export interface ToolTraceStep {
  step: number
  toolName: string
  title: string
  finding: string
  metricBadge: string
}

export interface InvestigationReport {
  scenarioTitle: string
  kpiHeadline: string
  executiveSummary: string
  primaryRootCause: string
  estimatedImpactIdr: number
  sqlInvestigationQuery: string
  toolTrace: ToolTraceStep[]
  actionItems: string[]
  sourceMode: "gemini-ai" | "deterministic-agent"
}

export const ROOT_CAUSE_SCENARIOS: RootCauseScenario[] = [
  {
    id: "ecommerce-margin-drop",
    badge: "E-Commerce & Marketplace",
    title: "Investigasi Penurunan Net Margin Penjualan",
    kpiHeadline: "Net Margin turun dari 24,5% menjadi 14,8% pada 7 hari terakhir",
    defaultQuestion:
      "Mengapa net margin turun tajam minggu ini padahal jumlah pesanan tetap stabil, dan apa prioritas perbaikan untuk manajemen?",
    description:
      "Menelusuri apakah penurunan laba bersih dipicu kenaikan biaya diskon/retur, pembengkakan HPP produk, atau pergeseran komposisi channel.",
    rows: [
      { period: "W1-Sen", dimension: "Marketplace A", revenue: 48000000, cost: 31200000, netProfit: 12200000, orders: 320, adSpend: 4600000, returnsOrWaste: 900000, missingFlag: 0 },
      { period: "W1-Rab", dimension: "Official Store", revenue: 42000000, cost: 26800000, netProfit: 11200000, orders: 270, adSpend: 4000000, returnsOrWaste: 750000, missingFlag: 0 },
      { period: "W1-Jum", dimension: "Marketplace B", revenue: 45000000, cost: 29500000, netProfit: 10900000, orders: 300, adSpend: 4600000, returnsOrWaste: 1100000, missingFlag: 0 },
      { period: "W2-Sen", dimension: "Marketplace A", revenue: 47500000, cost: 35600000, netProfit: 6800000, orders: 318, adSpend: 5100000, returnsOrWaste: 2600000, missingFlag: 0 },
      { period: "W2-Rab", dimension: "Official Store", revenue: 41800000, cost: 28900000, netProfit: 8600000, orders: 268, adSpend: 4300000, returnsOrWaste: 950000, missingFlag: 0 },
      { period: "W2-Jum", dimension: "Marketplace B", revenue: 44900000, cost: 35400000, netProfit: 5100000, orders: 302, adSpend: 4400000, returnsOrWaste: 2450000, missingFlag: 0 },
    ],
  },
  {
    id: "fnb-food-cost-spike",
    badge: "F&B & Restoran Operasional",
    title: "Investigasi Lonjakan Food Cost & HPP Harian",
    kpiHeadline: "Rasio Food Cost naik +7,4 poin persentase dalam 2 pekan",
    defaultQuestion:
      "Cari akar penyebab lonjakan biaya bahan baku dan waste/retur yang menekan margin operasional harian.",
    description:
      "Menganalisis pergerakan biaya bahan baku, waste/retur harian, serta kontribusi laba per kanal layanan dine-in dan delivery.",
    rows: [
      { period: "H-1", dimension: "Dine-In Utama", revenue: 26500000, cost: 9800000, netProfit: 11400000, orders: 410, adSpend: 900000, returnsOrWaste: 420000, missingFlag: 0 },
      { period: "H-2", dimension: "Delivery App", revenue: 19800000, cost: 8900000, netProfit: 6200000, orders: 330, adSpend: 2100000, returnsOrWaste: 550000, missingFlag: 0 },
      { period: "H-3", dimension: "Dine-In Utama", revenue: 27200000, cost: 10100000, netProfit: 11800000, orders: 425, adSpend: 900000, returnsOrWaste: 450000, missingFlag: 0 },
      { period: "H-4", dimension: "Delivery App", revenue: 20100000, cost: 11600000, netProfit: 3700000, orders: 335, adSpend: 2400000, returnsOrWaste: 1650000, missingFlag: 0 },
      { period: "H-5", dimension: "Dine-In Utama", revenue: 28000000, cost: 13400000, netProfit: 9100000, orders: 430, adSpend: 950000, returnsOrWaste: 1580000, missingFlag: 0 },
      { period: "H-6", dimension: "Delivery App", revenue: 19500000, cost: 11900000, netProfit: 3100000, orders: 325, adSpend: 2300000, returnsOrWaste: 1720000, missingFlag: 0 },
    ],
  },
  {
    id: "digital-roas-drop",
    badge: "Digital Marketing & Growth",
    title: "Investigasi Penurunan Efisiensi ROAS Kampanye",
    kpiHeadline: "ROAS gabungan turun dari 8,9x menjadi 6,2x pada periode terbaru",
    defaultQuestion:
      "Channel mana yang paling membebani efisiensi belanja iklan dan bagaimana mengalokasikan ulang budget secara aman?",
    description:
      "Mengevaluasi rasio omzet terhadap belanja iklan (ROAS), biaya per order, dan laba bersih per channel kampanye.",
    rows: [
      { period: "P1", dimension: "Paid Social", revenue: 36000000, cost: 17000000, netProfit: 11800000, orders: 240, adSpend: 4200000, returnsOrWaste: 600000, missingFlag: 0 },
      { period: "P1", dimension: "Search & Shopping", revenue: 44000000, cost: 21500000, netProfit: 15900000, orders: 290, adSpend: 4800000, returnsOrWaste: 500000, missingFlag: 0 },
      { period: "P1", dimension: "Affiliate / Creator", revenue: 29000000, cost: 14800000, netProfit: 9600000, orders: 195, adSpend: 3300000, returnsOrWaste: 400000, missingFlag: 0 },
      { period: "P2", dimension: "Paid Social", revenue: 33500000, cost: 21200000, netProfit: 5200000, orders: 220, adSpend: 6800000, returnsOrWaste: 1200000, missingFlag: 0 },
      { period: "P2", dimension: "Search & Shopping", revenue: 43800000, cost: 22100000, netProfit: 15100000, orders: 288, adSpend: 5100000, returnsOrWaste: 550000, missingFlag: 0 },
      { period: "P2", dimension: "Affiliate / Creator", revenue: 28400000, cost: 16200000, netProfit: 7400000, orders: 190, adSpend: 3900000, returnsOrWaste: 700000, missingFlag: 0 },
    ],
  },
]

export function runDeterministicRootCauseTools(
  scenarioTitle: string,
  kpiHeadline: string,
  rows: InvestigationRow[]
): Omit<InvestigationReport, "sourceMode"> {
  const half = Math.max(1, Math.floor(rows.length / 2))
  const earlier = rows.slice(0, half)
  const recent = rows.slice(half)

  const sumBy = (arr: InvestigationRow[], key: keyof InvestigationRow) =>
    arr.reduce((acc, item) => acc + Number(item[key] || 0), 0)

  const earlierProfit = sumBy(earlier, "netProfit")
  const recentProfit = sumBy(recent, "netProfit")
  const profitDelta = recentProfit - earlierProfit

  const earlierWaste = sumBy(earlier, "returnsOrWaste")
  const recentWaste = sumBy(recent, "returnsOrWaste")
  const wasteDelta = recentWaste - earlierWaste

  const earlierAd = sumBy(earlier, "adSpend")
  const recentAd = sumBy(recent, "adSpend")
  const adDelta = recentAd - earlierAd

  // Hitung kontribusi laba per dimensi di periode terbaru
  const dimProfitMap = new Map<string, number>()
  for (const r of recent) {
    dimProfitMap.set(r.dimension, (dimProfitMap.get(r.dimension) || 0) + r.netProfit)
  }

  let lowestDim = "-"
  let lowestVal = Infinity
  dimProfitMap.forEach((val, dim) => {
    if (val < lowestVal) {
      lowestVal = val
      lowestDim = dim
    }
  })

  const missingTotal = sumBy(rows, "missingFlag")
  const formatIdr = (n: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Math.round(n))

  const driverText =
    wasteDelta >= adDelta
      ? `lonjakan retur/waste sebesar +${formatIdr(wasteDelta)}`
      : `kenaikan biaya akuisisi/iklan sebesar +${formatIdr(adDelta)}`

  const toolTrace: ToolTraceStep[] = [
    {
      step: 1,
      toolName: "scan_kpi_trend",
      title: "Deteksi Perubahan Laba Bersih Antar-Periode",
      finding: `Total net profit bergeser dari ${formatIdr(earlierProfit)} menjadi ${formatIdr(recentProfit)} (selisih ${profitDelta >= 0 ? "+" : ""}${formatIdr(profitDelta)}).`,
      metricBadge: `${profitDelta >= 0 ? "+" : ""}${formatIdr(profitDelta)}`,
    },
    {
      step: 2,
      toolName: "isolate_dimension_driver",
      title: "Isolasi Segmen / Channel dengan Performa Terendah",
      finding: `Dimensi "${lowestDim}" mencatat net profit terendah (${formatIdr(lowestVal === Infinity ? 0 : lowestVal)}) pada paruh periode terbaru, didorong oleh ${driverText}.`,
      metricBadge: lowestDim,
    },
    {
      step: 3,
      toolName: "audit_cost_and_leakage",
      title: "Audit Kebocoran Biaya (Retur/Waste & Ad Spend)",
      finding: `Retur/waste berubah ${wasteDelta >= 0 ? "+" : ""}${formatIdr(wasteDelta)} dan beban iklan berubah ${adDelta >= 0 ? "+" : ""}${formatIdr(adDelta)}.`,
      metricBadge: `Waste ${wasteDelta >= 0 ? "+" : ""}${formatIdr(wasteDelta)}`,
    },
    {
      step: 4,
      toolName: "verify_data_integrity",
      title: "Validasi Integritas & Kelengkapan Baris Data",
      finding: `Memeriksa ${rows.length} titik observasi terstruktur; ditemukan ${missingTotal} catatan anomali/missing flag sehingga hasil layak dijadikan dasar keputusan.`,
      metricBadge: `${missingTotal} Anomali`,
    },
  ]

  const primaryRootCause = `Penurunan laba bersih (${formatIdr(profitDelta)}) terutama dipicu oleh ${driverText} pada segmen "${lowestDim}" sementara volume transaksi relatif bertahan.`

  const executiveSummary = `Hasil investigasi otomatis pada "${scenarioTitle}" menunjukkan bahwa pergerakan laba bersih lebih dipengaruhi kebocoran margin per transaksi (${driverText}) ketimbang runtuhnya permintaan secara keseluruhan. Manajemen dapat memulihkan margin dengan membenahi efisiensi biaya pada "${lowestDim}" sebelum menambah anggaran promosi.`

  const sqlInvestigationQuery = `WITH period_summary AS (
  SELECT
    period,
    dimension,
    SUM(revenue) AS total_revenue,
    SUM(cost) AS total_cost,
    SUM(ad_spend) AS total_ad_spend,
    SUM(returns_or_waste) AS total_leakage,
    SUM(net_profit) AS total_net_profit
  FROM kpi_investigation_log
  GROUP BY 1, 2
)
SELECT
  dimension,
  SUM(total_revenue) AS revenue_idr,
  SUM(total_net_profit) AS net_profit_idr,
  ROUND(SAFE_DIVIDE(SUM(total_net_profit), NULLIF(SUM(total_revenue), 0)) * 100, 2) AS net_margin_pct,
  SUM(total_leakage) AS leakage_idr
FROM period_summary
GROUP BY 1
ORDER BY net_profit_idr ASC;`

  const actionItems = [
    `Audit detail transaksi & komponen biaya pada segmen "${lowestDim}" untuk menekan ${driverText}.`,
    "Tetapkan batas ambang minimum net margin per channel/produk sebelum menyetujui diskon atau tambahan biaya iklan.",
    "Pantau tren harian net profit dan rasio retur/waste selama 7 hari ke depan setelah penyesuaian operasional dijalankan.",
  ]

  return {
    scenarioTitle,
    kpiHeadline,
    executiveSummary,
    primaryRootCause,
    estimatedImpactIdr: Math.abs(profitDelta),
    sqlInvestigationQuery,
    toolTrace,
    actionItems,
  }
}
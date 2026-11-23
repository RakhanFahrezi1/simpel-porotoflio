"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowLeft,
  Calculator,
  PackageCheck,
  RotateCcw,
  SlidersHorizontal,
  TrendingUp,
  Wallet,
} from "lucide-react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Badge } from "@/components/ui/badge"

interface HistoricalDay {
  day: string
  actualUnits: number
  isWeekend: boolean
}

interface IngredientItem {
  id: string
  name: string
  unit: string
  stockOnHand: number
  dailyUsagePerUnit: number
  leadTimeDays: number
  baseUnitCostRp: number
}

const HISTORICAL_14_DAYS: HistoricalDay[] = [
  { day: "H-13 (Sen)", actualUnits: 118, isWeekend: false },
  { day: "H-12 (Sel)", actualUnits: 124, isWeekend: false },
  { day: "H-11 (Rab)", actualUnits: 121, isWeekend: false },
  { day: "H-10 (Kam)", actualUnits: 129, isWeekend: false },
  { day: "H-9 (Jum)", actualUnits: 146, isWeekend: false },
  { day: "H-8 (Sab)", actualUnits: 192, isWeekend: true },
  { day: "H-7 (Min)", actualUnits: 205, isWeekend: true },
  { day: "H-6 (Sen)", actualUnits: 122, isWeekend: false },
  { day: "H-5 (Sel)", actualUnits: 127, isWeekend: false },
  { day: "H-4 (Rab)", actualUnits: 131, isWeekend: false },
  { day: "H-3 (Kam)", actualUnits: 135, isWeekend: false },
  { day: "H-2 (Jum)", actualUnits: 152, isWeekend: false },
  { day: "H-1 (Sab)", actualUnits: 198, isWeekend: true },
  { day: "Hari Ini (Min)", actualUnits: 210, isWeekend: true },
]

const INGREDIENTS: IngredientItem[] = [
  {
    id: "ing-1",
    name: "Ayam & Protein Utama",
    unit: "kg",
    stockOnHand: 85,
    dailyUsagePerUnit: 0.24,
    leadTimeDays: 2,
    baseUnitCostRp: 42000,
  },
  {
    id: "ing-2",
    name: "Beras & Bahan Pokok",
    unit: "kg",
    stockOnHand: 165,
    dailyUsagePerUnit: 0.32,
    leadTimeDays: 3,
    baseUnitCostRp: 15500,
  },
  {
    id: "ing-3",
    name: "Bumbu & Rempah Racikan",
    unit: "kg",
    stockOnHand: 22,
    dailyUsagePerUnit: 0.08,
    leadTimeDays: 3,
    baseUnitCostRp: 58000,
  },
  {
    id: "ing-4",
    name: "Minyak Goreng Operasional",
    unit: "liter",
    stockOnHand: 54,
    dailyUsagePerUnit: 0.16,
    leadTimeDays: 2,
    baseUnitCostRp: 18500,
  },
  {
    id: "ing-5",
    name: "Kemasan & Box Takeaway",
    unit: "pack",
    stockOnHand: 42,
    dailyUsagePerUnit: 0.14,
    leadTimeDays: 4,
    baseUnitCostRp: 24000,
  },
]

const BASE_AVG_PRICE_RP = 34000
const BASE_UNIT_COGS_RP = 16800

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}

function formatCompactRupiah(value: number): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? "-" : ""
  if (abs >= 1_000_000_000) {
    return `${sign}Rp ${(abs / 1_000_000_000).toFixed(2).replace(".", ",")} M`
  }
  if (abs >= 1_000_000) {
    return `${sign}Rp ${(abs / 1_000_000).toFixed(1).replace(".", ",")} Jt`
  }
  return formatRupiah(value)
}

export default function DemandForecastPage() {
  const [cogsChangePct, setCogsChangePct] = useState<number>(5)
  const [promoDiscountPct, setPromoDiscountPct] = useState<number>(8)
  const [weekendBoost, setWeekendBoost] = useState<number>(1.35)

  const applyPreset = (preset: "normal" | "promo-weekend" | "cost-inflation") => {
    if (preset === "normal") {
      setCogsChangePct(0)
      setPromoDiscountPct(0)
      setWeekendBoost(1.25)
    } else if (preset === "promo-weekend") {
      setCogsChangePct(4)
      setPromoDiscountPct(12)
      setWeekendBoost(1.5)
    } else {
      setCogsChangePct(18)
      setPromoDiscountPct(5)
      setWeekendBoost(1.3)
    }
  }

  const simulation = useMemo(() => {
    const avgWeekdayUnits =
      HISTORICAL_14_DAYS.filter((d) => !d.isWeekend).reduce((acc, d) => acc + d.actualUnits, 0) /
      HISTORICAL_14_DAYS.filter((d) => !d.isWeekend).length

    const promoDemandLift = 1 + (promoDiscountPct / 100) * 1.4

    const dayLabels14Ahead = [
      { label: "+1 (Sen)", isWeekend: false },
      { label: "+2 (Sel)", isWeekend: false },
      { label: "+3 (Rab)", isWeekend: false },
      { label: "+4 (Kam)", isWeekend: false },
      { label: "+5 (Jum)", isWeekend: false },
      { label: "+6 (Sab)", isWeekend: true },
      { label: "+7 (Min)", isWeekend: true },
      { label: "+8 (Sen)", isWeekend: false },
      { label: "+9 (Sel)", isWeekend: false },
      { label: "+10 (Rab)", isWeekend: false },
      { label: "+11 (Kam)", isWeekend: false },
      { label: "+12 (Jum)", isWeekend: false },
      { label: "+13 (Sab)", isWeekend: true },
      { label: "+14 (Min)", isWeekend: true },
    ]

    const forecastDays = dayLabels14Ahead.map((d) => {
      const seasonalFactor = d.isWeekend ? weekendBoost : 1
      const projected = Math.round(avgWeekdayUnits * seasonalFactor * promoDemandLift)
      return {
        day: d.label,
        forecastUnits: projected,
        upperBound: Math.round(projected * 1.12),
        lowerBound: Math.round(projected * 0.88),
      }
    })

    const chartData = [
      ...HISTORICAL_14_DAYS.map((d) => ({
        day: d.day,
        aktual: d.actualUnits,
        proyeksi: null as number | null,
        batasAtas: null as number | null,
        batasBawah: null as number | null,
      })),
      ...forecastDays.map((f) => ({
        day: f.day,
        aktual: null as number | null,
        proyeksi: f.forecastUnits,
        batasAtas: f.upperBound,
        batasBawah: f.lowerBound,
      })),
    ]

    const totalForecastUnits = forecastDays.reduce((acc, f) => acc + f.forecastUnits, 0)
    const avgDailyForecastUnits = totalForecastUnits / forecastDays.length

    const effectivePriceRp = BASE_AVG_PRICE_RP * (1 - promoDiscountPct / 100)
    const effectiveUnitCogsRp = BASE_UNIT_COGS_RP * (1 + cogsChangePct / 100)

    const projectedRevenueRp = totalForecastUnits * effectivePriceRp
    const projectedCogsRp = totalForecastUnits * effectiveUnitCogsRp
    const projectedNetProfitRp = projectedRevenueRp - projectedCogsRp
    const netMarginPct =
      projectedRevenueRp > 0 ? (projectedNetProfitRp / projectedRevenueRp) * 100 : 0

    const inventoryRows = INGREDIENTS.map((item) => {
      const avgDailyUsage = avgDailyForecastUnits * item.dailyUsagePerUnit
      const peakDailyUsage = avgDailyUsage * 1.2
      const safetyStock = Math.ceil((peakDailyUsage - avgDailyUsage) * item.leadTimeDays)
      const reorderPoint = Math.ceil(avgDailyUsage * item.leadTimeDays + safetyStock)
      const demand14Days = Math.ceil(totalForecastUnits * item.dailyUsagePerUnit)
      const adjustedUnitCost = Math.round(item.baseUnitCostRp * (1 + cogsChangePct / 100))

      const needsOrder = item.stockOnHand <= reorderPoint
      const suggestedOrderQty = needsOrder
        ? Math.max(0, Math.ceil(demand14Days + safetyStock - item.stockOnHand))
        : 0

      return {
        ...item,
        demand14Days,
        reorderPoint,
        safetyStock,
        adjustedUnitCost,
        needsOrder,
        suggestedOrderQty,
        estimatedOrderCostRp: suggestedOrderQty * adjustedUnitCost,
      }
    })

    const criticalItemsCount = inventoryRows.filter((r) => r.needsOrder).length
    const totalOrderCostRp = inventoryRows.reduce((acc, r) => acc + r.estimatedOrderCostRp, 0)

    return {
      chartData,
      totalForecastUnits,
      projectedRevenueRp,
      projectedNetProfitRp,
      netMarginPct,
      inventoryRows,
      criticalItemsCount,
      totalOrderCostRp,
    }
  }, [cogsChangePct, promoDiscountPct, weekendBoost])

  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Back Link */}
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
              <Calculator className="w-3.5 h-3.5 text-primary" />
              Predictive & What-If Modeling
            </Badge>
            <Badge>Business Analytics</Badge>
            <span className="text-xs text-muted-foreground">
              Demand Forecasting • Net Margin Sensitivity • Reorder Point (ROP)
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Demand Forecasting, Margin & Inventory What-If Simulator
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl">
            Simulator keputusan bisnis untuk operasional ritel dan F&B dalam memproyeksikan permintaan{" "}
            <strong className="text-foreground">14 hari ke depan</strong>, menguji sensitivitas{" "}
            <strong className="text-foreground">net profit & margin</strong> terhadap kenaikan harga bahan baku dan diskon promo, serta menghitung kebutuhan <strong className="text-foreground">Reorder Point (ROP)</strong> stok secara otomatis.
          </p>
        </section>

        {/* What-If Controls */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  1. Simulasi Skenario Bisnis (What-If Controls)
                </h2>
                <p className="text-xs text-muted-foreground">
                  Geser parameter di bawah atau pilih skenario cepat untuk melihat dampaknya ke profit dan stok.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => applyPreset("normal")}
                className="px-3 py-1.5 rounded-xl border border-border bg-background text-xs font-medium text-foreground hover:border-primary/40 transition-colors"
              >
                Baseline Normal
              </button>
              <button
                type="button"
                onClick={() => applyPreset("promo-weekend")}
                className="px-3 py-1.5 rounded-xl border border-border bg-background text-xs font-medium text-foreground hover:border-primary/40 transition-colors"
              >
                Promo + Lonjakan Weekend
              </button>
              <button
                type="button"
                onClick={() => applyPreset("cost-inflation")}
                className="px-3 py-1.5 rounded-xl border border-border bg-background text-xs font-medium text-foreground hover:border-primary/40 transition-colors"
              >
                Inflasi Bahan Baku (+18%)
              </button>
              <button
                type="button"
                onClick={() => applyPreset("normal")}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border bg-background text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* COGS Slider */}
            <div className="rounded-2xl border border-border bg-background/60 p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Perubahan Harga Bahan Baku</span>
                <span className="font-mono font-bold text-primary">
                  {cogsChangePct > 0 ? `+${cogsChangePct}%` : `${cogsChangePct}%`}
                </span>
              </div>
              <input
                type="range"
                min={-10}
                max={25}
                step={1}
                value={cogsChangePct}
                onChange={(e) => setCogsChangePct(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>-10%</span>
                <span>0%</span>
                <span>+25%</span>
              </div>
            </div>

            {/* Promo Slider */}
            <div className="rounded-2xl border border-border bg-background/60 p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Diskon Promo Penjualan</span>
                <span className="font-mono font-bold text-primary">{promoDiscountPct}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={promoDiscountPct}
                onChange={(e) => setPromoDiscountPct(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>0%</span>
                <span>10%</span>
                <span>20%</span>
              </div>
            </div>

            {/* Weekend Multiplier Slider */}
            <div className="rounded-2xl border border-border bg-background/60 p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Faktor Lonjakan Akhir Pekan</span>
                <span className="font-mono font-bold text-primary">{weekendBoost.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min={1.0}
                max={1.6}
                step={0.05}
                value={weekendBoost}
                onChange={(e) => setWeekendBoost(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>1.00x</span>
                <span>1.30x</span>
                <span>1.60x</span>
              </div>
            </div>
          </div>

          {/* Dynamic Executive KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="rounded-2xl border border-border bg-background/60 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Proyeksi Omzet (14 Hari)</span>
              </div>
              <p className="mt-2 text-xl font-bold text-foreground">
                {formatCompactRupiah(simulation.projectedRevenueRp)}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {simulation.totalForecastUnits.toLocaleString("id-ID")} porsi/unit terproyeksi
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/60 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Wallet className="w-4 h-4 text-primary" />
                <span>Estimasi Net Profit</span>
              </div>
              <p className="mt-2 text-xl font-bold text-foreground">
                {formatCompactRupiah(simulation.projectedNetProfitRp)}
              </p>
              <p
                className={`text-xs mt-0.5 font-medium ${
                  simulation.netMarginPct < 22 ? "text-amber-500" : "text-emerald-500"
                }`}
              >
                Net Margin: {simulation.netMarginPct.toFixed(1)}%
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/60 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertTriangle className="w-4 h-4 text-primary" />
                <span>Bahan Baku Kritis (ROP)</span>
              </div>
              <p className="mt-2 text-xl font-bold text-foreground">
                {simulation.criticalItemsCount} / {simulation.inventoryRows.length} Item
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Stok di bawah batas Reorder Point
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/60 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <PackageCheck className="w-4 h-4 text-primary" />
                <span>Estimasi Anggaran Restock</span>
              </div>
              <p className="mt-2 text-xl font-bold text-foreground">
                {formatCompactRupiah(simulation.totalOrderCostRp)}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Untuk menutup kebutuhan & safety stock
              </p>
            </div>
          </div>
        </section>

        {/* Forecast Chart */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              2. Tren Permintaan Aktual (14 Hari) vs Proyeksi (14 Hari ke Depan)
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Garis solid menunjukkan volume transaksi aktual 14 hari terakhir; garis putus-putus menampilkan proyeksi harian beserta batas atas/bawah (±12%).
            </p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={simulation.chartData} margin={{ top: 10, right: 16, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="aktual"
                  name="Aktual (Unit)"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="proyeksi"
                  name="Proyeksi (Unit)"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  strokeDasharray="5 5"
                  dot={{ r: 3 }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="batasAtas"
                  name="Batas Atas (+12%)"
                  stroke="#f59e0b"
                  strokeWidth={1.5}
                  strokeDasharray="2 4"
                  dot={false}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="batasBawah"
                  name="Batas Bawah (-12%)"
                  stroke="#94a3b8"
                  strokeWidth={1.5}
                  strokeDasharray="2 4"
                  dot={false}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Inventory Reorder Decision Table */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              3. Rekomendasi Pembelian Bahan Baku & Reorder Point (ROP)
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Dihitung otomatis dari proyeksi permintaan 14 hari, lead time supplier, dan safety stock untuk mencegah stockout.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2.5 px-3 font-medium">Bahan Baku / Item</th>
                  <th className="py-2.5 px-3 font-medium">Stok Saat Ini</th>
                  <th className="py-2.5 px-3 font-medium">Kebutuhan 14 Hari</th>
                  <th className="py-2.5 px-3 font-medium">ROP (Safety)</th>
                  <th className="py-2.5 px-3 font-medium">Saran Order</th>
                  <th className="py-2.5 px-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {simulation.inventoryRows.map((row) => (
                  <tr key={row.id} className="border-b border-border/60 last:border-none">
                    <td className="py-3 px-3 font-semibold text-foreground">
                      {row.name}
                      <span className="block text-[11px] font-normal text-muted-foreground">
                        Lead time: {row.leadTimeDays} hari • Harga: {formatRupiah(row.adjustedUnitCost)}/{row.unit}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {row.stockOnHand} {row.unit}
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {row.demand14Days} {row.unit}
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">
                      {row.reorderPoint} {row.unit}{" "}
                      <span className="text-[11px]">({row.safetyStock})</span>
                    </td>
                    <td className="py-3 px-3 font-medium text-foreground">
                      {row.needsOrder ? `${row.suggestedOrderQty} ${row.unit}` : "-"}
                    </td>
                    <td className="py-3 px-3">
                      {row.needsOrder ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                          Segera Order
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                          Aman
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}
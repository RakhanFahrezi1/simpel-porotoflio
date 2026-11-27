"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  ArrowLeft,
  Calculator,
  CheckCircle2,
  Percent,
  RotateCcw,
  ShieldAlert,
  Sliders,
  Target,
  TrendingUp,
} from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface BusinessPreset {
  id: string
  badge: string
  name: string
  description: string
  basePrice: number
  cogsPerUnit: number
  channelFeePct: number
  baseMonthlyUnits: number
  fixedCostMonthly: number
  priceElasticity: number
}

const BUSINESS_PRESETS: BusinessPreset[] = [
  {
    id: "fnb-bundle",
    badge: "F&B Dine-In & Delivery",
    name: "Paket Ayam Bakar & Nasi (Resto Sunda)",
    description:
      "Simulasi penetapan harga menu utama dengan komisi platform delivery & food cost bahan baku.",
    basePrice: 38000,
    cogsPerUnit: 14500,
    channelFeePct: 18,
    baseMonthlyUnits: 3200,
    fixedCostMonthly: 28000000,
    priceElasticity: 1.35,
  },
  {
    id: "ecommerce-fashion",
    badge: "E-Commerce & Marketplace",
    name: "Produk Skincare / Apparel Best-Seller",
    description:
      "Uji dampak diskon kampanye tanggal kembar terhadap margin kontribusi setelah biaya admin & iklan.",
    basePrice: 165000,
    cogsPerUnit: 62000,
    channelFeePct: 12,
    baseMonthlyUnits: 1450,
    fixedCostMonthly: 35000000,
    priceElasticity: 1.65,
  },
  {
    id: "retail-fmcg",
    badge: "Retail & FMCG",
    name: "Kopi Kemasan 1 Liter (B2C & Reseller)",
    description:
      "Optimasi harga jual untuk menjaga volume repeat order tanpa menggerus gross margin.",
    basePrice: 85000,
    cogsPerUnit: 34000,
    channelFeePct: 8,
    baseMonthlyUnits: 2100,
    fixedCostMonthly: 24000000,
    priceElasticity: 1.15,
  },
]

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.round(value))

const formatCompactRupiah = (value: number) => {
  const abs = Math.abs(value)
  const sign = value < 0 ? "-" : ""
  if (abs >= 1_000_000_000) return `${sign}Rp ${(abs / 1_000_000_000).toFixed(1)}M`
  if (abs >= 1_000_000) return `${sign}Rp ${(abs / 1_000_000).toFixed(1)}jt`
  if (abs >= 1_000) return `${sign}Rp ${(abs / 1_000).toFixed(0)}rb`
  return `${sign}Rp ${abs}`
}

export default function PricingSimulatorPage() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(BUSINESS_PRESETS[0].id)

  const [basePrice, setBasePrice] = useState<number>(BUSINESS_PRESETS[0].basePrice)
  const [cogsPerUnit, setCogsPerUnit] = useState<number>(BUSINESS_PRESETS[0].cogsPerUnit)
  const [channelFeePct, setChannelFeePct] = useState<number>(
    BUSINESS_PRESETS[0].channelFeePct
  )
  const [baseMonthlyUnits, setBaseMonthlyUnits] = useState<number>(
    BUSINESS_PRESETS[0].baseMonthlyUnits
  )
  const [fixedCostMonthly, setFixedCostMonthly] = useState<number>(
    BUSINESS_PRESETS[0].fixedCostMonthly
  )
  const [priceElasticity, setPriceElasticity] = useState<number>(
    BUSINESS_PRESETS[0].priceElasticity
  )

  // Variabel simulasi What-If
  const [priceChangePct, setPriceChangePct] = useState<number>(0)
  const [promoDiscountPct, setPromoDiscountPct] = useState<number>(0)

  const applyPreset = (preset: BusinessPreset) => {
    setSelectedPresetId(preset.id)
    setBasePrice(preset.basePrice)
    setCogsPerUnit(preset.cogsPerUnit)
    setChannelFeePct(preset.channelFeePct)
    setBaseMonthlyUnits(preset.baseMonthlyUnits)
    setFixedCostMonthly(preset.fixedCostMonthly)
    setPriceElasticity(preset.priceElasticity)
    setPriceChangePct(0)
    setPromoDiscountPct(0)
  }

  const metrics = useMemo(() => {
    // Baseline (sebelum perubahan harga & promo)
    const baseFeePerUnit = basePrice * (channelFeePct / 100)
    const baseContributionPerUnit = basePrice - cogsPerUnit - baseFeePerUnit
    const baseRevenue = basePrice * baseMonthlyUnits
    const baseGrossProfit = baseContributionPerUnit * baseMonthlyUnits
    const baseNetProfit = baseGrossProfit - fixedCostMonthly
    const baseMarginPct =
      basePrice > 0 ? (baseContributionPerUnit / basePrice) * 100 : 0

    // Skenario Simulasi
    const listPriceAfterAdjustment = basePrice * (1 + priceChangePct / 100)
    const effectiveSellingPrice =
      listPriceAfterAdjustment * (1 - promoDiscountPct / 100)

    const netPriceDeltaRatio =
      basePrice > 0 ? (effectiveSellingPrice - basePrice) / basePrice : 0

    // Model elastisitas harga permintaan: %ΔQ = -Elasticity * %ΔP
    const demandMultiplier = Math.max(0.05, 1 - priceElasticity * netPriceDeltaRatio)
    const simulatedUnits = Math.round(baseMonthlyUnits * demandMultiplier)

    const simFeePerUnit = effectiveSellingPrice * (channelFeePct / 100)
    const simContributionPerUnit =
      effectiveSellingPrice - cogsPerUnit - simFeePerUnit

    const simRevenue = effectiveSellingPrice * simulatedUnits
    const simGrossProfit = simContributionPerUnit * simulatedUnits
    const simNetProfit = simGrossProfit - fixedCostMonthly
    const simMarginPct =
      effectiveSellingPrice > 0
        ? (simContributionPerUnit / effectiveSellingPrice) * 100
        : 0

    // Break-even unit untuk mempertahankan Gross Profit awal
    const requiredUnitsToMatchBaseProfit =
      simContributionPerUnit > 0
        ? Math.ceil(baseGrossProfit / simContributionPerUnit)
        : Infinity

    const requiredVolumeLiftPct =
      Number.isFinite(requiredUnitsToMatchBaseProfit) && baseMonthlyUnits > 0
        ? ((requiredUnitsToMatchBaseProfit - baseMonthlyUnits) / baseMonthlyUnits) * 100
        : Infinity

    // Break-even menutup Fixed Cost bulanan
    const breakEvenUnitsFixedCost =
      simContributionPerUnit > 0
        ? Math.ceil(fixedCostMonthly / simContributionPerUnit)
        : Infinity

    const netProfitDelta = simNetProfit - baseNetProfit
    const netProfitDeltaPct =
      baseNetProfit !== 0 ? (netProfitDelta / Math.abs(baseNetProfit)) * 100 : 0

    return {
      baseRevenue,
      baseGrossProfit,
      baseNetProfit,
      baseContributionPerUnit,
      baseMarginPct,
      effectiveSellingPrice,
      simulatedUnits,
      simContributionPerUnit,
      simRevenue,
      simGrossProfit,
      simNetProfit,
      simMarginPct,
      netProfitDelta,
      netProfitDeltaPct,
      requiredUnitsToMatchBaseProfit,
      requiredVolumeLiftPct,
      breakEvenUnitsFixedCost,
    }
  }, [
    basePrice,
    cogsPerUnit,
    channelFeePct,
    baseMonthlyUnits,
    fixedCostMonthly,
    priceElasticity,
    priceChangePct,
    promoDiscountPct,
  ])

  // Kurva sensitivitas dari perubahan harga efektif -30% s.d. +35%
  const sensitivityCurve = useMemo(() => {
    const steps = [-30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35]
    return steps.map((deltaPct) => {
      const pricePoint = basePrice * (1 + deltaPct / 100)
      const ratio = deltaPct / 100
      const units = Math.max(
        0,
        Math.round(baseMonthlyUnits * Math.max(0.05, 1 - priceElasticity * ratio))
      )
      const contrib = pricePoint - cogsPerUnit - pricePoint * (channelFeePct / 100)
      const revenue = pricePoint * units
      const netProfit = contrib * units - fixedCostMonthly

      return {
        label: `${deltaPct > 0 ? "+" : ""}${deltaPct}%`,
        deltaPct,
        pricePoint: Math.round(pricePoint),
        units,
        revenue: Math.round(revenue),
        netProfit: Math.round(netProfit),
      }
    })
  }, [
    basePrice,
    baseMonthlyUnits,
    priceElasticity,
    cogsPerUnit,
    channelFeePct,
    fixedCostMonthly,
  ])

  const optimalPoint = useMemo(() => {
    return sensitivityCurve.reduce(
      (best, cur) => (cur.netProfit > best.netProfit ? cur : best),
      sensitivityCurve[0]
    )
  }, [sensitivityCurve])

  const decisionVerdict = useMemo(() => {
    if (metrics.simContributionPerUnit <= 0) {
      return {
        status: "Rugi per Unit — Tolak Skenario",
        tone: "danger" as const,
        summary: `Harga jual efektif (${formatRupiah(
          metrics.effectiveSellingPrice
        )}) lebih rendah dari HPP + biaya channel. Setiap transaksi justru menambah kerugian sebesar ${formatRupiah(
          Math.abs(metrics.simContributionPerUnit)
        )} per unit.`,
        action:
          "Turunkan persentase diskon atau naikkan harga dasar minimal di atas titik impas variabel.",
      }
    }

    if (metrics.netProfitDelta > 0 && metrics.simNetProfit > 0) {
      return {
        status: "Layak Eksekusi — Profit Meningkat",
        tone: "positive" as const,
        summary: `Skenario ini diproyeksikan menaikkan laba bersih bulanan sebesar ${formatRupiah(
          metrics.netProfitDelta
        )} (${metrics.netProfitDeltaPct >= 0 ? "+" : ""}${metrics.netProfitDeltaPct.toFixed(
          1
        )}%) dengan estimasi volume ${metrics.simulatedUnits.toLocaleString("id-ID")} unit.`,
        action:
          "Terapkan secara bertahap (A/B pricing test pada 20–30% trafik/outlet) sambil memantau realisasi elastisitas.",
      }
    }

    if (metrics.simNetProfit > 0 && metrics.netProfitDelta <= 0) {
      return {
        status: "Margin Tertekan — Perlu Target Volume Tambahan",
        tone: "warning" as const,
        summary: `Bisnis masih membukukan laba bersih ${formatRupiah(
          metrics.simNetProfit
        )}, namun lebih rendah ${formatRupiah(
          Math.abs(metrics.netProfitDelta)
        )} dibanding baseline karena kenaikan volume belum menutup potongan harga/diskon.`,
        action: Number.isFinite(metrics.requiredVolumeLiftPct)
          ? `Wajib mendorong kenaikan volume minimal +${metrics.requiredVolumeLiftPct.toFixed(
              1
            )}% (${metrics.requiredUnitsToMatchBaseProfit.toLocaleString(
              "id-ID"
            )} unit) atau bundel dengan produk bermargin tinggi.`
          : "Batasi kuota promo hanya untuk akuisisi pelanggan baru.",
      }
    }

    return {
      status: "Di Bawah Titik Impas Operasional",
      tone: "danger" as const,
      summary: `Kontribusi margin (${formatRupiah(
        metrics.simGrossProfit
      )}) belum cukup menutup biaya tetap bulanan sebesar ${formatRupiah(
        fixedCostMonthly
      )}.`,
      action: `Perlu minimal ${
        Number.isFinite(metrics.breakEvenUnitsFixedCost)
          ? metrics.breakEvenUnitsFixedCost.toLocaleString("id-ID")
          : "-"
      } unit terjual per bulan untuk mencapai Break-Even Point (BEP).`,
    }
  }, [metrics, fixedCostMonthly])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
          {/* Top Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Daftar Proyek</span>
            </Link>
            <Badge className="bg-primary/15 text-primary border border-primary/30">
              Pricing Strategy • Price Elasticity • Unit Economics &amp; BEP
            </Badge>
          </div>

          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Pricing, Promo Elasticity &amp;{" "}
              <span className="gradient-text">Unit Economics Simulator</span>
            </h1>
            <p className="text-base text-foreground/80 max-w-3xl leading-relaxed">
              Simulator pengambilan keputusan bisnis untuk menguji dampak{" "}
              <strong>penyesuaian harga jual</strong>,{" "}
              <strong>diskon kampanye promo</strong>, dan{" "}
              <strong>struktur biaya (COGS &amp; komisi channel)</strong> terhadap{" "}
              <em>contribution margin</em>, titik impas (<em>break-even</em>), dan laba
              bersih bulanan.
            </p>
          </div>

          {/* 1. Pilih Studi Kasus Bisnis */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                <h2 className="text-base font-bold text-foreground">
                  1. Pilih Studi Kasus Unit Economics Bisnis
                </h2>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const current =
                    BUSINESS_PRESETS.find((p) => p.id === selectedPresetId) ||
                    BUSINESS_PRESETS[0]
                  applyPreset(current)
                }}
                className="rounded-xl gap-1.5 text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Baseline</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {BUSINESS_PRESETS.map((preset) => {
                const active = preset.id === selectedPresetId
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className={`text-left p-4 rounded-xl border transition-all space-y-1.5 ${
                      active
                        ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                        : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    <Badge variant={active ? "default" : "secondary"} className="text-[10px]">
                      {preset.badge}
                    </Badge>
                    <p className="text-sm font-bold text-foreground">{preset.name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {preset.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Panel Kontrol What-If & Parameter Biaya */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Slider Skenario Harga & Promo */}
            <div className="lg:col-span-6 p-6 rounded-2xl border border-border bg-card space-y-5">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-primary" />
                <h2 className="text-base font-bold text-foreground">
                  2. Simulasi What-If Harga &amp; Promo
                </h2>
              </div>

              <div className="space-y-4">
                {/* Slider Penyesuaian Harga Dasar */}
                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-foreground">
                      Penyesuaian Harga Jual Dasar
                    </span>
                    <span className="font-bold text-primary">
                      {priceChangePct > 0 ? `+${priceChangePct}%` : `${priceChangePct}%`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-25}
                    max={30}
                    step={1}
                    value={priceChangePct}
                    onChange={(e) => setPriceChangePct(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>-25% (Turun Harga)</span>
                    <span>0% (Baseline)</span>
                    <span>+30% (Naik Harga)</span>
                  </div>
                </div>

                {/* Slider Diskon Promo */}
                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-foreground">
                      Diskon Kampanye / Voucher Promo
                    </span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      -{promoDiscountPct}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    step={1}
                    value={promoDiscountPct}
                    onChange={(e) => setPromoDiscountPct(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>0% (Tanpa Promo)</span>
                    <span>20%</span>
                    <span>40% (Flash Sale)</span>
                  </div>
                </div>

                {/* Slider Elastisitas Harga */}
                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-foreground">
                      Sensitivitas Pelanggan (Price Elasticity)
                    </span>
                    <span className="font-bold text-foreground">
                      {priceElasticity.toFixed(2)}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={2.5}
                    step={0.05}
                    value={priceElasticity}
                    onChange={(e) => setPriceElasticity(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>0.50 (Inelastis / Loyal)</span>
                    <span>1.35 (Moderat)</span>
                    <span>2.50 (Sangat Sensitif Harga)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Parameter Unit Economics */}
            <div className="lg:col-span-6 p-6 rounded-2xl border border-border bg-card space-y-5">
              <div className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-primary" />
                <h2 className="text-base font-bold text-foreground">
                  3. Struktur Biaya &amp; Baseline Operasional
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Harga Jual Normal (Rp / unit)
                  </label>
                  <input
                    type="number"
                    min={1000}
                    step={1000}
                    value={basePrice}
                    onChange={(e) => setBasePrice(Math.max(1000, Number(e.target.value)))}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm font-semibold text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    COGS / HPP per Unit (Rp)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={cogsPerUnit}
                    onChange={(e) => setCogsPerUnit(Math.max(0, Number(e.target.value)))}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm font-semibold text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Komisi Channel / Payment Fee (%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={60}
                    step={1}
                    value={channelFeePct}
                    onChange={(e) =>
                      setChannelFeePct(Math.min(60, Math.max(0, Number(e.target.value))))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm font-semibold text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Volume Baseline (Unit / Bulan)
                  </label>
                  <input
                    type="number"
                    min={10}
                    step={50}
                    value={baseMonthlyUnits}
                    onChange={(e) =>
                      setBaseMonthlyUnits(Math.max(10, Number(e.target.value)))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm font-semibold text-foreground"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Biaya Tetap Operasional / Fixed Cost (Rp / Bulan)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={500000}
                    value={fixedCostMonthly}
                    onChange={(e) =>
                      setFixedCostMonthly(Math.max(0, Number(e.target.value)))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm font-semibold text-foreground"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-muted/60 border border-border/60 text-xs text-foreground/85 flex flex-wrap items-center justify-between gap-2">
                <span>
                  Titik Optimal Kurva Harga:{" "}
                  <strong className="text-primary">
                    {optimalPoint.label} ({formatRupiah(optimalPoint.pricePoint)})
                  </strong>
                </span>
                <span>
                  Potensi Laba Maksimal:{" "}
                  <strong>{formatRupiah(optimalPoint.netProfit)}/bln</strong>
                </span>
              </div>
            </div>
          </div>

          {/* 4. KPI Executive Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-border bg-card space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Harga Efektif &amp; Margin/Unit
              </p>
              <p className="text-xl font-bold text-foreground">
                {formatRupiah(metrics.effectiveSellingPrice)}
              </p>
              <p className="text-xs text-muted-foreground">
                Kontribusi:{" "}
                <strong
                  className={
                    metrics.simContributionPerUnit >= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-500"
                  }
                >
                  {formatRupiah(metrics.simContributionPerUnit)} ({metrics.simMarginPct.toFixed(1)}%)
                </strong>
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Proyeksi Volume &amp; Omzet
              </p>
              <p className="text-xl font-bold gradient-text">
                {metrics.simulatedUnits.toLocaleString("id-ID")} unit
              </p>
              <p className="text-xs text-muted-foreground">
                Omzet: <strong>{formatCompactRupiah(metrics.simRevenue)}</strong> / bln
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Proyeksi Laba Bersih (Net)
              </p>
              <p
                className={`text-xl font-bold ${
                  metrics.simNetProfit >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-500"
                }`}
              >
                {formatCompactRupiah(metrics.simNetProfit)}
              </p>
              <p className="text-xs text-muted-foreground">
                vs Baseline:{" "}
                <strong>
                  {metrics.netProfitDelta >= 0 ? "+" : ""}
                  {formatCompactRupiah(metrics.netProfitDelta)}
                </strong>
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Syarat Break-Even Promo
              </p>
              <p className="text-xl font-bold text-foreground">
                {Number.isFinite(metrics.requiredUnitsToMatchBaseProfit)
                  ? `${metrics.requiredUnitsToMatchBaseProfit.toLocaleString("id-ID")} unit`
                  : "Tidak Tercapai"}
              </p>
              <p className="text-xs text-muted-foreground">
                BEP Fixed Cost:{" "}
                <strong>
                  {Number.isFinite(metrics.breakEvenUnitsFixedCost)
                    ? `${metrics.breakEvenUnitsFixedCost.toLocaleString("id-ID")} unit`
                    : "-"}
                </strong>
              </p>
            </div>
          </div>

          {/* 5. Rekomendasi Keputusan Bisnis */}
          <div
            className={`p-6 rounded-2xl border space-y-2 ${
              decisionVerdict.tone === "positive"
                ? "border-emerald-500/40 bg-emerald-500/10"
                : decisionVerdict.tone === "warning"
                  ? "border-amber-500/40 bg-amber-500/10"
                  : "border-red-500/40 bg-red-500/10"
            }`}
          >
            <div className="flex items-center gap-2">
              {decisionVerdict.tone === "positive" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : decisionVerdict.tone === "warning" ? (
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-red-500" />
              )}
              <h3 className="text-base font-bold text-foreground">
                Rekomendasi Keputusan: {decisionVerdict.status}
              </h3>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {decisionVerdict.summary}
            </p>
            <p className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5 pt-1">
              <Target className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Tindak Lanjut: {decisionVerdict.action}</span>
            </p>
          </div>

          {/* 6. Grafik Kurva Sensitivitas Profit & Omzet */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">
                  4. Kurva Sensitivitas Harga terhadap Omzet &amp; Laba Bersih Bulanan
                </h3>
              </div>
              <span className="text-xs text-muted-foreground">
                Menunjukkan titik optimal harga sebelum volume tergerus elastisitas
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={sensitivityCurve}
                  margin={{ top: 10, right: 16, left: 8, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(val) => formatCompactRupiah(Number(val))}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      formatRupiah(Number(value)),
                      name,
                    ]}
                  />
                  <Legend />
                  <ReferenceLine y={0} stroke="#888" strokeDasharray="3 3" />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Proyeksi Omzet"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.14}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="netProfit"
                    name="Laba Bersih (Net Profit)"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.24}
                    strokeWidth={2.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
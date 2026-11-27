"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  ArrowLeft,
  Bot,
  CheckCircle2,
  Cpu,
  Database,
  Lightbulb,
  Play,
  SearchCode,
  ShieldCheck,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  ROOT_CAUSE_SCENARIOS,
  runDeterministicRootCauseTools,
  type InvestigationReport,
} from "@/lib/root-cause-engine"

const formatIdr = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.round(value))

const formatCompactIdr = (value: number) => {
  const abs = Math.abs(value)
  const sign = value < 0 ? "-" : ""
  if (abs >= 1_000_000_000) return `${sign}Rp ${(abs / 1_000_000_000).toFixed(1)}M`
  if (abs >= 1_000_000) return `${sign}Rp ${(abs / 1_000_000).toFixed(1)}jt`
  if (abs >= 1_000) return `${sign}Rp ${(abs / 1_000).toFixed(0)}rb`
  return `${sign}Rp ${abs}`
}

export default function RootCauseAgentPage() {
  const [selectedId, setSelectedId] = useState<string>(ROOT_CAUSE_SCENARIOS[0].id)
  const activeScenario = useMemo(
    () =>
      ROOT_CAUSE_SCENARIOS.find((s) => s.id === selectedId) || ROOT_CAUSE_SCENARIOS[0],
    [selectedId]
  )

  const [question, setQuestion] = useState<string>("")
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [report, setReport] = useState<InvestigationReport>(() => ({
    ...runDeterministicRootCauseTools(
      ROOT_CAUSE_SCENARIOS[0].title,
      ROOT_CAUSE_SCENARIOS[0].kpiHeadline,
      ROOT_CAUSE_SCENARIOS[0].rows
    ),
    sourceMode: "deterministic-agent",
  }))

  const handleSelectScenario = (scenarioId: string) => {
    const next =
      ROOT_CAUSE_SCENARIOS.find((s) => s.id === scenarioId) || ROOT_CAUSE_SCENARIOS[0]
    setSelectedId(next.id)
    setQuestion("")
    setReport({
      ...runDeterministicRootCauseTools(next.title, next.kpiHeadline, next.rows),
      sourceMode: "deterministic-agent",
    })
  }

  const handleRunAgent = async () => {
    setIsRunning(true)
    try {
      const effectiveQuestion = question.trim() || activeScenario.defaultQuestion
      const res = await fetch("/api/root-cause-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioTitle: activeScenario.title,
          kpiHeadline: activeScenario.kpiHeadline,
          question: effectiveQuestion,
          rows: activeScenario.rows,
        }),
      })
      if (res.ok) {
        const data = (await res.json()) as InvestigationReport
        setReport(data)
      }
    } finally {
      setIsRunning(false)
    }
  }

  const chartData = useMemo(
    () =>
      activeScenario.rows.map((row) => ({
        label: `${row.period} (${row.dimension})`,
        netProfit: row.netProfit,
        leakage: row.returnsOrWaste + row.adSpend,
      })),
    [activeScenario]
  )

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Daftar Proyek</span>
            </Link>
            <Badge className="bg-primary/15 text-primary border border-primary/30">
              Autonomous AI Agent • Tool Calling • Root-Cause RCA
            </Badge>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Agen AI Investigasi{" "}
              <span className="gradient-text">Root-Cause KPI &amp; Anomali</span>
            </h1>
            <p className="text-base text-foreground/80 max-w-3xl leading-relaxed">
              Agen analitik otonom yang menjalankan <strong>4 langkah investigasi terukur</strong>{" "}
              (deteksi pergeseran laba, isolasi segmen terlemah, audit kebocoran biaya, dan
              validasi integritas data) lalu merangkum keputusan strategis untuk manajemen.
            </p>
          </div>

          {/* 1. Pilih Skenario Anomali */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold text-foreground">
                1. Pilih Kasus Anomali KPI untuk Diinvestigasi
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {ROOT_CAUSE_SCENARIOS.map((sc) => {
                const active = sc.id === selectedId
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => handleSelectScenario(sc.id)}
                    className={`text-left p-4 rounded-xl border transition-all space-y-1.5 ${
                      active
                        ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                        : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    <Badge variant={active ? "default" : "secondary"} className="text-[10px]">
                      {sc.badge}
                    </Badge>
                    <p className="text-sm font-bold text-foreground">{sc.title}</p>
                    <p className="text-xs font-medium text-primary">{sc.kpiHeadline}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {sc.description}
                    </p>
                  </button>
                )
              })}
            </div>

            <div className="pt-2 space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Pertanyaan Investigasi Manajemen
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ketik sapaan ('halo'), pertanyaan analitik, atau tanya apa saja..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground"
                />
                <Button
                  type="button"
                  onClick={handleRunAgent}
                  disabled={isRunning}
                  className="rounded-xl gap-2 font-semibold px-5"
                >
                  <Play className="w-4 h-4" />
                  <span>{isRunning ? "Agent Menyelidiki..." : "Jalankan AI Agent"}</span>
                </Button>
              </div>
            </div>
          </div>

          {/* 2. Executive Memo & Akar Masalah */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 p-6 rounded-2xl border border-border bg-card space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <h2 className="text-base font-bold text-foreground">
                    2. Ringkasan Eksekutif &amp; Akar Masalah Utama
                  </h2>
                </div>
                <Badge variant="outline" className="text-xs">
                  {report.sourceMode === "gemini-ai" ? "Gemini AI Agent" : "Deterministic Tools"}
                </Badge>
              </div>

              <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Root Cause Teridentifikasi (Dampak {formatIdr(report.estimatedImpactIdr)})
                </p>
                <p className="text-sm font-semibold text-foreground leading-relaxed">
                  {report.primaryRootCause}
                </p>
              </div>

              <p className="text-sm text-foreground/85 leading-relaxed">
                {report.executiveSummary}
              </p>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  <span>Rekomendasi Tindakan Prioritas</span>
                </div>
                <ul className="space-y-2">
                  {report.actionItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-foreground/90 bg-background/70 p-3 rounded-xl border border-border/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. Agent Tool Execution Trace */}
            <div className="lg:col-span-5 p-6 rounded-2xl border border-border bg-card space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                <h2 className="text-base font-bold text-foreground">
                  3. Jejak Eksekusi Tool Agent
                </h2>
              </div>

              <div className="space-y-3">
                {report.toolTrace.map((step) => (
                  <div
                    key={step.step}
                    className="p-3.5 rounded-xl border border-border bg-background space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-primary">
                        Step {step.step} • {step.toolName}()
                      </span>
                      <Badge variant="secondary" className="text-[11px]">
                        {step.metricBadge}
                      </Badge>
                    </div>
                    <p className="text-xs font-semibold text-foreground">{step.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.finding}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Grafik Perbandingan Laba Bersih vs Beban Variabel */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h2 className="text-base font-bold text-foreground">
                  4. Perbandingan Net Profit vs Beban Iklan &amp; Retur/Waste per Observasi
                </h2>
              </div>
              <span className="text-xs text-muted-foreground">
                Membantu melihat titik kebocoran margin secara visual
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 16, left: 28, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis
                    width={64}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => formatCompactIdr(Number(v))}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      formatIdr(Number(value)),
                      name,
                    ]}
                  />
                  <Legend />
                  <Bar
                    dataKey="netProfit"
                    name="Net Profit"
                    fill="#10b981"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="leakage"
                    name="Ad Spend + Retur/Waste"
                    fill="#f59e0b"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 5. SQL Query Verifikasi */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <div className="flex items-center gap-2">
              <SearchCode className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold text-foreground">
                5. Kueri SQL Verifikasi Root-Cause
              </h2>
              <Database className="w-4 h-4 text-muted-foreground ml-auto" />
            </div>
            <pre className="p-4 rounded-xl bg-muted/80 border border-border overflow-x-auto text-xs text-foreground leading-relaxed">
              <code>{report.sqlInvestigationQuery}</code>
            </pre>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
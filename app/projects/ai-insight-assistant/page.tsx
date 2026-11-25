"use client"

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Bot,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  Database,
  FileSpreadsheet,
  Lightbulb,
  Play,
  Sparkles,
  Table2,
  Upload,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  executeSqlPreview,
  parseCsvText,
  profileDataset,
  type DatasetSummary,
  type InsightResponse,
} from "@/lib/data-profiler"

export interface AiInsightPayload extends InsightResponse {
  directAnswer?: string
}

const PRESET_DATASETS = [
  {
    label: "E-Commerce Indonesia Sales",
    path: "/datasets/ecommerce-indonesia-sales.csv",
    fileName: "ecommerce-indonesia-sales.csv",
  },
  {
    label: "Digital Marketing Campaign ID",
    path: "/datasets/digital-marketing-campaign-id.csv",
    fileName: "digital-marketing-campaign-id.csv",
  },
]

const EVALUATION_SCENARIOS = [
  {
    badge: "Executive Summary",
    label: "Ringkasan Performa & Temuan Utama",
    question:
      "Berikan ringkasan performa utama, metrik terpenting, dan temuan dominan dari dataset ini.",
  },
  {
    badge: "Data Quality & Anomaly",
    label: "Audit Kualitas Data & Missing Values",
    question:
      "Periksa kualitas data, persentase missing values per kolom, potensi anomali/outlier, dan langkah pembersihan data.",
  },
  {
    badge: "Segment & SQL",
    label: "Perbandingan Kategori/Channel + SQL",
    question:
      "Bandingkan performa antar-kategori atau channel utama, sertakan kueri SQL agregasi yang relevan, dan rekomendasi prioritas.",
  },
  {
    badge: "BI Readiness",
    label: "Checklist Kesiapan Dashboard BI",
    question:
      "Susun checklist kesiapan dataset sebelum masuk ke dashboard BI (KPI utama, dimensi filter, dan potensi jebakan interpretasi).",
  },
]

export default function AiInsightAssistantPage() {
  const [selectedDataset, setSelectedDataset] = useState(PRESET_DATASETS[0].fileName)
  const [rawRows, setRawRows] = useState<Record<string, string | number>[]>([])
  const [summary, setSummary] = useState<DatasetSummary | null>(null)
  const [loadingData, setLoadingData] = useState(true)

  const [question, setQuestion] = useState(EVALUATION_SCENARIOS[0].question)
  const [analyzing, setAnalyzing] = useState(false)
  const [insight, setInsight] = useState<AiInsightPayload | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const [selectedGroupCol, setSelectedGroupCol] = useState<string>("")
  const [selectedMetricCol, setSelectedMetricCol] = useState<string>("")
  const [sqlExecuted, setSqlExecuted] = useState<boolean>(true)
  const [copiedSql, setCopiedSql] = useState<boolean>(false)

  const syncSelectorsFromRows = (rows: Record<string, string | number>[]) => {
    const profiled = profileDataset(rows)
    setRawRows(rows)
    setSummary(profiled)

    const stringCols = profiled.columns.filter((c) => c.type === "string")
    const repeatedCat =
      stringCols.find((c) => (c.topValues?.length ?? 0) > 1) || stringCols[0]

    const firstNum = profiled.columns.find((c) => c.type === "number")?.name || ""
    setSelectedGroupCol(repeatedCat?.name || "")
    setSelectedMetricCol(firstNum)
    setSqlExecuted(true)
  }

  const loadPresetDataset = async (fileName: string, path: string) => {
    setLoadingData(true)
    setErrorMsg(null)
    setInsight(null)
    setSelectedDataset(fileName)

    try {
      const res = await fetch(path)
      if (!res.ok) throw new Error("Gagal memuat file dataset sampel.")
      const text = await res.text()
      const rows = parseCsvText(text)
      syncSelectorsFromRows(rows)
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Terjadi kesalahan saat memuat dataset."
      )
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    loadPresetDataset(PRESET_DATASETS[0].fileName, PRESET_DATASETS[0].path)
  }, [])

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoadingData(true)
    setErrorMsg(null)
    setInsight(null)
    setSelectedDataset(file.name)

    try {
      const text = await file.text()
      const rows = parseCsvText(text)
      if (rows.length === 0) {
        throw new Error("File CSV kosong atau format header tidak terbaca.")
      }
      syncSelectorsFromRows(rows)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Gagal membaca file CSV.")
    } finally {
      setLoadingData(false)
      e.target.value = ""
    }
  }

  const runAnalysis = async (promptText: string) => {
    const trimmedQuestion = promptText.trim()
    if (!trimmedQuestion) return

    setAnalyzing(true)
    setErrorMsg(null)

    try {
      const res = await fetch("/api/analyze-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          datasetName: selectedDataset,
          question: trimmedQuestion,
          summary: summary ?? undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Gagal menjalankan analisis AI.")
      }
      setInsight(data)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan saat analisis.")
    } finally {
      setAnalyzing(false)
    }
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    runAnalysis(question)
  }

  const numericColumns = useMemo(
    () => summary?.columns.filter((c) => c.type === "number") ?? [],
    [summary]
  )

  const categoricalColumns = useMemo(
    () => summary?.columns.filter((c) => c.type === "string") ?? [],
    [summary]
  )

  const totalMissingCells = useMemo(() => {
    if (!summary) return 0
    return summary.columns.reduce((acc, col) => acc + col.missingCount, 0)
  }, [summary])

  const askedForSql = useMemo(() => {
    return /\b(sql|query|kueri|select|cte|window\s+function|join|group\s+by|where|order\s+by)\b/i.test(
      question
    )
  }, [question])

  const sqlPreview = useMemo(() => {
    if (!sqlExecuted || rawRows.length === 0) return null
    return executeSqlPreview(
      rawRows,
      selectedGroupCol || undefined,
      selectedMetricCol || undefined
    )
  }, [sqlExecuted, rawRows, selectedGroupCol, selectedMetricCol])

  const activeSqlQuery = useMemo(() => {
    if (insight?.sqlQuery && insight.sqlQuery.trim().length > 0) {
      return insight.sqlQuery
    }
    const tableName =
      selectedDataset.replace(/\.csv$/i, "").replace(/[^a-zA-Z0-9_]/g, "_") || "dataset"
    if (selectedGroupCol && selectedMetricCol) {
      return `SELECT\n  ${selectedGroupCol},\n  COUNT(*) AS total_rows,\n  ROUND(SUM(${selectedMetricCol}), 2) AS sum_${selectedMetricCol},\n  ROUND(AVG(${selectedMetricCol}), 2) AS avg_${selectedMetricCol}\nFROM ${tableName}\nGROUP BY ${selectedGroupCol}\nORDER BY sum_${selectedMetricCol} DESC\nLIMIT 10;`
    }
    if (selectedGroupCol) {
      return `SELECT\n  ${selectedGroupCol},\n  COUNT(*) AS total_rows\nFROM ${tableName}\nGROUP BY ${selectedGroupCol}\nORDER BY total_rows DESC\nLIMIT 10;`
    }
    return `SELECT COUNT(*) AS total_rows FROM ${tableName};`
  }, [insight?.sqlQuery, selectedDataset, selectedGroupCol, selectedMetricCol])

  const chartData = useMemo(() => {
    if (!sqlPreview || sqlPreview.rows.length === 0) return []
    const valueKey =
      selectedMetricCol && sqlPreview.columns.includes(`sum_${selectedMetricCol}`)
        ? `sum_${selectedMetricCol}`
        : "total_rows"
    const labelKey = selectedGroupCol || "total_rows"

    return sqlPreview.rows.slice(0, 8).map((r) => ({
      name: String(r[labelKey] ?? "-"),
      value: Number(r[valueKey] ?? 0),
    }))
  }, [sqlPreview, selectedGroupCol, selectedMetricCol])

  const chartMetricLabel = useMemo(() => {
    if (selectedMetricCol && sqlPreview?.columns.includes(`sum_${selectedMetricCol}`)) {
      return `Total ${selectedMetricCol}`
    }
    return "Jumlah Baris"
  }, [selectedMetricCol, sqlPreview])

  const handleCopySql = async (textToCopy = activeSqlQuery) => {
    if (!textToCopy) return
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopiedSql(true)
      setTimeout(() => setCopiedSql(false), 1800)
    } catch {
      setCopiedSql(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Daftar Proyek</span>
            </Link>
            <Badge className="bg-primary/15 text-primary border border-primary/30">
              Data Profiling • Recharts • SQL Preview • Gemini AI
            </Badge>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              AI SQL &amp; <span className="gradient-text">BI Insight Assistant</span>
            </h1>
            <p className="text-base text-foreground/80 max-w-3xl leading-relaxed">
              Asisten analitik data interaktif untuk memeriksa{" "}
              <strong>profil &amp; kualitas kolom CSV</strong>, melihat{" "}
              <strong>visualisasi grafik cepat</strong>, menguji{" "}
              <strong>pratinjau kueri SQL</strong>, serta menjawab{" "}
              <strong>pertanyaan analitik, SQL, maupun topik bebas</strong>.
            </p>
          </div>

          {/* 1. Pilih atau Unggah Dataset CSV */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-primary" />
                <h2 className="text-base font-bold text-foreground">
                  1. Pilih atau Unggah Dataset CSV
                </h2>
              </div>
              <span className="text-xs text-muted-foreground">
                Gunakan dataset sampel atau unggah file CSV non-sensitif
              </span>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              {PRESET_DATASETS.map((ds) => {
                const active = selectedDataset === ds.fileName
                return (
                  <Button
                    key={ds.fileName}
                    type="button"
                    variant={active ? "default" : "outline"}
                    size="sm"
                    onClick={() => loadPresetDataset(ds.fileName, ds.path)}
                    className="rounded-xl"
                  >
                    {ds.label}
                  </Button>
                )
              })}

              <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-background hover:border-primary/50 text-xs sm:text-sm font-semibold text-foreground cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-primary" />
                <span>Unggah CSV</span>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {errorMsg && (
            <div className="p-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 flex items-start gap-3 text-sm text-foreground">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Ringkasan KPI Dataset */}
          {loadingData ? (
            <div className="p-8 rounded-2xl border border-border bg-card text-center text-sm text-muted-foreground">
              Membaca dan memproses profil dataset...
            </div>
          ) : summary ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl border border-border bg-card">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Dataset Aktif
                </p>
                <p className="text-base font-bold text-foreground mt-1 truncate">
                  {selectedDataset}
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-border bg-card">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Jumlah Baris Data
                </p>
                <p className="text-2xl font-bold gradient-text mt-1">
                  {summary.rowCount.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-border bg-card">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Kolom Terdeteksi
                </p>
                <p className="text-2xl font-bold gradient-text mt-1">
                  {summary.columnCount}
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-border bg-card">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Missing Cells
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {totalMissingCells.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ) : null}

          {/* 2. Mode Evaluasi / Skenario Bisnis Cepat & Pertanyaan AI */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                <h2 className="text-base font-bold text-foreground">
                  2. Mode Evaluasi Bisnis &amp; Tanya AI
                </h2>
              </div>
              <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                <ClipboardCheck className="w-3.5 h-3.5 text-primary" />
                Klik skenario atau ketik pertanyaan bebas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {EVALUATION_SCENARIOS.map((sc) => (
                <button
                  key={sc.badge}
                  type="button"
                  onClick={() => {
                    setQuestion(sc.question)
                    runAnalysis(sc.question)
                  }}
                  disabled={analyzing}
                  className="text-left p-3.5 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors space-y-1 disabled:opacity-50"
                >
                  <Badge variant="secondary" className="text-[10px]">
                    {sc.badge}
                  </Badge>
                  <p className="text-xs font-semibold text-foreground leading-snug">
                    {sc.label}
                  </p>
                </button>
              ))}
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Tanyakan apa saja: analisis CSV, kode SQL, konsep BI, atau topik umum..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <Button
                type="submit"
                disabled={analyzing || !question.trim()}
                className="rounded-xl gap-2 font-semibold"
              >
                <Sparkles className="w-4 h-4" />
                <span>{analyzing ? "Menganalisis..." : "Generate Insight"}</span>
              </Button>
            </form>
          </div>

          {/* Hasil Analisis AI */}
          {insight && (
            <div className="space-y-6">
              {/* Kartu Jawaban Langsung & Kueri SQL */}
              <div className="p-6 rounded-2xl border border-primary/30 bg-card space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">
                      Jawaban AI
                    </h3>
                  </div>
                  <Badge variant="secondary" className="text-[11px]">
                    {insight.sourceMode === "gemini-ai"
                      ? "Gemini AI"
                      : "Statistical Summary"}
                  </Badge>
                </div>

                {insight.directAnswer && (
                  <p className="text-sm sm:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                    {insight.directAnswer}
                  </p>
                )}

                {askedForSql && insight.sqlQuery && insight.sqlQuery.trim().length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-border/60">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-muted-foreground">
                        Kueri SQL yang Dihasilkan
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopySql(insight.sqlQuery)}
                        className="rounded-xl gap-1.5 text-xs h-7"
                      >
                        {copiedSql ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy SQL</span>
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="p-3.5 rounded-xl bg-muted text-foreground text-xs overflow-x-auto leading-relaxed">
                      <code>{insight.sqlQuery}</code>
                    </pre>
                  </div>
                )}
              </div>

              {/* Detail Key Insights, Kualitas Data & Rekomendasi */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Key Insights</h3>
                  </div>
                  <ul className="space-y-2.5 text-sm text-foreground/85 leading-relaxed">
                    {insight.keyInsights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      <h3 className="text-base font-bold text-foreground">
                        Kualitas &amp; Catatan Data
                      </h3>
                    </div>
                    <ul className="space-y-1.5 text-sm text-foreground/80">
                      {insight.dataQualityNotes.map((note, idx) => (
                        <li key={idx}>• {note}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-border/60">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      <h3 className="text-base font-bold text-foreground">Rekomendasi Bisnis</h3>
                    </div>
                    <ul className="space-y-1.5 text-sm text-foreground/80">
                      {insight.businessRecommendations.map((rec, idx) => (
                        <li key={idx}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Visualisasi Grafik Dinamis (Recharts) & Pratinjau Eksekusi SQL */}
          {summary && summary.rowCount > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Grafik Recharts */}
              <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <h3 className="text-base font-bold text-foreground">
                      3. Visualisasi Distribusi Cepat (Recharts)
                    </h3>
                  </div>
                  <span className="text-xs text-muted-foreground">{chartMetricLabel}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Dimensi Kategori (GROUP BY)
                    </label>
                    <select
                      value={selectedGroupCol}
                      onChange={(e) => {
                        setSelectedGroupCol(e.target.value)
                        setSqlExecuted(true)
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs sm:text-sm text-foreground"
                    >
                      <option value="">(Tanpa GROUP BY)</option>
                      {categoricalColumns.map((col) => (
                        <option key={col.name} value={col.name}>
                          {col.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Metrik Numerik (SUM / AVG)
                    </label>
                    <select
                      value={selectedMetricCol}
                      onChange={(e) => {
                        setSelectedMetricCol(e.target.value)
                        setSqlExecuted(true)
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs sm:text-sm text-foreground"
                    >
                      <option value="">COUNT(*) Saja</option>
                      {numericColumns.map((col) => (
                        <option key={col.name} value={col.name}>
                          {col.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="h-64 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 8, right: 12, left: 4, bottom: 28 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11 }}
                        interval={0}
                        angle={-15}
                        textAnchor="end"
                      />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar
                        dataKey="value"
                        fill="currentColor"
                        className="text-primary"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Kueri SQL + Eksekutor Hasil */}
              <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-primary" />
                    <h3 className="text-base font-bold text-foreground">
                      4. SQL Query &amp; Pratinjau Hasil
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopySql(activeSqlQuery)}
                      className="rounded-xl gap-1.5 text-xs"
                    >
                      {copiedSql ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy SQL</span>
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => setSqlExecuted(true)}
                      className="rounded-xl gap-1.5 text-xs"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Run Preview</span>
                    </Button>
                  </div>
                </div>

                <pre className="p-3.5 rounded-xl bg-muted text-foreground text-xs overflow-x-auto leading-relaxed">
                  <code>{activeSqlQuery}</code>
                </pre>

                {sqlPreview && sqlPreview.rows.length > 0 && (
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-border bg-muted/60">
                          {sqlPreview.columns.map((col) => (
                            <th
                              key={col}
                              className="px-3 py-2 font-semibold text-foreground"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sqlPreview.rows.map((r, rIdx) => (
                          <tr
                            key={rIdx}
                            className="border-b border-border/50 last:border-0"
                          >
                            {sqlPreview.columns.map((col) => {
                              const val = r[col]
                              const formatted =
                                typeof val === "number"
                                  ? val.toLocaleString("id-ID")
                                  : String(val ?? "-")
                              return (
                                <td
                                  key={col}
                                  className="px-3 py-2 text-foreground/85"
                                >
                                  {formatted}
                                </td>
                              )
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 5. Tabel Profil Kolom & Kesehatan Data */}
          {summary && summary.columns.length > 0 && (
            <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Table2 className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-bold text-foreground">
                    5. Profil Kolom, Missing Values &amp; Statistik Dasar
                  </h3>
                </div>
                <span className="text-xs text-muted-foreground">
                  Otomatis dihitung dari {summary.rowCount.toLocaleString("id-ID")} baris aktif
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/60">
                      <th className="px-4 py-2.5 font-semibold text-foreground">
                        Nama Kolom
                      </th>
                      <th className="px-4 py-2.5 font-semibold text-foreground">Tipe</th>
                      <th className="px-4 py-2.5 font-semibold text-foreground">
                        Missing
                      </th>
                      <th className="px-4 py-2.5 font-semibold text-foreground">
                        Ringkasan Statistik / Nilai Dominan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.columns.map((col) => (
                      <tr
                        key={col.name}
                        className="border-b border-border/50 last:border-0 hover:bg-muted/30"
                      >
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          {col.name}
                        </td>
                        <td className="px-4 py-2.5">
                          <Badge variant="outline" className="text-[11px]">
                            {col.type}
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5 text-foreground/80">
                          {col.missingCount} ({col.missingRate})
                        </td>
                        <td className="px-4 py-2.5 text-foreground/80">
                          {col.type === "number" ? (
                            <span>
                              Min: <strong>{col.min?.toLocaleString("id-ID")}</strong> • Max:{" "}
                              <strong>{col.max?.toLocaleString("id-ID")}</strong> • Mean:{" "}
                              <strong>{col.mean?.toLocaleString("id-ID")}</strong>
                            </span>
                          ) : (
                            <span>
                              {col.topValues
                                ?.map((tv) => `${tv.value} (${tv.count})`)
                                .join(", ") || "-"}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
export interface ColumnProfile {
  name: string
  type: "number" | "string"
  missingCount: number
  missingRate: string
  min?: number
  max?: number
  mean?: number
  topValues?: { value: string; count: number }[]
}

export interface DatasetSummary {
  rowCount: number
  columnCount: number
  columns: ColumnProfile[]
  sampleRows: Record<string, string | number>[]
}

export interface InsightResponse {
  sqlQuery: string
  keyInsights: string[]
  dataQualityNotes: string[]
  businessRecommendations: string[]
  sourceMode?: "gemini-ai" | "statistical-fallback"
}

export interface SqlExecutionResult {
  columns: string[]
  rows: Record<string, string | number>[]
  groupedByColumn?: string
  metricColumn?: string
}

export function parseCsvText(csvText: string): Record<string, string | number>[] {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  if (lines.length < 2) return []

  const delimiter = lines[0].includes(";") && !lines[0].includes(",") ? ";" : ","

  const splitRow = (row: string): string[] => {
    const result: string[] = []
    let current = ""
    let inQuotes = false

    for (let i = 0; i < row.length; i++) {
      const char = row[i]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === delimiter && !inQuotes) {
        result.push(current.trim())
        current = ""
      } else {
        current += char
      }
    }
    result.push(current.trim())
    return result
  }

  const headers = splitRow(lines[0]).map((h, idx) => h || `column_${idx + 1}`)

  return lines.slice(1).map((line) => {
    const cells = splitRow(line)
    const record: Record<string, string | number> = {}
    headers.forEach((header, idx) => {
      const raw = cells[idx] ?? ""
      const cleanedNum = raw.replace(/,/g, "")
      const parsedNum = Number(cleanedNum)
      if (raw !== "" && !Number.isNaN(parsedNum) && Number.isFinite(parsedNum)) {
        record[header] = parsedNum
      } else {
        record[header] = raw
      }
    })
    return record
  })
}

export function profileDataset(rows: Record<string, string | number>[]): DatasetSummary {
  if (!rows || rows.length === 0) {
    return { rowCount: 0, columnCount: 0, columns: [], sampleRows: [] }
  }

  const headers = Object.keys(rows[0])
  const rowCount = rows.length

  const columns: ColumnProfile[] = headers.map((col) => {
    const values = rows.map((r) => r[col])
    const nonEmpty = values.filter(
      (v) => v !== null && v !== undefined && String(v).trim() !== ""
    )
    const missingCount = rowCount - nonEmpty.length
    const missingRate = `${((missingCount / rowCount) * 100).toFixed(1)}%`

    const numericValues = nonEmpty
      .map((v) => Number(v))
      .filter((n) => !Number.isNaN(n) && Number.isFinite(n))

    const isNumeric = nonEmpty.length > 0 && numericValues.length / nonEmpty.length >= 0.8

    if (isNumeric && numericValues.length > 0) {
      const min = Math.min(...numericValues)
      const max = Math.max(...numericValues)
      const avg = numericValues.reduce((acc, cur) => acc + cur, 0) / numericValues.length
      const mean = Number(avg.toFixed(2))
      return {
        name: col,
        type: "number",
        missingCount,
        missingRate,
        min,
        max,
        mean,
      }
    }

    const freq: Record<string, number> = {}
    nonEmpty.forEach((v) => {
      const key = String(v)
      freq[key] = (freq[key] || 0) + 1
    })

    const topValues = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([value, count]) => ({ value, count }))

    return {
      name: col,
      type: "string",
      missingCount,
      missingRate,
      topValues,
    }
  })

  return {
    rowCount,
    columnCount: headers.length,
    columns,
    sampleRows: rows.slice(0, 5),
  }
}

export function executeSqlPreview(
  rows: Record<string, string | number>[],
  groupCol?: string,
  metricCol?: string
): SqlExecutionResult {
  if (!rows || rows.length === 0) {
    return { columns: [], rows: [] }
  }

  if (!groupCol) {
    const numVals = metricCol
      ? rows
          .map((r) => Number(r[metricCol]))
          .filter((n) => !Number.isNaN(n) && Number.isFinite(n))
      : []
    const totalSum = numVals.reduce((acc, cur) => acc + cur, 0)
    const totalAvg = numVals.length > 0 ? Number((totalSum / numVals.length).toFixed(2)) : 0

    return {
      columns: metricCol
        ? ["total_rows", `sum_${metricCol}`, `avg_${metricCol}`]
        : ["total_rows"],
      rows: [
        metricCol
          ? {
              total_rows: rows.length,
              [`sum_${metricCol}`]: Number(totalSum.toFixed(2)),
              [`avg_${metricCol}`]: totalAvg,
            }
          : { total_rows: rows.length },
      ],
      metricColumn: metricCol,
    }
  }

  const buckets: Record<
    string,
    { count: number; sum: number; numCount: number }
  > = {}

  rows.forEach((row) => {
    const rawKey = row[groupCol]
    const key =
      rawKey === null || rawKey === undefined || String(rawKey).trim() === ""
        ? "(Kosong / Null)"
        : String(rawKey)

    if (!buckets[key]) {
      buckets[key] = { count: 0, sum: 0, numCount: 0 }
    }
    buckets[key].count += 1

    if (metricCol) {
      const val = Number(row[metricCol])
      if (!Number.isNaN(val) && Number.isFinite(val)) {
        buckets[key].sum += val
        buckets[key].numCount += 1
      }
    }
  })

  const metricKey = metricCol ? `sum_${metricCol}` : "total_rows"
  const avgKey = metricCol ? `avg_${metricCol}` : ""

  const sortedRows = Object.entries(buckets)
    .map(([key, stats]) => {
      const sumRounded = Number(stats.sum.toFixed(2))
      const avgRounded =
        stats.numCount > 0 ? Number((stats.sum / stats.numCount).toFixed(2)) : 0

      if (metricCol) {
        return {
          [groupCol]: key,
          total_rows: stats.count,
          [metricKey]: sumRounded,
          [avgKey]: avgRounded,
        }
      }

      return {
        [groupCol]: key,
        total_rows: stats.count,
      }
    })
    .sort((a, b) => {
      const valA = Number(metricCol ? a[metricKey] : a.total_rows)
      const valB = Number(metricCol ? b[metricKey] : b.total_rows)
      return valB - valA
    })
    .slice(0, 10)

  const columns = metricCol
    ? [groupCol, "total_rows", metricKey, avgKey]
    : [groupCol, "total_rows"]

  return {
    columns,
    rows: sortedRows,
    groupedByColumn: groupCol,
    metricColumn: metricCol,
  }
}

export function buildStatisticalFallback(
  datasetName: string,
  question: string,
  summary: DatasetSummary
): InsightResponse {
  const numCols = summary.columns.filter((c) => c.type === "number")
  const catCols = summary.columns.filter((c) => c.type === "string")
  const missingCols = summary.columns.filter((c) => c.missingCount > 0)

  const tableName =
    datasetName.replace(/\.csv$/i, "").replace(/[^a-zA-Z0-9_]/g, "_") || "dataset"
  const selectMetrics =
    numCols.length > 0
      ? numCols
          .slice(0, 2)
          .map(
            (c) =>
              `SUM(${c.name}) AS sum_${c.name.replace(/[^a-zA-Z0-9_]/g, "_")},\n  ROUND(AVG(${c.name}), 2) AS avg_${c.name.replace(/[^a-zA-Z0-9_]/g, "_")}`
          )
          .join(",\n  ")
      : "COUNT(*) AS total_rows"

  const groupCol = catCols[0]?.name
  const orderMetric = numCols[0] ? `sum_${numCols[0].name.replace(/[^a-zA-Z0-9_]/g, "_")}` : "total_records"

  const sqlQuery = groupCol
    ? `SELECT\n  ${groupCol},\n  COUNT(*) AS total_records,\n  ${selectMetrics}\nFROM ${tableName}\nGROUP BY ${groupCol}\nORDER BY ${orderMetric} DESC\nLIMIT 10;`
    : `SELECT\n  COUNT(*) AS total_records,\n  ${selectMetrics}\nFROM ${tableName};`

  const keyInsights: string[] = [
    `Dataset "${datasetName}" memuat ${summary.rowCount.toLocaleString("id-ID")} baris dan ${summary.columnCount} kolom (${numCols.length} kolom numerik, ${catCols.length} kolom kategorikal/teks).`,
  ]

  numCols.slice(0, 2).forEach((col) => {
    keyInsights.push(
      `Kolom numerik "${col.name}" memiliki rata-rata ${col.mean?.toLocaleString("id-ID")}, rentang minimum ${col.min?.toLocaleString("id-ID")} hingga maksimum ${col.max?.toLocaleString("id-ID")}.`
    )
  })

  catCols.slice(0, 2).forEach((col) => {
    const top = col.topValues?.[0]
    if (top) {
      keyInsights.push(
        `Nilai paling dominan pada kolom "${col.name}" adalah "${top.value}" sebanyak ${top.count.toLocaleString("id-ID")} baris.`
      )
    }
  })

  const dataQualityNotes =
    missingCols.length > 0
      ? missingCols.map(
          (c) =>
            `Kolom "${c.name}" memiliki ${c.missingCount} nilai kosong (${c.missingRate}).`
        )
      : ["Tidak ditemukan nilai kosong (missing value) pada seluruh kolom dataset."]

  const businessRecommendations = [
    catCols[0]
      ? `Fokuskan evaluasi performa dan alokasi sumber daya pada kategori dominan di kolom "${catCols[0].name}" sambil membandingkan selisih metrik antar-kelompok.`
      : "Tambahkan kolom dimensi kategori atau periode waktu agar perbandingan performa segmen bisa dilakukan lebih tajam.",
    missingCols.length > 0
      ? `Lakukan pembersihan atau imputasi pada ${missingCols.length} kolom yang memiliki missing values sebelum menarik kesimpulan akhir.`
      : "Dataset sudah cukup bersih untuk dilanjutkan ke segmentasi, analisis tren, atau pembuatan dashboard BI.",
    question
      ? `Tinjau kembali pertanyaan "${question}" dengan memfilter periode atau segmen prioritas pada dashboard BI.`
      : "Gunakan kueri SQL referensi di atas sebagai titik awal eksplorasi lanjutan di SQL / BI tool.",
  ]

  return {
    sqlQuery,
    keyInsights,
    dataQualityNotes,
    businessRecommendations,
    sourceMode: "statistical-fallback",
  }
}
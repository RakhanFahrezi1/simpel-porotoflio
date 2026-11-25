import { NextResponse } from "next/server"
import {
  buildStatisticalFallback,
  type DatasetSummary,
  type InsightResponse,
} from "@/lib/data-profiler"

export interface ExtendedInsightResponse extends InsightResponse {
  directAnswer?: string
}

async function callGeminiModel(
  model: string,
  apiKey: string,
  prompt: string
): Promise<{ result: ExtendedInsightResponse | null; status?: number }> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        responseMimeType: "application/json",
      },
    }),
  })

  if (!res.ok) {
    return { result: null, status: res.status }
  }

  const data = await res.json()
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!rawText) {
    return { result: null }
  }

  const cleaned = rawText.replace(/^```json\s*/i, "").replace(/```$/i, "").trim()
  const parsed = JSON.parse(cleaned) as ExtendedInsightResponse

  if (
    typeof parsed.sqlQuery === "string" &&
    Array.isArray(parsed.keyInsights) &&
    Array.isArray(parsed.dataQualityNotes) &&
    Array.isArray(parsed.businessRecommendations)
  ) {
    return {
      result: {
        directAnswer:
          typeof parsed.directAnswer === "string"
            ? parsed.directAnswer
            : parsed.keyInsights[0] || "",
        sqlQuery: parsed.sqlQuery,
        keyInsights: parsed.keyInsights,
        dataQualityNotes: parsed.dataQualityNotes,
        businessRecommendations: parsed.businessRecommendations,
        sourceMode: "gemini-ai",
      },
    }
  }

  return { result: null }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const datasetName = String(body?.datasetName || "dataset.csv")
    const question = String(
      body?.question ||
        "Berikan ringkasan insight utama, kualitas data, dan rekomendasi bisnis."
    )
    const summary = body?.summary as DatasetSummary

    if (!summary || !Array.isArray(summary.columns)) {
      return NextResponse.json(
        { error: "Ringkasan dataset tidak valid." },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim()
    const fallback = buildStatisticalFallback(datasetName, question, summary)

    if (!apiKey) {
      return NextResponse.json({
        ...fallback,
        directAnswer: fallback.keyInsights[0] || "",
      })
    }

    const tableName =
      datasetName.replace(/\.csv$/i, "").replace(/[^a-zA-Z0-9_]/g, "_") || "dataset"

    const prompt = `
Kamu adalah Senior Data Analyst, SQL Architect, dan Business Intelligence Consultant.
Tugasmu adalah menjawab SEGALA jenis pertanyaan pengguna secara akurat, langsung ke inti, dan relevan dalam bahasa Indonesia yang profesional.

KONTEKS DATASET AKTIF:
- Nama File: ${datasetName}
- Nama Tabel SQL Referensi: ${tableName}
- Ringkasan Statistik & Sampel Data:
${JSON.stringify(summary)}

PERTANYAAN PENGGUNA:
"${question}"

INSTRUKSI PENJAWABAN:
1. "directAnswer": Jawab langsung pertanyaan pengguna secara jelas dan komprehensif (2-4 kalimat).
   - Jika pengguna bertanya soal dataset aktif, gunakan angka & nama kolom asli dari Ringkasan Statistik Dataset (jangan mengarang angka di luar data).
   - Jika pengguna meminta kueri SQL tertentu (misalnya transaksi terbesar, CTE, Window Function, top N, cohort, filtering), jelaskan logika SQL tersebut secara ringkas di sini.
   - Jika pengguna bertanya konsep umum Data Analytics, SQL, Statistika, atau Business Intelligence di luar isi baris CSV, jawab secara langsung berdasarkan keahlianmu dan kaitkan dengan struktur kolom dataset aktif bila relevan.
2. "sqlQuery": Tuliskan kueri SQL yang valid, rapi, dan siap pakai sesuai permintaan pengguna menggunakan nama tabel "${tableName}" dan nama kolom asli dataset.
3. "keyInsights": Berikan 3-4 poin temuan atau penjelasan teknis terpenting yang langsung menjawab pertanyaan pengguna.
4. "dataQualityNotes": Berikan 1-2 catatan kualitas data, asumsi kueri, atau hal yang perlu diperhatikan saat analisis.
5. "businessRecommendations": Berikan 2-3 langkah tindak lanjut praktis untuk pengambilan keputusan atau eksplorasi lanjutan.

Kembalikan HANYA objek JSON valid tanpa markdown tambahan:
{
  "directAnswer": "string",
  "sqlQuery": "string",
  "keyInsights": ["string", "string", "string"],
  "dataQualityNotes": ["string"],
  "businessRecommendations": ["string", "string"]
}
`

    const preferredModels = [
      "gemini-3.1-flash-lite",
      "gemini-3.1-flash-lite-preview",
      "gemini-3-flash-preview",
      "gemini-3.1-pro-preview",
      "gemini-2.5-flash-lite",
    ]

    for (const model of preferredModels) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const { result, status } = await callGeminiModel(model, apiKey, prompt)
          if (result) {
            return NextResponse.json(result)
          }
          if (status === 503 && attempt < 3) {
            await new Promise((r) => setTimeout(r, attempt * 1500))
            continue
          }
          break
        } catch {
          break
        }
      }
    }

    return NextResponse.json({
      ...fallback,
      directAnswer: fallback.keyInsights[0] || "",
      dataQualityNotes: [
        "Server Gemini AI sedang padat sementara; menampilkan ringkasan statistik tervalidasi.",
        ...fallback.dataQualityNotes,
      ],
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal memproses analisis." },
      { status: 500 }
    )
  }
}
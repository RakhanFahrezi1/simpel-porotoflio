import { NextResponse } from "next/server"
import {
  runDeterministicRootCauseTools,
  type InvestigationReport,
  type InvestigationRow,
} from "@/lib/root-cause-engine"

export interface AgentApiResponse extends InvestigationReport {
  diagnosticNote?: string
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const scenarioTitle = String(body?.scenarioTitle || "Investigasi KPI Bisnis")
    const kpiHeadline = String(body?.kpiHeadline || "Perubahan metrik kinerja utama")
    const question = String(
      body?.question ||
        "Identifikasi akar masalah utama perubahan KPI dan susun tindakan prioritas untuk manajemen."
    ).trim()
    const rows = Array.isArray(body?.rows) ? (body.rows as InvestigationRow[]) : []

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Data investigasi tidak tersedia." },
        { status: 400 }
      )
    }

    const baseReport = runDeterministicRootCauseTools(
      scenarioTitle,
      kpiHeadline,
      rows
    )

    const isCasualGreeting =
      /^(halo|hai|hi|halo\s+ai|tes|test|ping|pagi|siang|sore|malam|apa\s+kabar)[!.?]*$/i.test(
        question
      )

    const apiKey = process.env.GEMINI_API_KEY?.trim()
    if (!apiKey) {
      const greetingSummary = isCasualGreeting
        ? `Halo! Saya Agen AI Investigasi Root-Cause KPI. Saat ini mode Gemini AI belum aktif di server, tetapi 4 tool analitik sudah memproses skenario "${scenarioTitle}". Silakan ketik pertanyaan analitik atau topik apa pun.`
        : `${baseReport.executiveSummary} Catatan untuk pertanyaan "${question}": ${baseReport.primaryRootCause}`

      return NextResponse.json({
        ...baseReport,
        executiveSummary: greetingSummary,
        sourceMode: "deterministic-agent",
        diagnosticNote: "GEMINI_API_KEY tidak terdeteksi di environment server.",
      } satisfies AgentApiResponse)
    }

    const prompt = `
Kamu adalah asisten AI cerdas bernama Agen AI Investigasi Root-Cause KPI di portofolio Rakhan Fahrezi Aritonang.
Gunakan bahasa Indonesia yang natural, ramah, jelas, dan tidak kaku.

Aturan respons:
1. Jika pengguna hanya menyapa atau bertanya ringan (misalnya "halo", "tes", "apa kabar"), sapa dengan hangat bahwa kamu adalah Agen AI Investigasi Root-Cause KPI dan jelaskan singkat bahwa kamu bisa membantu menganalisis anomali data/bisnis maupun menjawab pertanyaan umum apa pun.
2. Jika pengguna mengajukan pertanyaan analitik atau pertanyaan apa pun, jawab langsung dan tepat sasaran sesuai pertanyaannya, sambil tetap mengaitkan temuan data skenario bila relevan.
3. Jangan mengubah angka faktual dari hasil tool investigasi di bawah ini.

KONTEKS SKENARIO SAAT INI:
- Skenario: ${scenarioTitle}
- Headline KPI: ${kpiHeadline}
- Input / Pertanyaan Pengguna: "${question}"
- Hasil Tool Investigasi:
${JSON.stringify(baseReport.toolTrace)}
- Temuan Utama Data: ${baseReport.primaryRootCause}

Kembalikan HANYA JSON valid:
{
  "executiveSummary": "string (jawaban utama yang luwes dan langsung menjawab input pengguna)",
  "primaryRootCause": "string (intisari temuan atau poin utama jawaban)",
  "actionItems": ["string", "string", "string"]
}
`

    const preferredModels = ["gemini-3.5-flash-lite", "gemini-3.8-flash"]
    let lastError = "Tidak ada respons sukses dari model."

    for (const model of preferredModels) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": apiKey,
              },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                  temperature: 0.45,
                  maxOutputTokens: 750,
                  responseMimeType: "application/json",
                },
              }),
            }
          )

          if (!res.ok) {
            const errText = await res.text().catch(() => "")
            lastError = `${model} HTTP ${res.status}: ${errText.slice(0, 140)}`
            if ((res.status === 503 || res.status === 429) && attempt < 2) {
              await new Promise((r) => setTimeout(r, 800))
              continue
            }
            break
          }

          const data = await res.json()
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text
          if (!rawText) {
            lastError = `${model} mengembalikan respons kosong.`
            break
          }

          const cleaned = rawText
            .replace(/^```json\s*/i, "")
            .replace(/```$/i, "")
            .trim()
          const parsed = JSON.parse(cleaned) as {
            executiveSummary?: string
            primaryRootCause?: string
            actionItems?: string[]
          }

          if (
            typeof parsed.executiveSummary === "string" &&
            typeof parsed.primaryRootCause === "string" &&
            Array.isArray(parsed.actionItems) &&
            parsed.actionItems.length > 0
          ) {
            return NextResponse.json({
              ...baseReport,
              executiveSummary: parsed.executiveSummary,
              primaryRootCause: parsed.primaryRootCause,
              actionItems: parsed.actionItems,
              sourceMode: "gemini-ai",
            } satisfies AgentApiResponse)
          }

          lastError = `${model} mengembalikan skema JSON tidak valid.`
          break
        } catch (err) {
          lastError =
            err instanceof Error ? err.message : "Network error ke Gemini API."
          break
        }
      }
    }

    const fallbackSummary = isCasualGreeting
      ? `Halo! Saya Agen AI Investigasi Root-Cause KPI. Saya sudah menjalankan 4 tool investigasi pada skenario "${scenarioTitle}". Silakan ketik pertanyaan apa pun.`
      : `${baseReport.executiveSummary} [Fallback: ${lastError}]`

    return NextResponse.json({
      ...baseReport,
      executiveSummary: fallbackSummary,
      sourceMode: "deterministic-agent",
      diagnosticNote: lastError,
    } satisfies AgentApiResponse)
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Gagal menjalankan agent.",
      },
      { status: 500 }
    )
  }
}
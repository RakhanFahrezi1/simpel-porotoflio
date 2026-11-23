"use client";

import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type DatasetKey = "ecommerce" | "marketing" | "custom";

interface GenericRow {
  [key: string]: string | number;
}

const DATASET_CONFIG: Record<
  Exclude<DatasetKey, "custom">,
  {
    title: string;
    subtitle: string;
    path: string;
    badge: string;
  }
> = {
  ecommerce: {
    title: "E-Commerce & Marketplace Indonesia",
    subtitle:
      "Analisis performa pendapatan, laba bersih, platform penjualan, dan rating pembeli (IDR).",
    path: "/datasets/ecommerce-indonesia-sales.csv",
    badge: "Dataset 1 • E-Commerce IDR",
  },
  marketing: {
    title: "Digital Marketing Campaign & ROAS",
    subtitle:
      "Evaluasi biaya iklan, konversi order, pendapatan kampanye, dan efisiensi ROAS per channel (IDR).",
    path: "/datasets/digital-marketing-campaign-id.csv",
    badge: "Dataset 2 • Digital Ads IDR",
  },
};

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 2,
  }).format(value);
}

function parseNumeric(val: unknown): number | null {
  if (typeof val === "number" && !Number.isNaN(val)) return val;
  if (typeof val !== "string") return null;
  const cleaned = val.replace(/Rp/gi, "").replace(/\s+/g, "").trim();
  if (!cleaned) return null;
  // Mendukung format 1.000,50 maupun 1000.50
  const normalized =
    cleaned.includes(",") && cleaned.includes(".")
      ? cleaned.replace(/\./g, "").replace(",", ".")
      : cleaned.replace(",", ".");
  const num = Number(normalized);
  return Number.isNaN(num) ? null : num;
}

export default function BiPlaygroundPage() {
  const [selectedDataset, setSelectedDataset] = useState<DatasetKey>("ecommerce");
  const [rows, setRows] = useState<GenericRow[]>([]);
  const [customFileName, setCustomFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Filter kategori / channel / custom group
  const [groupFilter, setGroupFilter] = useState<string>("ALL");

  // Load dataset bawaan saat mode berubah ke ecommerce / marketing
  useEffect(() => {
    if (selectedDataset === "custom") return;

    let isActive = true;
    setLoading(true);
    setErrorMsg("");
    setGroupFilter("ALL");

    const cfg = DATASET_CONFIG[selectedDataset];
    Papa.parse<GenericRow>(cfg.path, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!isActive) return;
        if (results.errors.length > 0 && results.data.length === 0) {
          setErrorMsg("Gagal membaca file CSV dataset.");
          setRows([]);
        } else {
          setRows(results.data);
        }
        setLoading(false);
      },
      error: () => {
        if (!isActive) return;
        setErrorMsg(`Pastikan file ${cfg.path} sudah ada di folder public/datasets.`);
        setRows([]);
        setLoading(false);
      },
    });

    return () => {
      isActive = false;
    };
  }, [selectedDataset]);

  // Handler upload CSV mandiri oleh HRD / User
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setErrorMsg("");
    setGroupFilter("ALL");
    setCustomFileName(file.name);
    setSelectedDataset("custom");

    Papa.parse<GenericRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data.length === 0) {
          setErrorMsg("File CSV kosong atau tidak memiliki header kolom yang valid.");
          setRows([]);
        } else {
          setRows(results.data);
        }
        setLoading(false);
      },
      error: () => {
        setErrorMsg("Terjadi kesalahan saat memproses file CSV yang diunggah.");
        setRows([]);
        setLoading(false);
      },
    });
  };

  // Deteksi kolom secara otomatis
  const schema = useMemo(() => {
    if (rows.length === 0) {
      return {
        headers: [] as string[],
        numericCols: [] as string[],
        categoryCols: [] as string[],
        dateCol: "" as string,
      };
    }

    const headers = Object.keys(rows[0]).filter(Boolean);
    const numericCols: string[] = [];
    const categoryCols: string[] = [];
    let dateCol = "";

    for (const col of headers) {
      const sampleVals = rows
        .slice(0, 30)
        .map((r) => r[col])
        .filter((v) => v !== undefined && v !== null && String(v).trim() !== "");

      if (
        !dateCol &&
        (col.toLowerCase().includes("tanggal") ||
          col.toLowerCase().includes("date"))
      ) {
        dateCol = col;
      }

      const numCount = sampleVals.filter((v) => parseNumeric(v) !== null).length;
      if (sampleVals.length > 0 && numCount / sampleVals.length >= 0.7) {
        numericCols.push(col);
      } else {
        categoryCols.push(col);
      }
    }

    return { headers, numericCols, categoryCols, dateCol };
  }, [rows]);

  // Kolom pengelompokan utama (platform / channel / kategori pertama)
  const primaryGroupCol = useMemo(() => {
    if (selectedDataset === "ecommerce" && schema.headers.includes("platform")) {
      return "platform";
    }
    if (selectedDataset === "marketing" && schema.headers.includes("channel")) {
      return "channel";
    }
    return schema.categoryCols[0] || "";
  }, [selectedDataset, schema]);

  // Daftar opsi filter
  const filterOptions = useMemo(() => {
    if (!primaryGroupCol) return [];
    const setVals = new Set<string>();
    rows.forEach((r) => {
      const v = String(r[primaryGroupCol] ?? "").trim();
      if (v) setVals.add(v);
    });
    return Array.from(setVals).sort();
  }, [rows, primaryGroupCol]);

  // Data setelah difilter
  const filteredRows = useMemo(() => {
    if (groupFilter === "ALL" || !primaryGroupCol) return rows;
    return rows.filter(
      (r) => String(r[primaryGroupCol] ?? "").trim() === groupFilter
    );
  }, [rows, groupFilter, primaryGroupCol]);

  // Perhitungan metrik & grafik sesuai dataset aktif
  const analytics = useMemo(() => {
    if (filteredRows.length === 0) {
      return {
        kpis: [],
        trendData: [],
        groupData: [],
        insights: [] as string[],
        trendMetricLabel: "Nilai",
        groupMetricLabel: "Total",
      };
    }

    // 1. Mode E-Commerce
    if (selectedDataset === "ecommerce") {
      const totalPendapatan = filteredRows.reduce(
        (acc, r) => acc + (parseNumeric(r.pendapatan_idr) ?? 0),
        0
      );
      const totalLaba = filteredRows.reduce(
        (acc, r) => acc + (parseNumeric(r.laba_bersih_idr) ?? 0),
        0
      );
      const totalOrder = filteredRows.length;
      const ratings = filteredRows
        .map((r) => parseNumeric(r.rating_pembeli))
        .filter((n): n is number => n !== null);
      const avgRating =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0;

      const byDateMap = new Map<string, number>();
      const byPlatformMap = new Map<string, number>();

      filteredRows.forEach((r) => {
        const dt = String(r.tanggal ?? "");
        const rev = parseNumeric(r.pendapatan_idr) ?? 0;
        if (dt) byDateMap.set(dt, (byDateMap.get(dt) ?? 0) + rev);

        const plat = String(r.platform ?? "Lainnya");
        byPlatformMap.set(plat, (byPlatformMap.get(plat) ?? 0) + rev);
      });

      const trendData = Array.from(byDateMap.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([label, value]) => ({ label, value }));

      const groupData = Array.from(byPlatformMap.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([name, value]) => ({ name, value }));

      const topPlatform = groupData[0];
      const marginPct =
        totalPendapatan > 0 ? (totalLaba / totalPendapatan) * 100 : 0;

      const insights = [
        topPlatform
          ? `Platform dengan pendapatan tertinggi adalah ${topPlatform.name} (${formatRupiah(topPlatform.value)}).`
          : "Data platform berhasil dimuat.",
        `Rata-rata margin laba bersih tercatat ${formatNumber(marginPct)}% dengan rata-rata rating pembeli ${formatNumber(avgRating)} / 5.0 dari ${totalOrder} transaksi.`,
      ];

      return {
        kpis: [
          { label: "Total Pendapatan", value: formatRupiah(totalPendapatan) },
          { label: "Total Laba Bersih", value: formatRupiah(totalLaba) },
          { label: "Rata-rata Rating", value: `${formatNumber(avgRating)} / 5.0` },
          { label: "Jumlah Pesanan", value: `${totalOrder} order` },
        ],
        trendData,
        groupData,
        insights,
        trendMetricLabel: "Pendapatan Harian (IDR)",
        groupMetricLabel: "Pendapatan per Platform (IDR)",
      };
    }

    // 2. Mode Digital Marketing
    if (selectedDataset === "marketing") {
      const totalSpend = filteredRows.reduce(
        (acc, r) => acc + (parseNumeric(r.biaya_iklan_idr) ?? 0),
        0
      );
      const totalConvRev = filteredRows.reduce(
        (acc, r) => acc + (parseNumeric(r.pendapatan_konversi_idr) ?? 0),
        0
      );
      const totalConversions = filteredRows.reduce(
        (acc, r) => acc + (parseNumeric(r.konversi_order) ?? 0),
        0
      );
      const avgRoas = totalSpend > 0 ? totalConvRev / totalSpend : 0;

      const byDateMap = new Map<string, number>();
      const byChannelMap = new Map<string, number>();

      filteredRows.forEach((r) => {
        const dt = String(r.tanggal ?? "");
        const rev = parseNumeric(r.pendapatan_konversi_idr) ?? 0;
        if (dt) byDateMap.set(dt, (byDateMap.get(dt) ?? 0) + rev);

        const ch = String(r.channel ?? "Lainnya");
        byChannelMap.set(ch, (byChannelMap.get(ch) ?? 0) + rev);
      });

      const trendData = Array.from(byDateMap.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([label, value]) => ({ label, value }));

      const groupData = Array.from(byChannelMap.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([name, value]) => ({ name, value }));

      const topChannel = groupData[0];
      const insights = [
        topChannel
          ? `Channel penyumbang pendapatan konversi terbesar adalah ${topChannel.name} (${formatRupiah(topChannel.value)}).`
          : "Data kampanye berhasil dimuat.",
        `Rata-rata ROAS keseluruhan sebesar ${formatNumber(avgRoas)}x dari total belanja iklan ${formatRupiah(totalSpend)} dan ${formatNumber(totalConversions)} konversi.`,
      ];

      return {
        kpis: [
          { label: "Pendapatan Konversi", value: formatRupiah(totalConvRev) },
          { label: "Total Biaya Iklan", value: formatRupiah(totalSpend) },
          { label: "Rata-rata ROAS", value: `${formatNumber(avgRoas)}x` },
          { label: "Total Konversi", value: `${formatNumber(totalConversions)} order` },
        ],
        trendData,
        groupData,
        insights,
        trendMetricLabel: "Pendapatan Konversi Harian (IDR)",
        groupMetricLabel: "Pendapatan per Channel (IDR)",
      };
    }

    // 3. Mode Custom CSV Upload (Otomatis)
    const primaryNumCol = schema.numericCols[0] || "";
    const secondaryNumCol = schema.numericCols[1] || "";

    const sumPrimary = primaryNumCol
      ? filteredRows.reduce((acc, r) => acc + (parseNumeric(r[primaryNumCol]) ?? 0), 0)
      : 0;
    const sumSecondary = secondaryNumCol
      ? filteredRows.reduce((acc, r) => acc + (parseNumeric(r[secondaryNumCol]) ?? 0), 0)
      : 0;

    const groupMap = new Map<string, number>();
    if (primaryGroupCol && primaryNumCol) {
      filteredRows.forEach((r) => {
        const key = String(r[primaryGroupCol] ?? "Lainnya");
        const val = parseNumeric(r[primaryNumCol]) ?? 0;
        groupMap.set(key, (groupMap.get(key) ?? 0) + val);
      });
    }

    const groupData = Array.from(groupMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, value]) => ({ name, value }));

    const trendData = schema.dateCol && primaryNumCol
      ? Array.from(
          filteredRows.reduce((map, r) => {
            const d = String(r[schema.dateCol] ?? "");
            const v = parseNumeric(r[primaryNumCol]) ?? 0;
            if (d) map.set(d, (map.get(d) ?? 0) + v);
            return map;
          }, new Map<string, number>())
        )
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([label, value]) => ({ label, value }))
      : filteredRows.slice(0, 30).map((r, idx) => ({
          label: `Baris ${idx + 1}`,
          value: primaryNumCol ? parseNumeric(r[primaryNumCol]) ?? 0 : 0,
        }));

    return {
      kpis: [
        { label: "Total Baris Data", value: `${filteredRows.length} baris` },
        { label: "Jumlah Kolom", value: `${schema.headers.length} kolom` },
        {
          label: primaryNumCol ? `Total ${primaryNumCol}` : "Kolom Numerik",
          value: primaryNumCol ? formatNumber(sumPrimary) : "0",
        },
        {
          label: secondaryNumCol ? `Total ${secondaryNumCol}` : "Kolom Kategori",
          value: secondaryNumCol
            ? formatNumber(sumSecondary)
            : `${schema.categoryCols.length} kolom`,
        },
      ],
      trendData,
      groupData,
      insights: [
        `Dataset "${customFileName || "Custom CSV"}" terbaca otomatis dengan ${schema.numericCols.length} kolom numerik dan ${schema.categoryCols.length} kolom kategori.`,
        groupData[0]
          ? `Kelompok tertinggi pada "${primaryGroupCol}" adalah ${groupData[0].name} dengan nilai ${formatNumber(groupData[0].value)}.`
          : "Gunakan filter kategori di atas untuk mengeksplorasi data lebih lanjut.",
      ],
      trendMetricLabel: primaryNumCol ? `Tren ${primaryNumCol}` : "Tren Data",
      groupMetricLabel:
        primaryGroupCol && primaryNumCol
          ? `${primaryNumCol} per ${primaryGroupCol}`
          : "Distribusi Kategori",
    };
  }, [filteredRows, selectedDataset, schema, primaryGroupCol, customFileName]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-block rounded-full border px-3 py-1 text-xs font-medium">
            Interactive BI Playground
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {selectedDataset === "custom"
              ? `Custom Dataset: ${customFileName || "Uploaded CSV"}`
              : DATASET_CONFIG[selectedDataset].title}
          </h1>
          <p className="mt-1 text-sm opacity-80">
            {selectedDataset === "custom"
              ? "Dashboard otomatis membaca struktur kolom dari file CSV yang Anda unggah."
              : DATASET_CONFIG[selectedDataset].subtitle}
          </p>
        </div>

        {/* Tombol Upload CSV Mandiri */}
        <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium hover:opacity-80">
          <span>+ Upload CSV Sendiri</span>
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Pilihan 2 Dataset Siap Pakai + Filter */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedDataset("ecommerce")}
            className={`rounded-lg px-4 py-2 text-sm font-medium border transition ${
              selectedDataset === "ecommerce" ? "bg-foreground text-background" : "opacity-80"
            }`}
          >
            1. E-Commerce Indonesia
          </button>
          <button
            type="button"
            onClick={() => setSelectedDataset("marketing")}
            className={`rounded-lg px-4 py-2 text-sm font-medium border transition ${
              selectedDataset === "marketing" ? "bg-foreground text-background" : "opacity-80"
            }`}
          >
            2. Digital Marketing & ROAS
          </button>
          {selectedDataset === "custom" && (
            <button
              type="button"
              className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background border"
            >
              Custom CSV ({customFileName})
            </button>
          )}
        </div>

        {filterOptions.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="group-filter" className="opacity-75">
              Filter ({primaryGroupCol}):
            </label>
            <select
              id="group-filter"
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="rounded-lg border bg-background px-3 py-1.5 text-sm"
            >
              <option value="ALL">Semua</option>
              {filterOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {loading && (
        <div className="rounded-xl border p-8 text-center text-sm opacity-75">
          Memproses dataset...
        </div>
      )}

      {errorMsg && !loading && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-500">
          {errorMsg}
        </div>
      )}

      {!loading && !errorMsg && (
        <>
          {/* KPI Cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {analytics.kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-xl border p-4">
                <p className="text-xs opacity-70">{kpi.label}</p>
                <p className="mt-1 text-xl font-bold">{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Insight Otomatis */}
          {analytics.insights.length > 0 && (
            <div className="mb-6 rounded-xl border p-4">
              <h2 className="text-sm font-semibold">Ringkasan Insight Otomatis</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm opacity-85">
                {analytics.insights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Charts */}
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border p-4">
              <h3 className="mb-4 text-sm font-semibold">{analytics.trendMetricLabel}</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.trendData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#2563eb"
                      fill="#3b82f6"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border p-4">
              <h3 className="mb-4 text-sm font-semibold">{analytics.groupMetricLabel}</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.groupData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#16a34a" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Cuplikan Data Tabel */}
          <div className="rounded-xl border p-4">
            <h3 className="mb-3 text-sm font-semibold">
              Cuplikan Data ({filteredRows.length} baris ditampilkan maks. 10 baris pertama)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b">
                    {schema.headers.map((col) => (
                      <th key={col} className="px-3 py-2 font-semibold whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.slice(0, 10).map((row, rIdx) => (
                    <tr key={rIdx} className="border-b last:border-b-0">
                      {schema.headers.map((col) => (
                        <td key={col} className="px-3 py-2 whitespace-nowrap opacity-85">
                          {String(row[col] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
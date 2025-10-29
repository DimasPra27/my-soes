"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const reviews = [
  {
    id: 1,
    title: "Sangat Puas",
    description: "Rasanya enak dan teksturnya lembut. Akan beli lagi!",
    createdAt: "2025-10-28T10:15:00.000Z",
    author: "Aulia",
  },
  {
    id: 2,
    title: "Enak",
    description: "Cukup enak, tapi bisa lebih manis sedikit.",
    createdAt: "2025-10-25T09:30:00.000Z",
    author: "Budi",
  },
  {
    id: 3,
    title: "Bagus",
    description: "Pelayanan cepat dan produk fresh.",
    createdAt: "2025-10-20T14:00:00.000Z",
    author: "Citra",
  },
  {
    id: 4,
    title: "Kurang",
    description: "Agak keras di bagian atas, tapi overall oke.",
    createdAt: "2025-09-30T08:00:00.000Z",
    author: "Dedi",
  },
  {
    id: 5,
    title: "Rekomendasi",
    description: "Rekomendasi untuk acara keluarga.",
    createdAt: "2025-09-15T12:00:00.000Z",
    author: "Eka",
  },
  {
    id: 6,
    title: "Mantap",
    description: "Harga sebanding dengan kualitas.",
    createdAt: "2025-10-01T16:45:00.000Z",
    author: "Fadli",
  },
  {
    id: 7,
    title: "Lumayan",
    description: "Varian rasa banyak, saya suka rasa cokelat.",
    createdAt: "2025-08-22T11:20:00.000Z",
    author: "Gita",
  },
  {
    id: 8,
    title: "Top",
    description: "Packaging rapi, sampai rumah masih hangat.",
    createdAt: "2025-10-26T19:10:00.000Z",
    author: "Hendra",
  },
  {
    id: 9,
    title: "Cukup",
    description: "Perlu perbaikan pada konsistensi adonan.",
    createdAt: "2025-07-10T07:45:00.000Z",
    author: "Indra",
  },
  {
    id: 10,
    title: "Mantul",
    description: "Sangat memuaskan, toppingnya pas.",
    createdAt: "2025-10-27T13:05:00.000Z",
    author: "Joko",
  },
  {
    id: 11,
    title: "Enak Banget",
    description: "Saya ulang order setiap minggu.",
    createdAt: "2025-06-18T10:00:00.000Z",
    author: "Kiki",
  },
  {
    id: 12,
    title: "Oke",
    description: "Tempatnya bersih dan pelayan ramah.",
    createdAt: "2025-10-24T09:00:00.000Z",
    author: "Lina",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<"newest" | "oldest">("newest");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = reviews.filter(
      (r) =>
        r.author.toLowerCase().includes(q) || r.title.toLowerCase().includes(q)
    );
    list = list.sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return order === "newest" ? db - da : da - db;
    });
    return list;
  }, [query, order]);

  return (
    <div className="relative">
      {/* Floating filter bar */}
      <div className="fixed top-6 left-1/2 z-40 w-full max-w-screen-xl -translate-x-1/2 px-6">
        <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-md border rounded-lg px-4 py-2 flex items-center gap-3 shadow">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or title..."
            className="flex-1 min-w-0 rounded-md border px-3 py-2 text-sm outline-none"
          />

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as "newest" | "oldest")}
            className="rounded-md border px-2 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* spacer so content not hidden behind fixed bar */}
      <div className="h-10" />

      <div className="grid h-auto w-full grid-cols-4 gap-6 px-6 mx-auto">
        {filtered.map((r) => (
          <Card key={r.id}>
            <div className="flex items-center gap-3">
              <Image
                src="/customer.png"
                alt={`${r.author} avatar`}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <div className="text-sm text-muted-foreground">
                  — {r.author}
                </div>
                <div className="text-xs">{r.createdAt}</div>
              </div>
            </div>

            <CardDescription className="mt-2">{r.description}</CardDescription>

            <CardDescription>
              <div className="flex items-center justify-between mb-2 mt-2">
                <div className="flex items-center gap-0.5">
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    viewBox="0 0 22 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    viewBox="0 0 22 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    viewBox="0 0 22 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    viewBox="0 0 22 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-gray-300 dark:text-gray-500"
                    viewBox="0 0 22 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>

                <Link
                  href={"/review/review-detail?id=" + r.id}
                  className="ml-4 inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Read more
                </Link>
              </div>
            </CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Review {
  id: number;
  name: string;
  email: string;
  msisdn: string;
  comment: string;
  rate: number;
  createdAt: string;
}

// const reviews = [
//   {
//     id: 1,
//     title: "Sangat Puas",
//     description: "Rasanya enak dan teksturnya lembut. Akan beli lagi!",
//     createdAt: "2025-10-28T10:15:00.000Z",
//     author: "Aulia",
//   },
//   {
//     id: 2,
//     title: "Enak",
//     description: "Cukup enak, tapi bisa lebih manis sedikit.",
//     createdAt: "2025-10-25T09:30:00.000Z",
//     author: "Budi",
//   },
//   {
//     id: 3,
//     title: "Bagus",
//     description: "Pelayanan cepat dan produk fresh.",
//     createdAt: "2025-10-20T14:00:00.000Z",
//     author: "Citra",
//   },
//   {
//     id: 4,
//     title: "Kurang",
//     description: "Agak keras di bagian atas, tapi overall oke.",
//     createdAt: "2025-09-30T08:00:00.000Z",
//     author: "Dedi",
//   },
//   {
//     id: 5,
//     title: "Rekomendasi",
//     description: "Rekomendasi untuk acara keluarga.",
//     createdAt: "2025-09-15T12:00:00.000Z",
//     author: "Eka",
//   },
//   {
//     id: 6,
//     title: "Mantap",
//     description: "Harga sebanding dengan kualitas.",
//     createdAt: "2025-10-01T16:45:00.000Z",
//     author: "Fadli",
//   },
//   {
//     id: 7,
//     title: "Lumayan",
//     description: "Varian rasa banyak, saya suka rasa cokelat.",
//     createdAt: "2025-08-22T11:20:00.000Z",
//     author: "Gita",
//   },
//   {
//     id: 8,
//     title: "Top",
//     description: "Packaging rapi, sampai rumah masih hangat.",
//     createdAt: "2025-10-26T19:10:00.000Z",
//     author: "Hendra",
//   },
//   {
//     id: 9,
//     title: "Cukup",
//     description: "Perlu perbaikan pada konsistensi adonan.",
//     createdAt: "2025-07-10T07:45:00.000Z",
//     author: "Indra",
//   },
//   {
//     id: 10,
//     title: "Mantul",
//     description: "Sangat memuaskan, toppingnya pas.",
//     createdAt: "2025-10-27T13:05:00.000Z",
//     author: "Joko",
//   },
//   {
//     id: 11,
//     title: "Enak Banget",
//     description: "Saya ulang order setiap minggu.",
//     createdAt: "2025-06-18T10:00:00.000Z",
//     author: "Kiki",
//   },
//   {
//     id: 12,
//     title: "Oke",
//     description: "Tempatnya bersih dan pelayan ramah.",
//     createdAt: "2025-10-24T09:00:00.000Z",
//     author: "Lina",
//   },
// ];

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<"newest" | "oldest">("newest");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = reviews.filter((r) => r.name.toLowerCase().includes(q));
    list = list.sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return order === "newest" ? db - da : da - db;
    });
    return list;
  }, [reviews, query, order]);

  async function getCustomers() {
    try {
      const questions = await fetch("/api/customer", { cache: "no-store" });
      if (!questions.ok) throw new Error("Failed fetch questions");

      const json = await questions.json();
      // console.log(json);

      setReviews(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCustomers();
  });

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
                alt={`${r.name} avatar`}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <div className="text-sm text-muted-foreground">— {r.name}</div>
                <div className="text-xs">{r.createdAt}</div>
              </div>
            </div>

            <CardDescription className="mt-2">{r.comment}</CardDescription>

            <CardDescription>
              <div className="flex items-center justify-between mb-2 mt-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = star <= r.rate;

                    return (
                      <Star
                        className={`w-4 h-4 ${
                          active
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-400"
                        }`}
                      />
                    );
                  })}
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

import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const reviews = [
  {
    id: 1,
    title: "Sangat Puas",
    description: "Rasanya enak dan teksturnya lembut. Akan beli lagi!",
    author: "Aulia",
  },
  {
    id: 2,
    title: "Enak",
    description: "Cukup enak, tapi bisa lebih manis sedikit.",
    author: "Budi",
  },
  {
    id: 3,
    title: "Bagus",
    description: "Pelayanan cepat dan produk fresh.",
    author: "Citra",
  },
  {
    id: 4,
    title: "Kurang",
    description: "Agak keras di bagian atas, tapi overall oke.",
    author: "Dedi",
  },
  {
    id: 5,
    title: "Rekomendasi",
    description: "Rekomendasi untuk acara keluarga.",
    author: "Eka",
  },
  {
    id: 6,
    title: "Mantap",
    description: "Harga sebanding dengan kualitas.",
    author: "Fadli",
  },
  {
    id: 7,
    title: "Lumayan",
    description: "Varian rasa banyak, saya suka rasa cokelat.",
    author: "Gita",
  },
  {
    id: 8,
    title: "Top",
    description: "Packaging rapi, sampai rumah masih hangat.",
    author: "Hendra",
  },
  {
    id: 9,
    title: "Cukup",
    description: "Perlu perbaikan pada konsistensi adonan.",
    author: "Indra",
  },
  {
    id: 10,
    title: "Mantul",
    description: "Sangat memuaskan, toppingnya pas.",
    author: "Joko",
  },
  {
    id: 11,
    title: "Enak Banget",
    description: "Saya ulang order setiap minggu.",
    author: "Kiki",
  },
  {
    id: 12,
    title: "Oke",
    description: "Tempatnya bersih dan pelayan ramah.",
    author: "Lina",
  },
];

export default function Home() {
  return (
    <div className="grid h-auto w-full grid-cols-4 gap-6">
      {reviews.map((r) => (
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
              {/* <CardTitle>{r.title}</CardTitle> */}
              <div className="text-sm text-muted-foreground"> -{r.author}</div>
            </div>
          </div>

          <CardDescription className="mt-2">{r.description}</CardDescription>
          <CardDescription>
            <div className="flex items-center justify-between mb-2 mt-2">
              <div className="flex items-center gap-0.5">
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-gray-300 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>

              <Link
                href={("/review/review-detail?id=" + r.id)}
                className="ml-4 inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Read more
              </Link>
            </div>
          </CardDescription>
        </Card>
      ))}
    </div>
  );
}

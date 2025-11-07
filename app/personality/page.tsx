import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { RefreshCw, Share2 } from "lucide-react";

export default function Personality() {
  return (
    <div className="h-auto w-full px-6 item-align-center text-center max-w-screen-xl mx-auto">
      <Card>
        <Image
          src="/customer.png"
          alt="Profile"
          width={40}
          height={40}
          className="w-70 h-80 rounded-sm item-center mx-auto"
        />

        <CardTitle className="mt-4 text-5xl">Dimas</CardTitle>
        <CardDescription className="text-lg">
          Ini adalah halaman kepribadian. Konten akan ditambahkan di sini nanti.
        </CardDescription>

        <div className="mt-4 mb-6 p-4">
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-3 text-base font-semibold text-white rounded-lg bg-[var(--accent)] hover:brightness-110 focus:ring-4 focus:ring-emerald-300 transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              Ulangi Tes
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-3 text-base font-semibold text-white rounded-lg bg-[var(--accent)]/90 hover:brightness-110 focus:ring-4 focus:ring-emerald-300 transition-all"
            >
              <Share2 className="w-5 h-5" />
              Bagikan
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { RefreshCw, Share2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Personality {
  category: string;
  minCalculation: number;
  maxCalculation: number;
  personalities: PersonalityDetail[];
}

interface PersonalityDetail {
  title: string;
  description: string;
}

interface Customer {
  name: string;
  email: string;
  phoneNumber: string;
  comment?: string;
  rate: number;
  answers: {
    [key: number]: Answer;
  };
}

interface Answer {
  answer: number;
  category: string;
}

export default function Personality() {
  const [customer, setCustomer] = useState<Customer>();
  const [personalities, setPersonalities] = useState<Personality[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [result, setResult] = useState<any[]>([]);

  async function getPersonality() {
    try {
      const data = localStorage.getItem("myData");
      const localCustomer = data ? JSON.parse(data) : null;
      setCustomer(localCustomer);

      const questions = await fetch("/api/personality", { cache: "no-store" });
      if (!questions.ok) throw new Error("Failed fetch questions");

      const json = await questions.json();
      // console.log(json);

      setPersonalities(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function calculatePersonality() {
    if (!customer || !customer.answers) return null;

    // 1. Hitung jumlah skor per kategori
    const categoryTotals: Record<string, number> = {};

    Object.values(customer.answers ?? {}).forEach((ans) => {
      if (!categoryTotals[ans.category]) {
        categoryTotals[ans.category] = 0;
      }
      categoryTotals[ans.category] += ans.answer;
    });

    console.log("Category totals:", categoryTotals);

    // 2. Cari personality yang matching berdasarkan range
    const result = [];

    // for (const cat of Object.keys(categoryTotals)) {
    const total = categoryTotals["PANDAN"] - categoryTotals["KLEPON"];

    const match = personalities.find(
      (p) => total >= p.minCalculation && total <= p.maxCalculation
    );

    if (match) {
      result.push({
        category: match.category,
        total,
        personalities: match.personalities,
      });
    }
    // }

    return result;
  }

  useEffect(() => {
    getPersonality();
  }, []);

  useEffect(() => {
    if (customer && personalities.length > 0) {
      const r = calculatePersonality();
      setResult(r ?? []);
    }
  }, [customer, personalities]);

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

        <CardTitle className="mt-4 text-5xl">{customer?.name}</CardTitle>
        <CardDescription className="text-lg">
          {result.length > 0 && (
            <div className="mt-6 p-4">
              <h2 className="text-3xl font-bold mb-4">Hasil Kepribadian</h2>

              {result.map((r, i) => (
                <div key={i} className="mb-6">
                  <h3 className="text-2xl font-semibold">{r.category}</h3>
                  <p className="text-lg">Total Skor: {r.total}</p>

                  {r.personalities.map((p: any, idx: number) => (
                    <div key={idx} className="mt-2">
                      <h4 className="text-xl font-bold">{p.title}</h4>
                      <p className="text-base text-muted-foreground">
                        {p.description}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
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

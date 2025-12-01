"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

import Image from "next/image";
import {
  RefreshCw,
  Share2,
  Heart,
  Users,
  UserCheck,
  Briefcase,
  GraduationCap,
} from "lucide-react";

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
  const router = useRouter();

  const [customer, setCustomer] = useState<Customer>();
  const [personalities, setPersonalities] = useState<Personality[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [result, setResult] = useState<any[]>([]);
  const [sortedCategories, setSortedCategories] = useState<[string, number][]>(
    []
  );

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

    // 2. Cari personality yang matching berdasarkan range
    const result = [];

    // 2. Hitung total keseluruhan
    const grandTotal = Object.values(categoryTotals).reduce(
      (sum, val) => sum + val,
      0
    );

    // 3. Hitung persentase masing-masing kategori
    const percentages: Record<string, number> = {};
    Object.keys(categoryTotals).forEach((cat) => {
      percentages[cat] = Math.round((categoryTotals[cat] / grandTotal) * 100);
    });

    // 4. Hitung selisih untuk menentukan variant dominan
    const pandanTotal = categoryTotals["PANDAN"] || 0;
    const kleponTotal = categoryTotals["KLEPON"] || 0;
    const originalTotal = categoryTotals["ORIGINAL"] || 0;

    // Cari kategori dengan total tertinggi
    const totals = [
      { category: "PANDAN", total: pandanTotal },
      { category: "KLEPON", total: kleponTotal },
      { category: "ORIGINAL", total: originalTotal },
    ];

    const dominant = totals.reduce((max, curr) =>
      curr.total > max.total ? curr : max
    );

    // for (const cat of Object.keys(categoryTotals)) {
    const total = categoryTotals["PANDAN"] - categoryTotals["KLEPON"];

    const match = personalities.find(
      (p) => total >= p.minCalculation && total <= p.maxCalculation
    );

    if (match) {
      result.push({
        category: match.category,
        total,
        categoryTotals,
        percentages,
        grandTotal,
        personalities: match.personalities,
      });
    }

    console.log("calculated result:", result);

    return result;
  }

  const renderIcon = (idx: number, title: string) => {
    switch (idx) {
      case 1:
        return (
          <>
            <div className="bg-pink-400 rounded-full p-2 sm:p-3 flex-shrink-0">
              <Heart
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="white"
              />
            </div>

            <div className="bg-pink-400 rounded-full px-2 sm:px-6 py-1.5 sm:py-2">
              <span className="text-white font-semibold text-sm sm:text-base">
                {title}
              </span>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="bg-blue-500 rounded-full p-2 sm:p-3 flex-shrink-0">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="bg-blue-500 rounded-full px-2 sm:px-6 py-1.5 sm:py-2">
              <span className="text-white font-semibold text-sm sm:text-base">
                {title}
              </span>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="bg-yellow-500 rounded-full p-2 sm:p-3 flex-shrink-0">
              <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="bg-yellow-500 rounded-full px-2 sm:px-6 py-1.5 sm:py-2">
              <span className="text-white font-semibold text-sm sm:text-base">
                {title}
              </span>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className="bg-emerald-600 rounded-full p-2 sm:p-3 flex-shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="bg-emerald-600 rounded-full px-2 sm:px-6 py-1.5 sm:py-2">
              <span className="text-white font-semibold text-sm sm:text-base">
                {title}
              </span>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const handleRetry = () => {
    localStorage.removeItem("myData");
    localStorage.clear();
    const res = router.push("/");
  };

  useEffect(() => {
    getPersonality();
  }, []);

  useEffect(() => {
    if (customer && personalities.length > 0) {
      const r = calculatePersonality();
      if (!r || r.length === 0) return;

      // Urutkan kategori berdasarkan persentase (tertinggi ke terendah)
      // HANYA tampilkan kategori yang ada di answers
      const sorted = Object.entries(r[0]?.percentages || {})
        .filter(([category]) => r[0].categoryTotals[category] > 0) // Filter kategori yang ada datanya
        .sort(([, a], [, b]) => b - a);

      setSortedCategories(sorted);

      setResult(r ?? []);
    }
  }, [customer, personalities]);

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full items-center mx-auto">
      {result.map((res, i) => (
        <div key={i}>
          {/* Header Text */}
          <p className="text-center text-emerald-700 font-medium mb-4">
            Hi, {customer?.name} <br />
            Wah ternyata, kamu itu...
          </p>

          {/* Original Badge */}
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl lg:py-4 sm:py-1 mb-6 shadow-md">
            <h1 className="text-white text-5xl font-bold text-center">
              {res.category}
            </h1>
          </div>

          {/* Character Illustration */}
          <div className="bg-pink-200 rounded-3xl p-8 mb-6 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 bg-emerald-600 rounded-full"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              {/* Character */}
              <div className="mb-4">
                <img
                  src={
                    res.category === "PANDAN"
                      ? "personality/Main-Pandan.png"
                      : res.category === "KLEPON"
                      ? "personality/Main-Klepon.png"
                      : "personality/Main-Original.png"
                  }
                  className="w-40 h-auto sm:w-40 pointer-events-none"
                  draggable="false"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute top-20 left-12 text-yellow-400 text-2xl">
                ✨
              </div>
              <div className="absolute top-32 right-16 text-yellow-400 text-2xl">
                ✨
              </div>
              <div className="absolute top-24 right-20 text-pink-400 text-xl">
                💕
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <div className="mb-4">
              <h3 className="text-emerald-700 font-bold text-xl mb-3">
                Varian rasa
              </h3>
              <div className="text-emerald-600 font-bold text-2xl mb-4">
                {res.category}
              </div>
            </div>

            <div className="flex flex-row items-center justify-between gap-3 sm:gap-4">
              {/* Progress Bars */}
              <div className="flex flex-col space-y-2 sm:space-y-3 flex-1 min-w-0">
                {sortedCategories.map(([category, percentage], index) => (
                  <div
                    key={category}
                    className="flex items-center gap-2 sm:gap-3"
                  >
                    <span className="text-emerald-700 font-medium w-14 sm:w-20 text-left text-xs sm:text-base flex-shrink-0 capitalize">
                      {category.toLowerCase()}
                    </span>
                    <div className="flex-1 bg-pink-200 rounded-full h-4 sm:h-6 overflow-hidden min-w-0">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          index === 0 ? "bg-emerald-600" : "bg-emerald-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-emerald-700 font-bold w-8 sm:w-12 text-right text-xs sm:text-base flex-shrink-0">
                      {percentage}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Avatar thumbnail */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 sm:w-32 sm:h-32 bg-emerald-600 rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={
                      res.category === "PANDAN"
                        ? "personality/Sub-Pandan.png"
                        : res.category === "KLEPON"
                        ? "personality/Sub-Klepon.png"
                        : "personality/Sub-Original.png"
                    }
                    className="w-full h-full object-cover pointer-events-none"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Personality Description Sections */}
          <div className="space-y-3 sm:space-y-4 mb-6">
            {/* Section 1: Hasil Karakter */}
            {/* <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
              <h3 className="text-white font-bold text-base text-md sm:text-lg leading-tight">
                hasil karakter kepribadian dalam bernostalgia
              </h3>
            </div>
            <div className="border-2 sm:border-4 border-black bg-yellow-50 rounded-lg p-4 sm:p-6">
              <p className="text-black text-sm sm:text-base leading-relaxed">
                Kamu itu gak mau ribet mengungkit penyesalan; kamu lebih memilih
                jadi pendengar yang baik bagi dirimu di masa lalu. Karena kamu
                fleksibel dan easy going, kamu pandai memahami kondisi bahwa
                setiap kesalahan atau keberhasilan adalah bagian dari proses.
                Nostalgia bagimu adalah refleksi yang hangat, bukan drama. Sikap
                optimis enerjik-mu membuatmu melihat masa lalu sebagai fondasi
                untuk tetap ambisius (tapi tetap seimbang), sambil berkata pada
                diri sendiri, "Terima kasih sudah berjuang," dengan cara yang
                tenang dan penuh penerimaan.
              </p>
            </div> */}

            {res.personalities.map((p: any, idx: number) => (
              <div key={idx}>
                {/* Section 2: Efek Nostalgia dalam Percintaan */}
                {idx === 0 ? (
                  <>
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center mb-4">
                      <h3 className="text-white font-bold text-base text-md sm:text-lg leading-tight">
                        {p.title}
                      </h3>
                    </div>
                    <div className="border-2 sm:border-4 border-black bg-yellow-50 rounded-lg p-4 sm:p-6">
                      <p className="text-black text-sm sm:text-base leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      {renderIcon(idx, p.title)}
                    </div>
                    <div className="border-2 sm:border-4 border-black bg-white rounded-lg p-4 sm:p-6">
                      <p className="text-black text-sm sm:text-base leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* Section 3: Efek Nostalgia dalam Keluarga */}
            {/* <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="bg-blue-500 rounded-full p-2 sm:p-3 flex-shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="bg-blue-500 rounded-full px-2 sm:px-6 py-1.5 sm:py-2">
                <span className="text-white font-semibold text-sm sm:text-base">
                  efek nostalgia dalam keluarga
                </span>
              </div>
            </div>
            <div className="border-2 sm:border-4 border-black bg-white rounded-lg p-4 sm:p-6">
              <p className="text-black text-sm sm:text-base leading-relaxed">
                Bagi kamu, keluarga adalah inti nostalgia yang paling kuat. Kamu
                sangat menghargai stabilitas emosional dan kehangatan rumah,
                sehingga kenangan bersama keluarga sering menjadi jangkar
                ketenangan dan motivasi terbesar mu. Nostalgia ini mungkin
                sering terpicu oleh hal-hal sederhana, seperti aroma suasana
                kumpul santai di ruang tengah, yang langsung kamu asosiasikan
                sebagai rasa "pulang" yang menenangkan. Kenangan-kenangan ini
                menumbuhkan rasa syukur yang dalam dan membantumu menjaga
                keseimbangan batin.
              </p>
            </div> */}

            {/* Section 4: Efek Nostalgia dalam Pertemanan */}
            {/* <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="bg-yellow-500 rounded-full p-2 sm:p-3 flex-shrink-0">
                <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="bg-yellow-500 rounded-full px-2 sm:px-6 py-1.5 sm:py-2">
                <span className="text-white font-semibold text-sm sm:text-base">
                  efek nostalgia dalam pertemanan
                </span>
              </div>
            </div>
            <div className="border-2 sm:border-4 border-black bg-white rounded-lg p-4 sm:p-6">
              <p className="text-black text-sm sm:text-base leading-relaxed">
                Dalam konteks pertemanan, sisi mu yang easy going dan humoris
                sangat menonjol. Sebagai individu yang fleksibel dan mudah
                bergaul, kamu menceritakan masa pertemanan bukan dengan
                kesedihan, melainkan dengan tawa dan rasa hangat. Nostalgia bagi
                kamu adalah tentang apresiasi terhadap momen-momen ringan yang
                dulu terasa biasa seperti candaan spontan, rutinitas konyol,
                atau ketulusan yang sederhana. Kamu mengingatnya temanmu karena
                kebersamaan yang tulus dan lucu, yang sangat cocok dengan
                kepribadianmu yang santai dan mampu menyeimbangkan kehidupan
                sosial.
              </p>
            </div> */}

            {/* Section 5: Efek Nostalgia dalam Pekerjaan/Akademik */}
            {/* <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="bg-emerald-600 rounded-full p-2 sm:p-3 flex-shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="bg-emerald-600 rounded-full px-2 sm:px-6 py-1.5 sm:py-2">
                <span className="text-white font-semibold text-sm sm:text-base">
                  efek nostalgia dalam pekerjaan/akademik
                </span>
              </div>
            </div>
            <div className="border-2 sm:border-4 border-black bg-white rounded-lg p-4 sm:p-6">
              <p className="text-black text-sm sm:text-base leading-relaxed">
                Dalam dunia kerja dan akademik, karakter Original memaknai
                nostalgia dengan cara reflektif. Mereka mengingat lembur yang
                penuh tawa, presentasi pertama yang grogi, atau momen ketika
                satu tim berjuang keras sampai pagi. Mereka bukan tipe yang haus
                kemenangan, melainkan orang yang menghargai proses. Saat menatap
                ke belakang, yang mereka rasakan bukan kelelahan, melainkan rasa
                bangga karena pernah bertumbuh.
              </p>
            </div> */}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-3 sm:px-4 md:px-6 mt-6">
            <button
              className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md text-sm sm:text-base"
              onClick={handleRetry}
            >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
              Ulangi Tes
            </button>

            <button className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md text-sm sm:text-base">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              Bagikan
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

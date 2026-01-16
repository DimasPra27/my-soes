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
  traits: string[];
  personalities: PersonalityDetail[];
}

interface PersonalityDetail {
  title: string;
  description: string;
}

interface Customer {
  name: string;
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
      setPersonalities(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function calculatePersonality() {
    if (!customer || !customer.answers) return null;

    const categoryTotals: Record<string, number> = {};

    Object.values(customer.answers ?? {}).forEach((ans) => {
      if (!categoryTotals[ans.category]) {
        categoryTotals[ans.category] = 0;
      }
      categoryTotals[ans.category] += ans.answer;
    });

    const result = [];

    const grandTotal = Object.values(categoryTotals).reduce(
      (sum, val) => sum + val,
      0
    );

    const percentages: Record<string, number> = {};
    Object.keys(categoryTotals).forEach((cat) => {
      percentages[cat] = Math.round((categoryTotals[cat] / grandTotal) * 100);
    });

    const pandanTotal = categoryTotals["PANDAN"] || 0;
    const kleponTotal = categoryTotals["KLEPON"] || 0;
    const originalTotal = categoryTotals["ORIGINAL"] || 0;

    const totals = [
      { category: "PANDAN", total: pandanTotal },
      { category: "KLEPON", total: kleponTotal },
      { category: "ORIGINAL", total: originalTotal },
    ];

    const dominant = totals.reduce((max, curr) =>
      curr.total > max.total ? curr : max
    );

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
        traits: match.traits,
      });
    }

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
    router.push("/form");
  };

  useEffect(() => {
    getPersonality();
  }, []);

  useEffect(() => {
    if (customer && personalities.length > 0) {
      const r = calculatePersonality();
      if (!r || r.length === 0) return;

      const sorted = Object.entries(r[0]?.percentages || {})
        .filter(([category]) => r[0].categoryTotals[category] > 0)
        .sort(([, a], [, b]) => b - a);

      setSortedCategories(sorted);
      setResult(r ?? []);
    }
  }, [customer, personalities]);

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-8 max-w-7xl w-full items-center mx-auto">
      {result.map((res, i) => (
        <div key={i}>
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-8">
            {/* Left Column */}
            <div>
              <p className="text-left text-emerald-700 font-medium mb-4 text-lg">
                Hi, {customer?.name} <br />
                Wah ternyata, kamu itu...
              </p>

              <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl py-3 mb-6 shadow-md">
                <h1 className="text-white text-4xl font-bold text-center">
                  {res.category}
                </h1>
              </div>

              <div className="bg-pink-200 rounded-3xl p-8 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-72 bg-emerald-600 rounded-full"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-4">
                    <img
                      src={
                        res.category === "PANDAN"
                          ? "personality/Main-Pandan.png"
                          : res.category === "KLEPON"
                          ? "personality/Main-Klepon.png"
                          : "personality/Main-Original.png"
                      }
                      className="w-48 h-auto pointer-events-none"
                      draggable="false"
                      alt="character"
                    />
                  </div>

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

              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="mb-4">
                  <h3 className="text-emerald-700 font-bold text-xl mb-3">
                    Varian rasa
                  </h3>

                  <div className="text-emerald-600 font-bold text-2xl mb-4">
                    {res.category}
                  </div>

                  {result[0]?.traits && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {result[0].traits.map((trait: string, idx: number) => (
                        <div
                          key={idx}
                          className="bg-[#3D8B4E] text-white px-4 py-1.5 rounded-full text-sm font-medium"
                        >
                          {trait}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex flex-col space-y-3 flex-1 min-w-0">
                    {sortedCategories.map(([category, percentage], index) => (
                      <div key={category} className="flex items-center gap-3">
                        <span className="text-emerald-700 font-medium w-20 text-left text-base flex-shrink-0 capitalize">
                          {category.toLowerCase()}
                        </span>
                        <div className="flex-1 bg-pink-200 rounded-full h-6 overflow-hidden min-w-0">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              index === 0 ? "bg-emerald-600" : "bg-emerald-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span
                          className="text-emerald-700 font-bold w-12 text-right text-base flex-shrink-0"
                          style={{ fontFamily: "'pulang'" }}
                        >
                          {percentage}%
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-emerald-600 rounded-xl flex items-center justify-center overflow-hidden">
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
                        alt="sub-character"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {res.personalities.map((p: any, idx: number) => (
                <div key={idx}>
                  {idx === 0 ? (
                    <>
                      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-4 text-center mb-4">
                        <h3 className="text-white font-bold text-lg leading-tight">
                          {p.title}
                        </h3>
                      </div>
                      <div className="border-4 border-black bg-yellow-50 rounded-lg p-6 mb-4">
                        <p className="text-black text-base text-lg">
                          {p.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        {renderIcon(idx, p.title)}
                      </div>
                      <div className="border-4 border-black bg-white rounded-lg p-6 mb-4">
                        <p className="text-black text-base text-lg">
                          {p.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}

              <div className="flex gap-4 mt-6">
                <button
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
                  onClick={handleRetry}
                >
                  <RefreshCw className="w-5 h-5" />
                  Ulangi Tes
                </button>
                {/* 
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md">
                  <Share2 className="w-5 h-5" />
                  Bagikan
                </button> */}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <p className="text-center text-emerald-700 font-medium mb-4 text-lg">
              Hi, {customer?.name} <br />
              Wah ternyata, kamu itu...
            </p>

            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl py-2 mb-6 shadow-md">
              <h1 className="text-white text-4xl font-bold text-center">
                {res.category}
              </h1>
            </div>

            <div className="bg-pink-200 rounded-3xl p-8 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 bg-emerald-600 rounded-full"></div>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4">
                  <img
                    src={
                      res.category === "PANDAN"
                        ? "personality/Main-Pandan.png"
                        : res.category === "KLEPON"
                        ? "personality/Main-Klepon.png"
                        : "personality/Main-Original.png"
                    }
                    className="w-40 h-auto pointer-events-none"
                    draggable="false"
                    alt="character"
                  />
                </div>

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

            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="mb-4">
                <h3 className="text-emerald-700 font-bold text-xl mb-3">
                  Varian rasa
                </h3>

                <div className="text-emerald-600 font-bold text-2xl mb-4">
                  {res.category}
                </div>

                {result[0]?.traits && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {result[0].traits.map((trait: string, idx: number) => (
                      <div
                        key={idx}
                        className="bg-[#3D8B4E] text-white px-3 py-1.5 rounded-full text-xs font-medium"
                      >
                        {trait}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-row items-center justify-between gap-3">
                <div className="flex flex-col space-y-2 flex-1 min-w-0">
                  {sortedCategories.map(([category, percentage], index) => (
                    <div key={category} className="flex items-center gap-2">
                      <span className="text-emerald-700 font-medium w-14 text-left text-xs flex-shrink-0 capitalize">
                        {category.toLowerCase()}
                      </span>
                      <div className="flex-1 bg-pink-200 rounded-full h-4 overflow-hidden min-w-0">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            index === 0 ? "bg-emerald-600" : "bg-emerald-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span
                        className="text-emerald-700 font-bold w-8 text-right text-xs flex-shrink-0"
                        style={{ fontFamily: "'pulang'" }}
                      >
                        {percentage}%
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-emerald-600 rounded-xl flex items-center justify-center overflow-hidden">
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
                      alt="sub-character"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {res.personalities.map((p: any, idx: number) => (
                <div key={idx}>
                  {idx === 0 ? (
                    <>
                      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-3 text-center mb-4">
                        <h3 className="text-white font-bold text-base leading-tight">
                          {p.title}
                        </h3>
                      </div>
                      <div className="border-2 border-black bg-yellow-50 rounded-lg p-4">
                        <p className="text-black text-sm text-lg">
                          {p.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        {renderIcon(idx, p.title)}
                      </div>
                      <div className="border-2 border-black bg-white rounded-lg p-4">
                        <p className="text-black text-sm text-lg">
                          {p.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <button
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md text-sm"
                onClick={handleRetry}
              >
                <RefreshCw className="w-4 h-4" />
                Ulangi Tes
              </button>

              {/* <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md text-sm">
                <Share2 className="w-4 h-4" />
                Bagikan
              </button> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

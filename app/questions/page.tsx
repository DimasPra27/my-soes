"use client";
import { useState } from "react";

import QuestionDetails from "./questions-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { CustomSelect } from "@/components/ui/CustomSelect";

const questions = [
  {
    number: 1,
    title: "Question 1",
    description: "Bagaimana perasaan Anda setelah memakan kue soes ini?",
  },
  {
    number: 2,
    title: "Question 2",
    description: "Seberapa sering Anda membeli kue soes dari kami?",
  },
  {
    number: 3,
    title: "Question 3",
    description:
      "Apakah Anda akan merekomendasikan kue soes kami kepada orang lain?",
  },
  {
    number: 4,
    title: "Question 4",
    description: "Seberapa puas Anda dengan rasa kue soes kami?",
  },
  {
    number: 5,
    title: "Question 5",
    description:
      "Bagaimana penilaian Anda terhadap presentasi/penyajian kue soes?",
  },
  {
    number: 6,
    title: "Question 6",
    description: "Apakah harga kue soes sesuai dengan kualitasnya?",
  },
  {
    number: 7,
    title: "Question 7",
    description: "Apakah Anda menemukan variasi rasa yang Anda sukai?",
  },
  {
    number: 8,
    title: "Question 8",
    description:
      "Seberapa besar kemungkinan Anda membeli lagi dalam 1 bulan ke depan?",
  },
  {
    number: 9,
    title: "Question 9",
    description: "Apakah ada saran untuk perbaikan produk atau layanan kami?",
  },
  {
    number: 10,
    title: "Question 10",
    description: "Komentar tambahan (opsional)",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(questions[0].number.toString());
  const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});

  const isTabEnabled = (num: number) => {
    if (num === 1) return true;
    return answers[num - 1] !== undefined;
  };

  const handleAnswer = (num: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [num]: value,
    }));

    const next = num + 1;
    if (next <= questions.length) {
      setTimeout(() => {
        setActiveTab(next.toString());
      }, 300);
    }
  };

  const handleSubmit = () => {
    const totalAnswered = Object.keys(answers).length;

    if (totalAnswered !== questions.length) {
      const unanswered = questions
        .filter((q) => answers[q.number] === undefined)
        .map((q) => q.number)
        .join(", ");

      alert(`Masih ada pertanyaan yang belum dijawab:\nNomor: ${unanswered}`);
      return;
    }

    alert("Terima kasih! Semua jawaban sudah lengkap.");
  };

  const answeredCount = Object.values(answers).filter((v) => v !== null).length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <Tabs
      value={activeTab}
      onValueChange={(val) => {
        const num = Number(val);
        if (isTabEnabled(num)) setActiveTab(val);
      }}
    >
      <TabsList
        className="grid h-auto w-full gap-4"
        style={{
          gridTemplateColumns: `repeat(${questions.length}, minmax(0, 1fr))`,
        }}
      >
        {questions.map(({ number, title, description }) => (
          <TabsTrigger
            key={number}
            value={number.toString()}
            disabled={!isTabEnabled(number)}
            className={`flex flex-col items-center py-2
              ${
                !isTabEnabled(number)
                  ? "opacity-30 cursor-not-allowed"
                  : "cursor-pointer"
              }
            `}
          >
            <QuestionDetails
              number={number.toString()}
              title={title}
              isActive={activeTab === number.toString()}
            />
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Progress Bar */}
      <div className="w-full px-6 mt-6">
        <div className="text-white mb-2 text-lg font-semibold drop-shadow-md">
          Progress: {answeredCount} / {questions.length}
        </div>

        <div className="w-full bg-emerald-900/40 rounded-full h-4 overflow-hidden border border-emerald-700/40 backdrop-blur-md">
          <div
            className="h-full bg-emerald-400 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <Card>
        {questions.map(({ number, title, description }) => (
          <TabsContent key={number} value={number.toString()} className="p-6">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
              <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none text-white drop-shadow-md">
                {title}
              </h1>
              <div className="w-full lg:max-w-xl p-8 space-y-8 bg-emerald-950/60 backdrop-blur-md rounded-xl shadow-2xl border border-emerald-700/30">
                <p className="mb-6 text-lg font-normal text-emerald-100 lg:text-xl">
                  {description}
                </p>
                <CustomSelect
                  value={answers[number] ?? 0}
                  onChange={(value) => handleAnswer(number, value)}
                />

                {number === questions.length && (
                  <button
                    onClick={handleSubmit}
                    className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md transition-all"
                  >
                    Submit Jawaban
                  </button>
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </Card>
    </Tabs>
  );
}

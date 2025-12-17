"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import QuestionDetails from "./questions-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

import { CustomSelect } from "@/components/ui/CustomSelect";

interface Question {
  title: string;
  number: number;
  description: string;
  category: string;
}

interface Answer {
  answer: number;
  category: string;
}

export default function Home() {
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("1");
  const [answers, setAnswers] = useState<{
    [key: number]: Answer | null;
  }>({});

  async function getQuestions() {
    try {
      const questions = await fetch("/api/question", { cache: "no-store" });
      if (!questions.ok) throw new Error("Failed fetch questions");

      const json = await questions.json();
      console.log(json);

      setQuestions(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveCustomer() {
    const data = localStorage.getItem("myData");
    const storedData = data ? JSON.parse(data) : null;

    const res = await fetch("/api/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: storedData.name,
        email: storedData.email,
        msisdn: storedData.phoneNumber,
        rate: storedData.rate,
        comment: storedData.comment,
      }),
    });
  }

  useEffect(() => {
    getQuestions();
  }, []);

  const isTabEnabled = (num: number) => {
    if (num === 1) return true;
    return answers[num - 1] !== undefined;
  };

  const handleAnswer = (num: number, value: number, cateogry: string) => {
    setAnswers((prev) => ({
      ...prev,
      [num]: {
        answer: value,
        category: cateogry,
      },
    }));

    // const next = num + 1;
    // if (next <= questions.length) {
    //   setTimeout(() => {
    //     setActiveTab(next.toString());
    //   }, 300);
    // }
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

    const data = localStorage.getItem("myData");
    const storedData = data ? JSON.parse(data) : null;

    const updated = {
      ...storedData,
      answers,
    };

    console.log(updated);
    localStorage.setItem("myData", JSON.stringify(updated));

    // alert("Terima kasih! Semua jawaban sudah lengkap.");
    //save customer
    saveCustomer();
    const res = router.push("/personality");
  };

  const goToPrev = () => {
    const currentNum = Number(activeTab);
    if (currentNum > 1) {
      setActiveTab((currentNum - 1).toString());
    }

    // handleAnswer(currentNum, answers[currentNum] ?? 0);
  };

  const goToNext = () => {
    const currentNum = Number(activeTab);
    if (currentNum < questions.length) {
      setActiveTab((currentNum + 1).toString());
    }
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
      {/* <TabsList
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
      </TabsList> */}

      {/* Progress Bar */}
      <div className="w-full px-6 max-w-screen-xl mx-auto lg:mb-6">
        <div className="text-white mb-2 text-lg font-semibold drop-shadow-md">
          Progres: {answeredCount} / {questions.length}
        </div>

        <div className="w-full bg-[#E3FFE6] rounded-full h-4 overflow-hidden border border-emerald-700/40 backdrop-blur-md">
          <div
            className="h-full bg-[#0C7A3F] transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* <Card className="w-full max-w-screen-xl mx-auto h-fit bg-emerald-900/30 backdrop-blur-xl p-4 rounded-3xl"> */}
      {questions.map(({ number, title, description, category }) => (
        <TabsContent key={number} value={number.toString()} className="p-0">
          <div className="flex flex-col items-center justify-center lg:justify-between gap-2 sm:gap-2 py-6 sm:py-10 lg:py-0">
            <Card>
              <p className="mb-6 text-lg font-normal text-emerald-100 lg:text-xl">
                {description}
              </p>
            </Card>

            <div className="w-full lg:max-w-xl p-4 space-y-8  ">
              {/* <div className="flex items-center justify-between mt-2">
                <button
                  onClick={goToPrev}
                  disabled={number === 1}
                  className={`flex items-center gap-2 px-3 font-semibold transition-all ${
                    number === 1
                      ? "text-emerald-700/50 cursor-not-allowed"
                      : "hover:bg-emerald-600 hover:rounded-xl text-white cursor-pointer"
                  }`}
                >
                  <span>←</span> Prev
                </button>
                {answers[number] !== undefined && (
                  <button
                    onClick={
                      // number === questions.length ? handleSubmit : goToNext
                      goToNext
                    }
                    className="flex items-center gap-2 px-3 hover:bg-emerald-500 hover:rounded-xl text-white font-semibold transition-all cursor-pointer"
                  >
                    {number === questions.length ? " " : "Next"}{" "}
                    {number !== questions.length && <span>→</span>}
                  </button>
                )}
              </div> */}

              {/* <p className="mb-6 text-lg font-normal text-emerald-100 lg:text-xl">
                {description}
              </p> */}
              <CustomSelect
                value={answers[number]?.answer ?? 0}
                onChange={(value) => handleAnswer(number, value, category)}
              />

              <div className="flex justify-center mt-8">
                {number === questions.length ? (
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-[#3D8B4E] hover:bg-[#2d6939] text-white font-bold rounded-lg shadow-md transition-all"
                  >
                    Lihat Hasil
                  </button>
                ) : (
                  <button
                    onClick={goToNext}
                    disabled={answers[number] === undefined}
                    className={`px-8 py-3 font-bold rounded-lg shadow-md transition-all ${
                      answers[number] === undefined
                        ? "bg-gray-500/50 text-gray-400 cursor-not-allowed"
                        : "bg-[#3D8B4E] hover:bg-[#2d6939] text-white"
                    }`}
                  >
                    Selanjutnya
                  </button>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      ))}
      {/* </Card> */}
    </Tabs>
  );
}

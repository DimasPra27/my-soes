"use client";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { StarRating } from "@/components/ui/StartRating";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  phoneNumber: string;
  rate: number;
  comment: string;
}

interface FormErrors {
  name?: string;
  phoneNumber?: string;
}

export default function Form() {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    name: "",
    phoneNumber: "",
    rate: 0,
    comment: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Name wajib diisi.";
    if (!form.phoneNumber.trim())
      newErrors.phoneNumber = "Phone Number wajib diisi.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Submit berhasil:", form);
    // Using in-memory storage instead of localStorage
    sessionStorage.setItem("myData", JSON.stringify(form));

    router.push("/questions");
  };

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex justify-end items-start pt-8 pr-8">
        <Card className="w-full max-w-md lg:px-12 lg:py-8 p-4 rounded-3xl">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col gap-3 items-center text-center">
              <h1
                className="text-3xl lg:text-5xl text-white"
                style={{ fontFamily: "'pulang', sans-serif" }}
              >
                Selamat Datang!
              </h1>
              <p className="text-base lg:text-xl font-normal text-white">
                Temukan kenagan manis bersama kami! Isi formulir singkat ini dan
                bagikan pengalaman Anda menikmati kue soes kami
              </p>
            </div>

            <div className="w-full">
              <div className="space-y-6">
                <div>
                  <Input
                    type="text"
                    className="bg-[#FFB5DA] placeholder-[#096831] text-sm border-1 border-[#FFB5DA] h-10 focus:ring-2 focus:ring-[#FFB5DA] focus:border-[#FFB5DA] text-[#096831] rounded-3xl"
                    placeholder="Nama"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-green-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Input
                    type="text"
                    className="bg-[#FFB5DA] placeholder-[#096831] text-sm border-2 border-[#FFB5DA] h-10 focus:ring-2 focus:ring-[#FFB5DA] focus:border-[#FFB5DA] text-[#096831] rounded-3xl"
                    placeholder="+081xxxxxxxx"
                    id="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber && (
                    <p className="text-green-500 text-sm mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    id="comment"
                    placeholder="Enak banget kue soes nya..."
                    className="h-20 bg-[#FFB5DA] placeholder-[#096831] border-2 border-[#FFB5DA] text-[#096831] text-sm focus:ring-2 focus:ring-[#FFB5DA] focus:border-[#FFB5DA] block w-full p-2.5 rounded-3xl"
                    value={form.comment}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="flex justify-center">
                  <StarRating
                    value={form.rate}
                    onChange={(value) =>
                      setForm({
                        ...form,
                        rate: value,
                      })
                    }
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleSubmit}
                    className="px-20 py-2 text-base font-bold text-[#0C7A3F] rounded-full bg-[#FFFFFF] hover:bg-gray-100 focus:ring-4 focus:ring-emerald-300 transition-all shadow-md"
                  >
                    Masuk
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0C7A3F] rounded-t-[6.5rem] px-6 pt-8 pb-6 shadow-2xl z-50">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h1
              className="text-2xl font-bold text-white mb-3"
              style={{ fontFamily: "'pulang', sans-serif" }}
            >
              Selamat Datang!
            </h1>
            <p className="text-sm text-white leading-relaxed">
              Temukan kenagan manis bersama kami! Isi formulir singkat ini dan
              bagikan pengalaman Anda menikmati kue soes kami
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Input
                type="text"
                className="bg-[#FFB5DA] placeholder-[#096831] text-sm border-0 h-12 focus:ring-2 focus:ring-[#FFB5DA] focus:border-[#FFB5DA] text-[#096831] rounded-2xl w-full"
                placeholder="Nama"
                id="name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-pink-200 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Input
                type="text"
                className="bg-[#FFB5DA] placeholder-[#096831] text-sm border-0 h-12 focus:ring-2 focus:ring-[#FFB5DA] focus:border-[#FFB5DA] text-[#096831] rounded-2xl w-full"
                placeholder="+081xxxxxxxx"
                id="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <p className="text-pink-200 text-xs mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div>
              <textarea
                name="message"
                id="comment"
                placeholder="Enak banget kue soes nya..."
                className="h-24 bg-[#FFB5DA] placeholder-[#096831] border-0 text-[#096831] text-sm focus:ring-2 focus:ring-[#FFB5DA] focus:border-[#FFB5DA] block w-full p-3 rounded-2xl resize-none"
                value={form.comment}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex justify-center py-2">
              <StarRating
                value={form.rate}
                onChange={(value) =>
                  setForm({
                    ...form,
                    rate: value,
                  })
                }
              />
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={handleSubmit}
                className="px-20 py-3 text-base font-bold text-[#0C7A3F] rounded-full bg-white hover:bg-gray-100 focus:ring-4 focus:ring-white/30 transition-all shadow-lg"
              >
                Masuk
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

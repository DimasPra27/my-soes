"use client";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import { StarRating } from "@/components/ui/StartRating";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { json } from "stream/consumers";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Submit berhasil:", form);
    localStorage.setItem("myData", JSON.stringify(form));

    router.push("/questions");
  };

  return (
    <Card className="w-full max-w-screen-xl lg:mx-230 lg:w-[700px] p-4 rounded-3xl mt-15 lg:mt-30">
      <div className="flex flex-col items-center justify-center lg:justify-between sm:gap-5 gap-3 sm:py-10 lg:py-0">
        <div className="flex flex-col gap-3 items-center text-center flex-1 justify-center lg:mt-0 min-h-[auto]">
          {/* <img
              src="/Logo.png"
              alt=""
              className="w-32 h-auto sm:w-40 mx-auto"
            /> */}
          <h1 className="text-3xl lg:text-5xl text-white" style={{ fontFamily: "'pulang', sans-serif" }}>
            Selamat Datang!
          </h1>
          <p className="text-base lg:text-xl font-normal text-white">
            Temukan kenagan manis bersama kami! Isi formulir singkat ini dan
            bagikan pengalaman Anda menikmati kue soes kami
          </p>
        </div>

        <div className="w-full shrink-0">
          {/* <div className="w-full max-w-md p-4 sm:p-6 space-y-6 bg-emerald-950/60 backdrop-blur-md rounded-xl shadow-2xl border border-emerald-700/30 "> */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              {/* <label className="block mb-2 text-sm font-medium text-emerald-100">
                Nama
              </label> */}
              <Input
                type="text"
                className="bg-[#FFB5DA] placeholder-[#096831] text-sm border-1 border-[#FFB5DA] h-10 focus:ring-2 focus:ring-[#FFB5DA] focus:border-[#FFB5DA] text-[#096831] rounded-3xl"
                placeholder="Nama"
                id="name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-green-500 text-sm">{errors.name}</p>
              )}
            </div>
            {/* 
            <div>
              <label className="block mb-2 text-sm font-medium text-emerald-100">
                Email
              </label>
              <Input
                type="email"
                className="bg-[#FFB5DA] placeholder-[#096831] text-sm border-2 border-[#FFB5DA] h-10 focus:ring-2 focus:ring-[#FFB5DA] focus:border-[#FFB5DA] text-[#096831] rounded-3xl"
                placeholder="Email"
                id="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-green-500 text-sm">{errors.email}</p>
              )}
            </div> */}

            <div>
              {/* <label className="block mb-2 text-sm font-medium text-emerald-100">
                Phone Number
              </label> */}
              <Input
                type="text"
                className="bg-[#FFB5DA] placeholder-[#096831] text-sm border-2 border-[#FFB5DA] h-10 focus:ring-2 focus:ring-[#FFB5DA] focus:border-[#FFB5DA] text-[#096831] rounded-3xl"
                placeholder="+081xxxxxxxx"
                id="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <p className="text-green-500 text-sm">{errors.phoneNumber}</p>
              )}
            </div>

            <div>
              {/* <label className="block mb-2 text-sm font-medium text-emerald-100">
                Impression
              </label> */}
              <textarea
                name="message"
                id="message"
                placeholder="Enak banget kue soes nya..."
                className="h-20 bg-[#FFB5DA] placeholder-[#096831] border-2 border-[#FFB5DA] text-[#096831] text-sm focus:ring-2 focus:ring-[#FFB5DA] focus:border-[#FFB5DA] block w-full p-2.5 rounded-3xl "
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
                type="submit"
                className="px-30 py-2 text-base font-bold text-[#0C7A3F] rounded-full bg-[#FFFFFF] hover:bg-gray-100 focus:ring-4 focus:ring-emerald-300 transition-all shadow-md"
              >
                Masuk
              </button>
            </div>
          </form>
          {/* </div> */}
        </div>
      </div>
    </Card>
  );
}

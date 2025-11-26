"use client";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import { StarRating } from "@/components/ui/StartRating";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { json } from "stream/consumers";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  rate: number;
  comment: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phoneNumber?: string;
}

export default function Form() {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
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
    if (!form.email.trim()) newErrors.email = "Email wajib diisi.";
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
    <div>
      <Card className="w-full max-w-screen-xl mx-auto h-fit bg-emerald-900/30 backdrop-blur-xl p-4 rounded-3xl">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 sm:gap-10 lg:gap-20 py-6 sm:py-10 lg:py-0">
          <div className="flex flex-col gap-5 items-center text-center flex-1 justify-center mt-4 sm:mt-6 lg:mt-0 min-h-[auto] lg:min-h-[45vh]">
            <img
              src="/Logo.png"
              alt=""
              className="w-32 h-auto sm:w-40 mx-auto"
            />
            <p className="mb-6 text-lg font-normal text-emerald-100 lg:text-xl">
              Saya meminta untuk apresiasi customer untuk memberikan kami
              masukan :
            </p>
          </div>

          <div className="w-full max-w-md shrink-0">
            <div className="w-full max-w-md p-4 sm:p-6 space-y-6 bg-emerald-950/60 backdrop-blur-md rounded-xl shadow-2xl border border-emerald-700/30 ">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-emerald-100">
                    Name
                  </label>
                  <Input
                    type="text"
                    className=""
                    placeholder="Your Name"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-green-500 text-sm">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-emerald-100">
                    Email
                  </label>
                  <Input
                    type="email"
                    className=""
                    placeholder="Your Email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-green-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-emerald-100">
                    Phone Number
                  </label>
                  <Input
                    type="text"
                    className=""
                    placeholder="+081xxxxxxxx"
                    id="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber && (
                    <p className="text-green-500 text-sm">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-emerald-100">
                    Impression
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Enak banget kue soes nya"
                    className="h-20 bg-emerald-900/50 border border-emerald-700 text-emerald-50 placeholder-emerald-300 text-sm rounded-lg focus:ring-emerald-400 focus:border-emerald-400 block w-full p-2.5"
                  ></textarea>
                </div>
                <StarRating
                  value={form.rate}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      rate: value,
                    })
                  }
                />
                <button
                  type="submit"
                  className="w-full px-5 py-3 text-base font-semibold text-white rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 focus:ring-4 focus:ring-emerald-300 transition-all"
                >
                  Next
                </button>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

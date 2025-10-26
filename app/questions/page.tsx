import Image from "next/image";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <Card>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none text-white drop-shadow-md">
            Podjok Soes
          </h1>
          <p className="mb-6 text-lg font-normal text-emerald-100 lg:text-xl">
            Saya meminta untuk apresiasi customer untuk memberikan kami masukan
            :
          </p>
        </div> */}

        <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none text-white drop-shadow-md">
          Question 1
        </h1>
        <div className="w-full lg:max-w-xl p-8 space-y-8 bg-emerald-950/60 backdrop-blur-md rounded-xl shadow-2xl border border-emerald-700/30">
          <p className="mb-6 text-lg font-normal text-emerald-100 lg:text-xl">
            Saya meminta untuk apresiasi customer untuk memberikan kami masukan
            :
          </p>
          <Input
            type="text"
            className="h-20"
            placeholder="Enakk Banget"
            id="email"
          />
        </div>
        {/* <CardHeader>Question 1</CardHeader> */}
        {/* <CardTitle>Ini adalah Title</CardTitle> */}
        {/* <CardDescription>
          Bagai mana Persaaan Anda setelah memakan kue soes ini : ?
        </CardDescription> */}
      </div>
    </Card>
  );
}

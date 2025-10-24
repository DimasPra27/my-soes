import Image from "next/image";
import { Form } from "./form/page";

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[url(/Hijau.jpg)]">
    //   <div className="flex w-[var(--carousel-item-width)] flex-col items-center gap-5 px-2 py-6">
    //     <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
    //     <Image src="/Hijau.jpg" alt="Profile" width={100} height={100} />
    //   </div>
    // </main>

    <>
      {/* <Card /> */}
      {/* <Features /> */}
      <Form />
    </>
  );
}

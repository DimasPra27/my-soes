// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// import filePath from "../../../public/data/question.json";

// // const filePath = process.cwd() + "/public/data/question.json";

// // interface Question {
// //   name: string;
// //   category: string;
// // }

// function readData() {
//   if (!fs.existsSync(filePath)) return [];
//   const json = fs.readFileSync(filePath, "utf8");

//   return JSON.parse(json);
// }

// function saveData(data: any[]) {
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// }

// // =============================
// //            GET
// // =============================
// export async function GET() {
//   try {
//     console.log("masuk di sini");
//     const questions = readData();

//     return NextResponse.json(questions, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
//   }
// }

// // =============================
// //            POST
// // =============================
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const { title, category } = body;

//     // ============================
//     //        VALIDASI INPUT
//     // ============================
//     if (!title || typeof title !== "string" || title.trim() === "") {
//       return NextResponse.json(
//         { error: "Title wajib diisi." },
//         { status: 400 }
//       );
//     }

//     // ============================
//     //   Simpan ke JSON (append)
//     // ============================
//     const existing = readData();

//     const newData = {
//       id: Date.now(),
//       title,
//       category,
//       createdAt: new Date().toISOString(),
//     };

//     existing.push(newData);

//     saveData(existing);

//     return NextResponse.json({ success: true, data: newData }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Terjadi kesalahan di server." },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import questions from "../data/question.json"; // ⬅ import langsung JSON

// =============================
//            GET
// =============================
export async function GET() {
  try {
    return NextResponse.json(questions, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

// =============================
//            POST (Simulasi / Dummy)
// =============================
// Catatan: Netlify TIDAK bisa menulis file JSON
// Jadi kita hanya memberikan response sukses palsu
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category } = body;

    // VALIDASI INPUT
    if (!title || typeof title !== "string" || title.trim() === "") {
      return NextResponse.json(
        { error: "Title wajib diisi." },
        { status: 400 }
      );
    }

    const newData = {
      id: Date.now(),
      title,
      category,
      createdAt: new Date().toISOString(),
    };

    // 🚫 Tidak bisa save ke JSON
    // Jadi kita return saja tanpa write file
    return NextResponse.json(
      {
        success: true,
        message: "Data diterima (TIDAK disimpan karena Netlify read-only).",
        data: newData,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan di server." },
      { status: 500 }
    );
  }
}

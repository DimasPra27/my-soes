import { NextResponse } from "next/server";
import fs from "fs";

const filePath = process.cwd() + "/public/api/data/result.json";

function readData() {
  if (!fs.existsSync(filePath)) return [];
  const json = fs.readFileSync(filePath, "utf8");

  return JSON.parse(json);
}

function saveData(data: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// =============================
//            GET
// =============================
export async function GET() {
  try {
    console.log("masuk di sini");
    const questions = readData();

    return NextResponse.json(questions, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

// =============================
//            POST
// =============================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, msisdn, comment, rate } = body;

    // ============================
    //        VALIDASI INPUT
    // ============================
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Name wajib diisi." }, { status: 400 });
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email tidak valid." },
        { status: 400 }
      );
    }

    if (!msisdn || msisdn.length < 8) {
      return NextResponse.json(
        { error: "MSISDN tidak valid." },
        { status: 400 }
      );
    }

    if (!comment || comment.trim().length < 3) {
      return NextResponse.json(
        { error: "Comment minimal 3 karakter." },
        { status: 400 }
      );
    }

    if (typeof rate !== "number" || rate < 1 || rate > 5) {
      return NextResponse.json(
        { error: "Rate harus angka 1–5." },
        { status: 400 }
      );
    }

    // ============================
    //   Simpan ke JSON (append)
    // ============================
    const existing = readData();

    const newData = {
      id: Date.now(),
      name,
      email,
      msisdn,
      comment,
      rate,
      createdAt: new Date().toISOString(),
    };

    existing.push(newData);

    saveData(existing);

    return NextResponse.json({ success: true, data: newData }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan di server." },
      { status: 500 }
    );
  }
}

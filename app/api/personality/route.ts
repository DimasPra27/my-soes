import { NextResponse } from "next/server";
import fs from "fs";

const filePath = process.cwd() + "/app/api/data/personality.json";

function readData() {
  if (!fs.existsSync(filePath)) return [];
  const json = fs.readFileSync(filePath, "utf8");

  return JSON.parse(json);
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

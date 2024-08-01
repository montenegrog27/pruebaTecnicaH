import fs from "fs";
import path from "path";

const FILES_PATH = path.join(process.cwd(), "files.json");

export async function GET() {
  if (fs.existsSync(FILES_PATH)) {
    const files = JSON.parse(fs.readFileSync(FILES_PATH, "utf8"));
    return new Response(JSON.stringify(files), { status: 200 });
  }
  return new Response(JSON.stringify([]), { status: 200 });
}

export async function POST(req) {
  const file = await req.json();
  let files = JSON.parse(fs.readFileSync(FILES_PATH, "utf8"));
  files.push(file);
  fs.writeFileSync(FILES_PATH, JSON.stringify(files));
  return new Response("File saved", { status: 200 });
}

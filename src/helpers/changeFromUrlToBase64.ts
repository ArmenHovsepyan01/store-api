import fs from "fs/promises";
import path from "path";

export async function changeToBase64(url: string) {
  try {
    const ext = path.extname(url).slice(1);
    const base64 = await fs.readFile(url, "base64");
    return `data:image/${ext};base64,${base64}`;
  } catch (e) {
    throw new Error(e);
  }
}

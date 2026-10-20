import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const ffmpegPath = path.resolve("node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe");
const ffprobePath = path.resolve("node_modules/@ffprobe-installer/win32-x64/ffprobe.exe");

const outDir = path.resolve("assets/raw/extracted");
fs.mkdirSync(outDir, { recursive: true });

const clips = [
  { name: "t12", src: "assets/raw/t12.mp4", startPhoto: "1-perusahaan", endPhoto: "2-kantor" },
  { name: "t23", src: "assets/raw/t23.mp4", startPhoto: "2-kantor", endPhoto: "3-server" },
  { name: "t34", src: "assets/raw/t34.mp4", startPhoto: "3-server", endPhoto: "4-pemeliharaan" },
  { name: "t45", src: "assets/raw/t45.mp4", startPhoto: "4-pemeliharaan", endPhoto: "5-penutup" },
];

console.log("=== STEP B: EXTRACTING FIRST & LAST FRAMES ===");
for (const c of clips) {
  const firstFrame = path.join(outDir, `${c.name}_first.png`);
  const lastFrame = path.join(outDir, `${c.name}_last.png`);

  // First frame
  execSync(`"${ffmpegPath}" -y -i "${c.src}" -vframes 1 "${firstFrame}"`);
  
  // Last frame (read duration)
  const probeOut = execSync(`"${ffprobePath}" -v error -show_entries format=duration -of csv=p=0 "${c.src}"`).toString().trim();
  const dur = parseFloat(probeOut);
  const seekTime = Math.max(0, dur - 0.1);
  execSync(`"${ffmpegPath}" -y -ss ${seekTime} -i "${c.src}" -vframes 1 "${lastFrame}"`);

  console.log(`Extracted for ${c.name}: ${firstFrame} and ${lastFrame}`);
}

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const ffmpegPath = path.resolve("node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe");
const ffprobePath = path.resolve("node_modules/@ffprobe-installer/win32-x64/ffprobe.exe");

console.log("=== STEP A: PHOTOS INTAKE ===");
const photos = [
  "assets/photos/1-perusahaan.png",
  "assets/photos/2-kantor.png",
  "assets/photos/3-server.png",
  "assets/photos/4-pemeliharaan.png",
  "assets/photos/5-penutup.png",
];

for (const p of photos) {
  try {
    const cmd = `"${ffprobePath}" -v error -select_streams v:0 -show_entries stream=width,height -of json "${p}"`;
    const out = execSync(cmd).toString();
    const data = JSON.parse(out).streams[0];
    const aspect = (data.width / data.height).toFixed(3);
    const is16x9 = Math.abs(data.width / data.height - 16 / 9) < 0.05;
    console.log(`${p}: ${data.width}x${data.height} (aspect: ${aspect}, 16:9? ${is16x9}, >=1920? ${data.width >= 1920})`);
  } catch (e) {
    console.error(p, e.message);
  }
}

console.log("\n=== STEP A: CLIPS INTAKE ===");
const clips = [
  "assets/raw/t12.mp4",
  "assets/raw/t23.mp4",
  "assets/raw/t34.mp4",
  "assets/raw/t45.mp4",
];

for (const c of clips) {
  try {
    const cmd = `"${ffprobePath}" -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,duration -show_entries format=duration -of json "${c}"`;
    const out = execSync(cmd).toString();
    const info = JSON.parse(out);
    const v = info.streams[0];
    const dur = parseFloat(v.duration || info.format.duration);
    const [num, den] = v.r_frame_rate.split("/").map(Number);
    const fps = (num / den).toFixed(2);
    const aspect = (v.width / v.height).toFixed(3);
    console.log(`${c}: ${v.width}x${v.height} (aspect: ${aspect}, fps: ${fps}, dur: ${dur.toFixed(2)}s)`);
  } catch (e) {
    console.error(c, e.message);
  }
}

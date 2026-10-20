import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const ffmpegPath = path.resolve("node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe");
const ffprobePath = path.resolve("node_modules/@ffprobe-installer/win32-x64/ffprobe.exe");

function getDirSize(dirPath) {
  let size = 0;
  if (!fs.existsSync(dirPath)) return 0;
  const files = fs.readdirSync(dirPath);
  for (const f of files) {
    const full = path.join(dirPath, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f !== "768") { // don't double count desktop vs mobile
        size += getDirSize(full);
      }
    } else {
      size += stat.size;
    }
  }
  return size;
}

function formatBytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

// 1. Process sequences
const sequences = [
  { name: "t12", src: "assets/raw/t12.mp4", count: 121 },
  { name: "t23", src: "assets/raw/t23.mp4", count: 121 },
  { name: "t34", src: "assets/raw/t34.mp4", count: 121 },
  { name: "t45", src: "assets/raw/t45.mp4", count: 121 },
];

console.log("=== PROCESSING SEQUENCES (Step C) ===");
for (const seq of sequences) {
  const outDir = path.resolve("public/films", seq.name);
  const out768 = path.join(outDir, "768");
  fs.mkdirSync(out768, { recursive: true });

  const durStr = execSync(`"${ffprobePath}" -v error -show_entries format=duration -of csv=p=0 "${seq.src}"`).toString().trim();
  const dur = parseFloat(durStr);
  const fps = (seq.count / dur).toFixed(4);

  console.log(`Processing ${seq.name} (${seq.count} frames, duration: ${dur}s, fps: ${fps})...`);

  // Desktop frames
  const cmdDesktop = `"${ffmpegPath}" -y -i "${seq.src}" -vf "fps=${fps},scale='min(1920,iw)':-2" -frames:v ${seq.count} -c:v libwebp -quality 78 -compression_level 6 -preset picture "${outDir}/f_%03d.webp"`;
  execSync(cmdDesktop, { stdio: "ignore" });

  // Mobile frames (768)
  const cmdMobile = `"${ffmpegPath}" -y -i "${seq.src}" -vf "fps=${fps},scale=768:-2" -frames:v ${seq.count} -c:v libwebp -quality 72 -compression_level 6 -preset picture "${out768}/f_%03d.webp"`;
  execSync(cmdMobile, { stdio: "ignore" });

  // Manifest
  const manifest = {
    tiers: {
      "768": { count: seq.count },
      "1440": { count: seq.count },
    },
  };
  fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));

  const desktopSize = getDirSize(outDir);
  const mobileSize = getDirSize(out768);
  console.log(`  -> ${seq.name} Desktop: ${formatBytes(desktopSize)} (budget: < 12 MB)`);
  console.log(`  -> ${seq.name} Mobile:  ${formatBytes(mobileSize)} (budget: < 4 MB)`);
}

// 2. Process ambient loops (Step D)
console.log("\n=== PROCESSING AMBIENT LOOPS (Step D) ===");
const loops = [
  { name: "perusahaan", photo: "assets/photos/1-perusahaan.png" },
  { name: "penutup", photo: "assets/photos/5-penutup.png" },
];

fs.mkdirSync("assets/raw", { recursive: true });
fs.mkdirSync("public/films", { recursive: true });

for (const lp of loops) {
  console.log(`Creating ambient loop for ${lp.name}...`);
  const fwd = `assets/raw/${lp.name}-fwd.mp4`;
  const loopMp4 = `public/films/${lp.name}-loop.mp4`;
  const posterJpg = `public/films/${lp.name}-loop-poster.jpg`;

  // Forward push-in video
  const cmdFwd = `"${ffmpegPath}" -y -i "${lp.photo}" -vf "scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,zoompan=z='1+0.0012*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1920x1080:fps=24" -frames:v 120 -an -c:v libx264 -crf 18 -pix_fmt yuv420p "${fwd}"`;
  execSync(cmdFwd, { stdio: "ignore" });

  // Seamless palindrome loop
  const cmdLoop = `"${ffmpegPath}" -y -i "${fwd}" -filter_complex "[0:v]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0[v]" -map "[v]" -an -c:v libx264 -crf 23 -pix_fmt yuv420p -movflags +faststart "${loopMp4}"`;
  execSync(cmdLoop, { stdio: "ignore" });

  // Poster
  const cmdPoster = `"${ffmpegPath}" -y -i "${fwd}" -frames:v 1 "${posterJpg}"`;
  execSync(cmdPoster, { stdio: "ignore" });

  const loopSize = fs.statSync(loopMp4).size;
  console.log(`  -> ${lp.name}-loop.mp4: ${formatBytes(loopSize)} (budget: < 12 MB)`);
}

console.log("\n=== ASSET PREPARATION COMPLETE ===");

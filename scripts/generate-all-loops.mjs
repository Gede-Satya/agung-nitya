import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const ffmpegPath = path.resolve("node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe");

const scenes = [
  { name: "kantor", photo: "assets/photos/2-kantor.png" },
  { name: "server", photo: "assets/photos/3-server.png" },
  { name: "pemeliharaan", photo: "assets/photos/4-pemeliharaan.png" },
];

for (const sc of scenes) {
  console.log(`Generating ambient loop for ${sc.name}...`);
  const fwd = `assets/raw/${sc.name}-fwd.mp4`;
  const loopMp4 = `public/films/${sc.name}-loop.mp4`;
  const posterJpg = `public/films/${sc.name}-loop-poster.jpg`;

  // 1. Forward push-in video
  const cmdFwd = `"${ffmpegPath}" -y -i "${sc.photo}" -vf "scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,zoompan=z='1+0.0012*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1920x1080:fps=24" -frames:v 120 -an -c:v libx264 -crf 18 -pix_fmt yuv420p "${fwd}"`;
  execSync(cmdFwd, { stdio: "inherit" });

  // 2. Seamless palindrome loop
  const cmdLoop = `"${ffmpegPath}" -y -i "${fwd}" -filter_complex "[0:v]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0[v]" -map "[v]" -an -c:v libx264 -crf 23 -pix_fmt yuv420p -movflags +faststart "${loopMp4}"`;
  execSync(cmdLoop, { stdio: "inherit" });

  // 3. Poster
  const cmdPoster = `"${ffmpegPath}" -y -i "${fwd}" -frames:v 1 "${posterJpg}"`;
  execSync(cmdPoster, { stdio: "inherit" });

  console.log(`Completed ${sc.name}: ${fs.statSync(loopMp4).size} bytes`);
}
console.log("ALL 5 SCENE LOOPS READY!");

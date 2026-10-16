import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { exec } from 'child_process';
import path from 'path';

const ffmpegPath = ffmpegInstaller.path;
const videoPath = 'public/videos/gemini_generated_video_ac174090.mp4';
const outputPattern = 'public/frames/laptop/%04d.webp';

// Extract at 30 fps, scale=1600:-1, quality 78
const cmd = `"${ffmpegPath}" -i "${videoPath}" -vf "fps=30,scale=1600:-1:flags=lanczos" -c:v libwebp -quality 78 -compression_level 6 "${outputPattern}"`;

console.log('Running extraction:', cmd);
const startTime = Date.now();

exec(cmd, (err, stdout, stderr) => {
  if (err) {
    console.error('Error extracting frames:', err);
    console.error(stderr);
    process.exit(1);
  }
  console.log(`Extraction complete in ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
});

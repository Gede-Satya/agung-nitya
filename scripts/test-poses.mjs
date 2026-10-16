import { getLayout, poseFor, poseTransform } from "../components/ui/formation-utils/formation-poses.ts";

const L = getLayout(1200, 560, 10);
console.log("Layout:", L);

console.log("\n--- FLAT (index 0, 1, 2) ---");
for (let i = 0; i < 3; i++) {
  const p = poseFor("flat", i, L, 0);
  console.log(`Flat [${i}]:`, p, "-> Transform:", poseTransform(p));
}

console.log("\n--- RING (index 0, 1, 2) ---");
for (let i = 0; i < 3; i++) {
  const p = poseFor("ring", i, L, 0);
  console.log(`Ring [${i}]:`, p, "-> Transform:", poseTransform(p));
}

console.log("\n--- TILT (index 0, 1, 2) ---");
for (let i = 0; i < 3; i++) {
  const p = poseFor("tilt", i, L, 0);
  console.log(`Tilt [${i}]:`, p, "-> Transform:", poseTransform(p));
}

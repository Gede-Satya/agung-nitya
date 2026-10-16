import fs from "fs";
import path from "path";

const productsDir = path.join(process.cwd(), "public", "products");
if (!fs.existsSync(productsDir)) fs.mkdirSync(productsDir, { recursive: true });

const products = [
  { file: "sony-pxw-z200.svg", title: "Sony PXW-Z200 4K Camcorder", cat: "Audio Visual / Kamera", icon: "cam" },
  { file: "behringer-um2.svg", title: "Behringer U-PHORIA UM2", cat: "Audio Interface", icon: "audio" },
  { file: "krisbow-sampah-240l.svg", title: "Krisbow Tempat Sampah 240L", cat: "Sanitasi dan Kebersihan", icon: "bin" },
  { file: "krisbow-pedal-240l.svg", title: "Krisbow Pedal Plastik 240L", cat: "Sanitasi dan Kebersihan", icon: "bin" },
  { file: "rak-stainless-steel.svg", title: "Rak Stainless Steel", cat: "Penyimpanan Stainless", icon: "rack" },
  { file: "rak-display-obat.svg", title: "Rak Display Obat dan Alkes", cat: "Peralatan Rumah Sakit", icon: "med" },
  { file: "lemari-penyimpanan-b3.svg", title: "Lemari Penyimpanan B3", cat: "Lemari Khusus B3", icon: "cabinet" },
  { file: "rak-medium-duty.svg", title: "Rak Medium Duty", cat: "Rak Pergudangan", icon: "rack" },
  { file: "troli-linen.svg", title: "Troli Linen Rumah Sakit", cat: "Peralatan Medis", icon: "trolley" },
  { file: "jasa-pemeliharaan.svg", title: "Jasa Pemeliharaan TI dan Kabel", cat: "Jasa Layanan TI", icon: "service" }
];

products.forEach(p => {
  const safeTitle = p.title.replace(/&/g, "&amp;");
  const safeCat = p.cat.replace(/&/g, "&amp;");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
    <rect width="800" height="800" fill="#F8FAFC" rx="28"/>
    <rect x="32" y="32" width="736" height="736" fill="#FFFFFF" rx="20" stroke="#E2E8F0" stroke-width="2"/>
    
    <!-- Central Icon Backdrop -->
    <rect x="260" y="180" width="280" height="260" rx="24" fill="#F0F7FF" stroke="#D0E4F7" stroke-width="2"/>
    <circle cx="400" cy="300" r="70" fill="#0B6BAE" fill-opacity="0.12"/>
    
    <!-- Stylized emblem -->
    <path d="M360 320 L440 320 L420 270 L380 270 Z" fill="#0B6BAE" opacity="0.8" />
    <circle cx="400" cy="255" r="24" fill="#0B6BAE" />
    
    <!-- Badge -->
    <rect x="290" y="475" width="220" height="32" rx="16" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1"/>
    <text x="400" y="496" font-family="Inter, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#64748B" text-anchor="middle" letter-spacing="1.5">PLACEHOLDER KATALOG</text>
    
    <!-- Product Name & Category -->
    <text x="400" y="555" font-family="Inter, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#0F172A" text-anchor="middle">${safeTitle}</text>
    <text x="400" y="590" font-family="Inter, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#0B6BAE" text-anchor="middle">${safeCat}</text>
    <text x="400" y="640" font-family="Inter, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8" text-anchor="middle">e-Katalog INAPROC: PT Agung Wijaya Nitya</text>
  </svg>`;
  fs.writeFileSync(path.join(productsDir, p.file), svg, "utf8");
});

console.log("Successfully validated and generated 10 valid SVG images in public/products");

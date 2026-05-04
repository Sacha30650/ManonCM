import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const projects = [
  { file: "711-rock-vs-sbk", title: "ROCK\nVS\nSBK", subtitle: "711 CLUB", colors: ["#1a0f1f", "#FF6B9D"] },
  { file: "711-beach-rose", title: "BEACH\nROSE", subtitle: "711 CLUB", colors: ["#3a1a2a", "#F5B8C8"] },
  { file: "fit-and-dance", title: "FIT &\nDANCE", subtitle: "SÉJOUR FITNESS", colors: ["#0e1f2a", "#FF6B9D"] },
  { file: "level-up", title: "LEVEL\nUP", subtitle: "8 SEMAINES", colors: ["#1f0e1f", "#FF85AE"] },
  { file: "manon-coach", title: "MANON\nCOACH", subtitle: "COACH SPORTIF", colors: ["#2a0e1f", "#F5B8C8"] },
  { file: "eat-fit", title: "EAT\nFIT", subtitle: "HEALTHY FOOD", colors: ["#1f1a0e", "#FF6B9D"] },
  { file: "cardio-sculpt", title: "CARDIO\nSCULPT", subtitle: "PROGRAMME", colors: ["#0e1a1f", "#FF85AE"] },
  { file: "711-summer", title: "SUMMER\nVIBES", subtitle: "711 CLUB", colors: ["#2a1a0e", "#F5B8C8"] },
];

const outDir = resolve(__dirname, "../public/projects");
mkdirSync(outDir, { recursive: true });

for (const p of projects) {
  const lines = p.title.split("\n");
  const lineHeight = 110;
  const startY = 480 - ((lines.length - 1) * lineHeight) / 2;
  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x="600" y="${startY + i * lineHeight}">${line}</tspan>`,
    )
    .join("");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${p.colors[0]}"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.7" cy="0.3" r="0.6">
      <stop offset="0%" stop-color="${p.colors[1]}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${p.colors[1]}" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/>
      <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.08 0"/>
    </filter>
  </defs>
  <rect width="1200" height="900" fill="url(#bg)"/>
  <rect width="1200" height="900" fill="url(#glow)"/>
  <rect width="1200" height="900" filter="url(#grain)" opacity="0.6"/>
  <g fill="${p.colors[1]}" opacity="0.9">
    <circle cx="180" cy="180" r="3"/>
    <circle cx="1020" cy="240" r="4"/>
    <circle cx="240" cy="720" r="3"/>
    <circle cx="980" cy="700" r="2"/>
  </g>
  <text x="600" y="180" text-anchor="middle" fill="${p.colors[1]}" font-family="Anton, Bebas Neue, sans-serif" font-size="32" letter-spacing="8" font-weight="700">${p.subtitle}</text>
  <text text-anchor="middle" fill="#fafafa" font-family="Anton, Bebas Neue, sans-serif" font-size="120" letter-spacing="-2" font-weight="700">
    ${tspans}
  </text>
  <text x="600" y="820" text-anchor="middle" fill="${p.colors[1]}" font-family="Inter, sans-serif" font-size="20" letter-spacing="6">MANON ALMU · DESIGN</text>
</svg>`;
  writeFileSync(resolve(outDir, `${p.file}.svg`), svg, "utf8");
  console.log("✓", p.file);
}

// OG image
const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#1a0e15"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.2" r="0.6">
      <stop offset="0%" stop-color="#FF6B9D" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#FF6B9D" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="80" y="180" fill="#F5B8C8" font-family="Inter, sans-serif" font-size="22" letter-spacing="8" font-weight="600">CRÉATRICE DE VISUELS &amp; CONTENUS INSTAGRAM</text>
  <text x="80" y="310" fill="#fafafa" font-family="Anton, Bebas Neue, sans-serif" font-size="120" font-weight="700" letter-spacing="-2">MANON ALMU</text>
  <text x="80" y="400" fill="#FF6B9D" font-family="Anton, Bebas Neue, sans-serif" font-size="64" font-weight="700">DES VISUELS QUI CONVERTISSENT.</text>
  <text x="80" y="540" fill="#a0a0a0" font-family="Inter, sans-serif" font-size="22">Affiches · Flyers · Instagram — Pour restaurants, coachs &amp; commerces</text>
</svg>`;
writeFileSync(resolve(__dirname, "../public/og-image.svg"), ogSvg);
console.log("✓ og-image");

// Favicon (small SV)
const fav = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0a0a0a"/>
  <text x="16" y="22" text-anchor="middle" fill="#FF6B9D" font-family="Anton, sans-serif" font-size="20" font-weight="700">M</text>
</svg>`;
writeFileSync(resolve(__dirname, "../public/icon.svg"), fav);
console.log("✓ icon.svg");

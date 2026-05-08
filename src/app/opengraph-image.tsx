import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Make my visu — Créatrice de visuels & contenus Instagram";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 85% 20%, rgba(255,107,157,0.45), transparent 55%), linear-gradient(135deg, #0a0a0a 0%, #1a0e15 100%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            color: "#F5B8C8",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Créatrice de visuels & contenus Instagram
        </div>
        <div
          style={{
            fontSize: 130,
            fontWeight: 800,
            letterSpacing: -3,
            marginTop: 24,
            lineHeight: 1,
          }}
        >
          MAKE MY VISU
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#FF6B9D",
            marginTop: 32,
            letterSpacing: -1,
          }}
        >
          DES VISUELS QUI CONVERTISSENT.
        </div>
        <div style={{ fontSize: 22, color: "#a0a0a0", marginTop: 36 }}>
          Affiches · Flyers · Instagram — Pour restaurants, coachs & commerces
        </div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Belle Ju Salão de Beleza — mechas, cores, unhas e sobrancelhas em Uberlândia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FFFBF7", position: "relative", fontFamily: "sans-serif" }}>
        <div style={{ position: "absolute", right: -120, top: -140, width: 760, height: 760, borderRadius: "58% 42% 55% 45% / 46% 58% 42% 54%", background: "#F26B5B", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", padding: 80, justifyContent: "center" }}>
          <div style={{ fontSize: 42, color: "#4A1F4E", fontStyle: "italic" }}>Belle Ju</div>
          <div style={{ fontSize: 108, fontWeight: 800, color: "#1E1A21", lineHeight: 0.95, marginTop: 20, display: "flex", flexDirection: "column" }}>
            <span>SEU CABELO.</span>
            <span>SUAS UNHAS.</span>
            <span style={{ color: "#4A1F4E" }}>SUA COR.</span>
          </div>
          <div style={{ fontSize: 30, color: "#6F6672", marginTop: 30 }}>Santa Mônica · Uberlândia/MG</div>
        </div>
      </div>
    ),
    size
  );
}

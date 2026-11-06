import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Harlo: meet the TMS that works with you.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1c221e",
          padding: "72px 80px",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="74" height="35" viewBox="0 0 267.3 126.81">
            <path
              fill="#ca6b44"
              d="M134.12,0c4.94,0,8.41,5,11.78,8.18l103.39,97.14c5.1,4.79,10.33,9.45,15.19,14.47,1.33,1.37,4.21,3,2,5.82-1.94,2.48-4,.49-5.77-.34q-60.8-27.920-121.52-56a12,12,0,0,0-10.94.1Q67.58,97.5,6.8,125.45c-2.11,1-4.4,2.45-6.2-.26s.87-3.84,2.32-5.2Q62.43,64,122,8.12C125.37,4.92,129.08,0,134.12,0Z"
            />
          </svg>
          <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: 6, color: "#f4f0df" }}>HARLO</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, maxWidth: 900 }}>
            Meet the TMS that works with you.
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#a9b0a5" }}>
            Trucking software for 1 to 100 trucks. Free for up to 2.
          </div>
        </div>
      </div>
    ),
    size,
  );
}

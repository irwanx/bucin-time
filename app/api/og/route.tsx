import { slugToText } from "@/lib/utils";
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const judul = searchParams.get("title") || "Bucin Time";
  const tile = slugToText(judul);
  const title = tile.length > 30 ? `${tile.slice(0, 30)}...` : tile;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #ff3385, #ff66b3)",
          fontFamily: '"Poppins", sans-serif',
          color: "white",
          padding: "60px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            fontSize: 300,
            opacity: 0.1,
            transform: "rotate(-15deg)",
          }}
        >
          ❤️
        </div>
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -100,
            fontSize: 350,
            opacity: 0.1,
            transform: "rotate(20deg)",
          }}
        >
          ❤️
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            maxWidth: "90%",
          }}
        >
          <div
            style={{
              fontSize: 80,
              marginBottom: 30,
              animation: "pulse 2s infinite",
            }}
          >
            💖
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 20,
              textShadow: "4px 4px 10px rgba(0,0,0,0.3)",
              background: "linear-gradient(to right, #fff, #ffe6f2)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              opacity: 0.9,
              marginBottom: 40,
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Musik & Kata Romantis Berdasarkan Waktu
          </div>

          {/* Decorative elements */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 20,
            }}
          >
            {["🌹", "🎵", "💌", "✨"].map((emoji, i) => (
              <div
                key={i}
                style={{
                  fontSize: 40,
                  opacity: 0.8,
                  transform: `rotate(${i % 2 === 0 ? "-" : ""}${i * 5}deg)`,
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 24,
            display: "flex",
            alignItems: "center",
            gap: 10,
            opacity: 0.8,
          }}
        >
          <span>greeting.irwanx.my.id</span>
          <span style={{ fontSize: 28 }}>💕</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

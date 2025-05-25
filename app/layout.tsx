import type React from "react";
import type { Metadata } from "next";
import { Quicksand, Poppins } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    template: "%s |  Bucin Time",
    default: "Bucin Time | Musik & Kata Romantis Berdasarkan Waktu",
  },
  description:
    "Bucin Time adalah web interaktif yang menyajikan pesan romantis dan lagu viral sesuai waktu harianmu. Mulai pagi sampai tengah malam, kamu bisa nikmati kata-kata manis dan musik bucin yang bikin hati hangat.",
  generator: "dobdabot",
  keywords: [
    "web bucin",
    "kata romantis harian",
    "musik viral TikTok",
    "lagu viral 2025",
    "audio player waktu",
    "quotes romantis",
    "kata bucin pagi siang malam",
    "musik cinta kekinian",
  ],
  authors: [{ name: "Irwanx", url: "https://irwanx.my.id" }],
  creator: "Irwanx",
  openGraph: {
    title: "Bucin Time - Musik & Kata Romantis Sesuai Waktu",
    description:
      "Web bucin interaktif dengan musik viral dan pesan romantis sesuai waktu harian. Cocok buat yang lagi jatuh cinta.",
    url: "https://greeting.irwanx.my.id",
    siteName: "Bucin Time",
    images: [
      {
        url: "https://greeting.irwanx.my.id/open-graph.jpg",
        width: 1200,
        height: 630,
        alt: "Bucin Time - Musik & Kata Romantis",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bucin Time",
    description:
      "Dengerin lagu viral dan baca kata bucin berdasarkan waktu. Pagi sampe tengah malam, kamu gak sendirian 💖",
    creator: "@abcdefvceek",
    images: ["https://greeting.irwanx.my.id/open-graph.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${poppins.variable} font-quicksand`}
      >
        {children}
      </body>
    </html>
  );
}

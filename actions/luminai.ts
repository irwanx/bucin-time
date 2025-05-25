"use server";

import axios from "axios";

export default async function luminai({
  name,
  waktu,
}: {
  name: string | null;
  waktu: string;
}) {
  const userName = name ?? "ayang";

  const requestData = {
    content: `Bikinin ucapan ${waktu} yang super duper manis, romantis, dan bikin melting untuk ayangku ${userName} dong 😍💖. Buat dalam beberapa kalimat pendek, masing-masing berdiri sendiri, biar vibes-nya kerasa satu-satu 🥹💕. Tambahin emoji yang bikin hati klepek-klepek di setiap kalimat 😘✨. Balas dalam bentuk array berisi string kalimat pendek ['kalimat1', 'kalimat2', 'kalimat3', ...] tanpa tambahan teks lain, isi array minimal 6 kalimat.`,
    user: userName,
    prompt:
      "Balas dalam bentuk array berisi string kalimat pendek ['kalimat1','kalimat2','kalimat3','kalimat4','kalimat5','kalimat6',...] tanpa tambahan teks lain, isi array boleh lebih dari 6. Berbahasa Indonesia campur inggris diperbolehkan, jangan kaku, respon selayaknya manusia. Jangan ada kalimat yang sama, dan jangan ada kalimat yang terlalu panjang. Jangan ada kalimat yang tidak relevan dengan ucapan selamat pagi, siang, sore, malam, atau tengah malam.",
  };

  try {
    const res = await axios.post("https://luminai.my.id", requestData, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    let result = res?.data?.result;

    if (typeof result === "string") {
      try {
        result = JSON.parse(result.replace(/'/g, '"'));
      } catch (e) {
        console.error("Failed to parse response string:", e);
      }
    }

    const isValidResponse =
      Array.isArray(result) &&
      result.length >= 6 &&
      result.every((msg) => typeof msg === "string" && msg.trim().length > 0);

    if (!isValidResponse) {
      console.error("Invalid luminai response structure:", result);
      const fallbackResponse = [
        `Maaf ya ${userName}, ucapan ${waktu} lagi bermasalah 😅`,
        `Tapi ${waktu}, kamu tetap bikin hatiku berdebar! 💖`,
        `Selamat ${waktu} untukmu yang selalu membuat hari-hariku cerah 🌞💕`,
        `${waktu}, aku ingin kamu tahu betapa berartinya kamu bagiku 💖✨`,
        `Di ${waktu}, semoga kamu merasa dicintai dan bahagia 😊🌸`,
        `Kamu membuat ${waktu} terasa istimewa, ${userName} 💘🌷`,
      ];
      return fallbackResponse;
    }

    const processedMessages = result.map((msg: string) =>
      msg.replace(/\b(\w+)\s+ini\b/gi, "$1")
    );

    return processedMessages;
  } catch (error) {
    console.error("Error fetching from luminai:", error);
    const fallbackResponse = [
      `Ups, ${waktu} ada sedikit masalah teknis 😓`,
      `Tapi tenang, ${userName}, kamu tetap bikin ${waktu} spesial! 🥰`,
      `Selamat ${waktu} untuk orang tercantik di hidupku 💖✨`,
      `${waktu}, semoga kamu bisa merasakan cintaku dari jauh 🌹💕`,
      `Di ${waktu}, aku ingin kamu tahu aku selalu memikirkanmu 💭💘`,
      `Kamu adalah alasan ${waktu} terasa begitu indah 🌸😍`,
    ];
    return fallbackResponse;
  }
}

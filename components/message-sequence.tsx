"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import luminai from "@/actions/luminai";

type MessageSequenceProps = {
  name: string | null;
  timeOfDay: "morning" | "afternoon" | "evening" | "night" | "midnight";
  textColor: string;
  greeting: string;
};

const timeOfDayMap: Record<MessageSequenceProps["timeOfDay"], string> = {
  morning: "pagi",
  afternoon: "siang",
  evening: "sore",
  night: "malam",
  midnight: "tengah malam",
};

const fallbackMessages = {
  morning: (name: string | null) => [
    `Selamat pagi, ${name || "sayang"}! Semoga harimu penuh kebahagiaan! 🌅💖`,
    `Pagi ini, aku ingin mengingatkan betapa berartinya kamu untukku 🌸✨`,
    `Matahari pagi ini bersinar terang seperti senyummu, ${
      name || "kekasih"
    }! ☀️😊`,
    `Pagi ini, semoga semua rencanamu berjalan lancar ya! 💪🌈`,
    `Kamu adalah alasan mengapa pagi ini terasa begitu indah 💕🌷`,
    `Selamat pagi ini untukmu yang selalu membuat hatiku berbunga-bunga 🌼💘`,
  ],
  afternoon: (name: string | null) => [
    `Selamat siang, ${name || "sayang"}! Semoga harimu menyenangkan! 🌞💖`,
    `Siang ini, aku ingin kamu tahu bahwa kamu selalu ada dalam pikiranku 💭💕`,
    `Tengah hari ini, semoga energymu tetap menyala seperti cintaku padamu 🔥❤️`,
    `Siang ini, jangan lupa makan ya! Aku sayang kamu ${
      name ? `, ${name}` : ""
    } 🍲💘`,
    `Di tengah kesibukan siang ini, semoga kamu merasa dicintai 💌✨`,
    `Siang ini terasa panas, tapi tidak sepanas cintaku padamu 😘🌶️`,
  ],
  evening: (name: string | null) => [
    `Selamat sore, ${name || "sayang"}! Semoga soremu indah! 🌇💖`,
    `Sore ini, langit berwarna oranye seperti perasaanku saat memikirkanmu 🧡🌆`,
    `Di penghujung hari ini, aku ingin mengucapkan terima kasih telah menjadi milikku 💞🌙`,
    `Sore ini, semoga kamu bisa beristirahat sejenak dari aktivitasmu 🛋️💕`,
    `Senja ini mengingatkanku pada keindahan dirimu, ${name || "kekasih"} 🌅✨`,
    `Sore ini, semoga hatimu sehangat sinar matahari yang tenggelam 🌄😊`,
  ],
  night: (name: string | null) => [
    `Selamat malam, ${name || "sayang"}! Semoga tidurmu nyenyak! 🌙💖`,
    `Malam ini, bintang-bintang bersinar terang seperti matamu ✨😍`,
    `Sebelum tidur, aku ingin mengingatkan betapa berartinya kamu untukku 💭💕`,
    `Malam ini, semoga kamu bermimpi indah tentang kita berdua 🌌💘`,
    `Di keheningan malam ini, aku merindukan pelukanmu 🤗💞`,
    `Malam ini terasa lengkap karena memikirkanmu, ${name || "kekasih"} 🌠❤️`,
  ],
  midnight: (name: string | null) => [
    `Selamat tengah malam, ${name || "sayang"}! Masih terjaga? 🌃💖`,
    `Tengah malam ini, aku ingin kamu tahu bahwa kamu selalu ada dalam pikiranku 💭✨`,
    `Di kesunyian tengah malam ini, aku merindukan kehadiranmu 🌙💕`,
    `Tengah malam ini, semoga kamu tidur nyenyak dengan mimpi indah 🛌💘`,
    `Bahkan di tengah malam ini, cintaku padamu tetap menyala terang 🔥❤️`,
    `Tengah malam ini mengingatkanku pada saat-saat indah bersamamu 🌌😊`,
  ],
};

export default function MessageSequence({
  name,
  timeOfDay,
  textColor,
  greeting,
}: MessageSequenceProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateMessages = async () => {
      setIsLoading(true);
      setCurrentMessageIndex(0);

      try {
        const rawMessages = await luminai({ name, waktu: greeting });

        let processedMessages: string[] = [];
        const timePhrase = timeOfDayMap[timeOfDay];
        const greetingPattern = new RegExp(`selamat ${timePhrase}`, "i");

        if (Array.isArray(rawMessages)) {
          const greetingMessages = rawMessages.filter(
            (msg) => typeof msg === "string" && greetingPattern.test(msg)
          );

          const otherMessages = rawMessages.filter(
            (msg) => typeof msg === "string" && !greetingPattern.test(msg)
          );

          processedMessages = [...greetingMessages, ...otherMessages].filter(
            (msg) => msg.trim().length > 0
          );

          if (greetingMessages.length === 0 && processedMessages.length > 0) {
            processedMessages.unshift(
              `....`
            );
          }
        }

        if (processedMessages.length > 0) {
          setMessages(processedMessages);
        } else {
          console.warn("No valid messages from luminai, using fallbacks");
          setMessages(fallbackMessages[timeOfDay](name));
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages(fallbackMessages[timeOfDay](name));
      } finally {
        setIsLoading(false);
      }
    };

    updateMessages();
  }, [name, timeOfDay]);

  useEffect(() => {
    if (messages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="w-full h-40 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-xl md:text-2xl text-center font-medium ${textColor}`}
          >
            Memuat pesan romantis...
          </motion.div>
        ) : messages.length > 0 ? (
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`text-xl md:text-2xl text-center font-medium ${textColor} px-6 py-4 rounded-lg backdrop-blur-sm bg-white/10 shadow-lg border border-white/20`}
          >
            {messages[currentMessageIndex]}
          </motion.div>
        ) : (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`text-xl md:text-2xl text-center font-medium ${textColor}`}
          >
            Gagal memuat pesan, coba lagi nanti
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

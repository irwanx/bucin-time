"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import moment from "moment-timezone";
import { Quicksand, Poppins } from "next/font/google";
import FloatingElements from "@/components/floating-elements";
import MessageSequence from "@/components/message-sequence";
import AudioPlayer from "@/components/audio-player";
import InteractiveHearts from "@/components/interactive-hearts";
import AnimatedBackground from "@/components/animated-background";
import ParticleEffect from "@/components/particle-effect";
import NameInputForm from "@/components/name-input-form";
import NameInputPopup from "@/components/name-input-popup";
import { generateSlug, slugToText } from "@/lib/utils";

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

interface GreetingPageProps {
  initialName?: string;
  useSlug?: boolean;
  params?: Promise<{ slug: string[] }>;
}

export default function GreetingPage({ initialName = "", useSlug = false, params }: GreetingPageProps) {
  const [timeOfDay, setTimeOfDay] = useState<
    "morning" | "afternoon" | "evening" | "night" | "midnight"
  >("morning");
  const [greeting, setGreeting] = useState<string>("");
  const [name, setName] = useState<string>(initialName);

  useEffect(() => {
    if (useSlug && params) {
      const fetchSlug = async () => {
        const resolvedParams = await params;
        const slugArray = resolvedParams.slug;
        const selectedSlug = slugArray[2] || slugArray[1] || slugArray[0];
        setName(slugToText(selectedSlug));
        localStorage.setItem("userName", generateSlug(selectedSlug));
      };
      fetchSlug();
    } else {
      const savedName = localStorage.getItem("userName");
      if (savedName) {
        setName(savedName);
      }
    }
  }, [params, useSlug]);

  const handleNameChange = (newName: string) => {
    setName(newName);
    if (newName) {
      localStorage.setItem("userName", newName);
    } else {
      localStorage.removeItem("userName");
    }
  };

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const jakartaTime = moment(now).tz("Asia/Jakarta");
        const hour = jakartaTime.hour();

        if (hour >= 5 && hour < 11) {
          setTimeOfDay("morning");
          setGreeting("Selamat Pagi");
        } else if (hour >= 11 && hour < 16) {
          setTimeOfDay("afternoon");
          setGreeting("Selamat Siang");
        } else if (hour >= 16 && hour < 18) {
          setTimeOfDay("evening");
          setGreeting("Selamat Sore");
        } else if (hour >= 18 && hour < 24) {
          setTimeOfDay("night");
          setGreeting("Selamat Malam");
        } else {
          setTimeOfDay("midnight");
          setGreeting("Selamat Tengah Malam");
        }
      } catch (error) {
        console.error("Error updating time:", error);
        setTimeOfDay("morning");
        setGreeting("Selamat Pagi");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const getTextColor = () => {
    return timeOfDay === "night" || timeOfDay === "midnight"
      ? "text-white"
      : "text-gray-800";
  };

  const getFullGreeting = () => {
    return name ? `${greeting}, ${name}` : greeting;
  };

  return (
    <main
      className={`${quicksand.variable} ${poppins.variable} font-quicksand min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-1000`}
    >
      <NameInputPopup timeOfDay={timeOfDay} onNameSubmit={handleNameChange} />
      <AnimatedBackground timeOfDay={timeOfDay} />
      <FloatingElements timeOfDay={timeOfDay} />
      <ParticleEffect timeOfDay={timeOfDay} />
      <NameInputForm
        timeOfDay={timeOfDay}
        onNameChange={handleNameChange}
        currentName={name}
      />
      <InteractiveHearts />
      <div className="z-20 w-full max-w-3xl px-5 py-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <motion.h1
            className={`text-4xl md:text-6xl font-bold text-center mb-6 ${getTextColor()} drop-shadow-md`}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
          >
            {getFullGreeting()}
          </motion.h1>
        </motion.div>
        <MessageSequence
          name={name}
          timeOfDay={timeOfDay}
          greeting={greeting}
          textColor={getTextColor()}
        />
      </div>
      <AudioPlayer timeOfDay={timeOfDay} />
      <div className="fixed bottom-20 left-0 right-0 text-center z-20 opacity-70 transition-opacity duration-300 hover:opacity-100">
        <p
          className={`text-sm ${getTextColor()} bg-white/10 backdrop-blur-sm inline-block px-3 py-1 rounded-full`}
        >
          Sentuh love untuk bermain
        </p>
      </div>
    </main>
  );
}
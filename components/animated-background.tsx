"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type AnimatedBackgroundProps = {
  timeOfDay: "morning" | "afternoon" | "evening" | "night" | "midnight";
};

export default function AnimatedBackground({
  timeOfDay,
}: AnimatedBackgroundProps) {
  const [gradientClass, setGradientClass] = useState("");

  useEffect(() => {
    switch (timeOfDay) {
      case "morning":
        setGradientClass("bg-morning");
        break;
      case "afternoon":
        setGradientClass("bg-afternoon");
        break;
      case "evening":
        setGradientClass("bg-evening");
        break;
      case "night":
        setGradientClass("bg-night");
        break;
      case "midnight":
        setGradientClass("bg-midnight");
        break;
      default:
        setGradientClass("bg-morning");
    }
  }, [timeOfDay]);

  return (
    <>
      <div className="fixed inset-0 w-full h-full z-0">
        <div
          className={`absolute inset-0 ${gradientClass} animate-gradient-slow`}
        ></div>
        <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>

        {/* Floating orbs/light effects */}
        {timeOfDay === "morning" && (
          <>
            <motion.div
              className="absolute rounded-full bg-yellow-300/30 blur-3xl"
              animate={{
                x: ["0%", "5%", "0%"],
                y: ["0%", "10%", "0%"],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                width: "40vw",
                height: "40vw",
                top: "10%",
                right: "10%",
              }}
            />
            <motion.div
              className="absolute rounded-full bg-orange-200/20 blur-3xl"
              animate={{
                x: ["0%", "-8%", "0%"],
                y: ["0%", "5%", "0%"],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
              style={{
                width: "30vw",
                height: "30vw",
                bottom: "15%",
                left: "5%",
              }}
            />
          </>
        )}

        {timeOfDay === "afternoon" && (
          <>
            <motion.div
              className="absolute rounded-full bg-blue-300/20 blur-3xl"
              animate={{
                x: ["0%", "8%", "0%"],
                y: ["0%", "-5%", "0%"],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 18,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                width: "45vw",
                height: "45vw",
                top: "5%",
                left: "10%",
              }}
            />
            <motion.div
              className="absolute rounded-full bg-sky-100/30 blur-3xl"
              animate={{
                x: ["0%", "-5%", "0%"],
                y: ["0%", "8%", "0%"],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 22,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
              style={{
                width: "35vw",
                height: "35vw",
                bottom: "10%",
                right: "5%",
              }}
            />
          </>
        )}

        {timeOfDay === "evening" && (
          <>
            <motion.div
              className="absolute rounded-full bg-orange-400/20 blur-3xl"
              animate={{
                x: ["0%", "-7%", "0%"],
                y: ["0%", "3%", "0%"],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                width: "50vw",
                height: "50vw",
                top: "0%",
                right: "0%",
              }}
            />
            <motion.div
              className="absolute rounded-full bg-pink-300/30 blur-3xl"
              animate={{
                x: ["0%", "6%", "0%"],
                y: ["0%", "-4%", "0%"],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 3,
              }}
              style={{
                width: "40vw",
                height: "40vw",
                bottom: "5%",
                left: "10%",
              }}
            />
          </>
        )}

        {timeOfDay === "night" && (
          <>
            <motion.div
              className="absolute rounded-full bg-indigo-600/20 blur-3xl"
              animate={{
                x: ["0%", "5%", "0%"],
                y: ["0%", "5%", "0%"],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                width: "45vw",
                height: "45vw",
                top: "10%",
                left: "5%",
              }}
            />
            <motion.div
              className="absolute rounded-full bg-purple-500/15 blur-3xl"
              animate={{
                x: ["0%", "-7%", "0%"],
                y: ["0%", "-3%", "0%"],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 30,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
              style={{
                width: "40vw",
                height: "40vw",
                bottom: "15%",
                right: "10%",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-transparent to-purple-950/30"></div>
          </>
        )}

        {timeOfDay === "midnight" && (
          <>
            <motion.div
              className="absolute rounded-full bg-black/30 blur-3xl"
              animate={{
                x: ["0%", "4%", "0%"],
                y: ["0%", "4%", "0%"],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 28,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                width: "50vw",
                height: "50vw",
                top: "15%",
                right: "15%",
              }}
            />
            <motion.div
              className="absolute rounded-full bg-slate-800/25 blur-3xl"
              animate={{
                x: ["0%", "-5%", "0%"],
                y: ["0%", "-3%", "0%"],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 26,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
              style={{
                width: "40vw",
                height: "40vw",
                bottom: "10%",
                left: "10%",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/40"></div>
          </>
        )}
      </div>
    </>
  );
}

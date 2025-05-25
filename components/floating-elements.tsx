"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Cloud, Star, Sun, Moon } from "lucide-react"
import { useDevicePerformance } from "@/hooks/use-device-performance"

type FloatingElementsProps = {
  timeOfDay: "morning" | "afternoon" | "evening" | "night" | "midnight"
}

export default function FloatingElements({ timeOfDay }: FloatingElementsProps) {
  const [elements, setElements] = useState<React.ReactNode[]>([])
  const { isMobile, isLowPerfDevice } = useDevicePerformance()

  useEffect(() => {
    const generateElements = () => {
      const newElements: React.ReactNode[] = []

      let count = 15
      if (isLowPerfDevice) {
        count = 5
      } else if (isMobile) {
        count = 8
      }

      for (let i = 0; i < count; i++) {
        const x = Math.random() * 100
        const y = Math.random() * 100
        const size = Math.random() * 1.5 + 0.5

        const duration = Math.random() * (isMobile ? 30 : 20) + (isMobile ? 20 : 10)
        const delay = Math.random() * 5

        const animationProps =
          isMobile || isLowPerfDevice
            ? {
                x: `${x}vw`,
                y: `${y}vh`,
                opacity: [0, 0.5, 0],
              }
            : {
                x: `${x + (Math.random() * 10 - 5)}vw`,
                y: `${y + (Math.random() * 10 - 5)}vh`,
                opacity: [0, 0.7, 0],
              }

        switch (timeOfDay) {
          case "morning":
            newElements.push(
              <motion.div
                key={`element-${i}`}
                className="absolute text-yellow-300"
                initial={{ x: `${x}vw`, y: `${y}vh`, opacity: 0 }}
                animate={animationProps}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration,
                  delay,
                  ease: "linear",
                }}
                style={{ scale: size }}
              >
                {Math.random() > 0.5 ? <Sun size={24} /> : <Cloud size={24} />}
              </motion.div>,
            )
            break
          case "afternoon":
            newElements.push(
              <motion.div
                key={`element-${i}`}
                className="absolute text-blue-300"
                initial={{ x: `${x}vw`, y: `${y}vh`, opacity: 0 }}
                animate={animationProps}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration,
                  delay,
                  ease: "linear",
                }}
                style={{ scale: size }}
              >
                <Cloud size={24} />
              </motion.div>,
            )
            break
          case "evening":
            newElements.push(
              <motion.div
                key={`element-${i}`}
                className="absolute text-orange-300"
                initial={{ x: `${x}vw`, y: `${y}vh`, opacity: 0 }}
                animate={animationProps}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration,
                  delay,
                  ease: "linear",
                }}
                style={{ scale: size }}
              >
                {Math.random() > 0.5 ? <Sun size={24} /> : <Cloud size={24} />}
              </motion.div>,
            )
            break
          case "night":
            newElements.push(
              <motion.div
                key={`element-${i}`}
                className="absolute text-yellow-100"
                initial={{ x: `${x}vw`, y: `${y}vh`, opacity: 0 }}
                animate={animationProps}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration,
                  delay,
                  ease: "linear",
                }}
                style={{ scale: size }}
              >
                {Math.random() > 0.3 ? <Star size={24} /> : <Moon size={24} />}
              </motion.div>,
            )
            break
        }
      }

      setElements(newElements)
    }

    generateElements()
  }, [timeOfDay, isMobile, isLowPerfDevice])

  return <>{elements}</>
}

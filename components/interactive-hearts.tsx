"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

type Sparkle = {
  id: number
  x: number
  y: number
  size: number
  color: string
}

type FloatingHeart = {
  id: number
  x: number
  y: number
  rotation: number
  size: number
}

export default function InteractiveHearts() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([])
  const [heartCount, setHeartCount] = useState(0)

  const createSparkles = (x: number, y: number) => {
    const newSparkles: Sparkle[] = []
    const colors = ["#FF5E5B", "#D81E5B", "#FFA5AB", "#FF87AB", "#FFC2D1"]

    for (let i = 0; i < 10; i++) {
      newSparkles.push({
        id: Date.now() + i,
        x: x + (Math.random() * 100 - 50),
        y: y + (Math.random() * 100 - 50),
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    setSparkles([...sparkles, ...newSparkles])

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.includes(s)))
    }, 1000)
  }

  const createFloatingHeart = (x: number, y: number) => {
    const newHeart: FloatingHeart = {
      id: Date.now(),
      x,
      y,
      rotation: Math.random() * 30 - 15,
      size: Math.random() * 10 + 20,
    }

    setFloatingHearts([...floatingHearts, newHeart])
    setHeartCount((prev) => prev + 1)

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
    }, 3000)
  }

  const handleHeartClick = (e: React.MouseEvent) => {
    const x = e.clientX
    const y = e.clientY

    createSparkles(x, y)
    createFloatingHeart(x, y)
  }

  return (
    <>
      {[...Array(5)].map((_, index) => {
        const x = 10 + index * 20
        const y = 20 + (index % 3) * 15

        return (
          <motion.div
            key={`fixed-heart-${index}`}
            className="fixed text-pink-500 cursor-pointer z-10"
            style={{ left: `${x}%`, top: `${y}%` }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleHeartClick}
          >
            <Heart fill="currentColor" size={24 + (index % 3) * 4} />
          </motion.div>
        )
      })}

      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={`sparkle-${sparkle.id}`}
            className="fixed rounded-full z-20"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
              backgroundColor: sparkle.color,
            }}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {floatingHearts.map((heart) => (
          <motion.div
            key={`floating-heart-${heart.id}`}
            className="fixed text-pink-500 z-20"
            style={{
              left: heart.x,
              top: heart.y,
              rotate: heart.rotation,
            }}
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -100, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            <Heart fill="currentColor" size={heart.size} />
          </motion.div>
        ))}
      </AnimatePresence>

      {heartCount > 0 && (
        <div className="fixed bottom-5 left-5 z-20 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
          <Heart fill="pink" size={16} />
          <span className="text-sm font-medium">{heartCount}</span>
        </div>
      )}
    </>
  )
}

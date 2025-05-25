"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

type NameInputPopupProps = {
  timeOfDay: "morning" | "afternoon" | "evening" | "night" | "midnight"
  onNameSubmit: (name: string) => void
}

export default function NameInputPopup({ timeOfDay, onNameSubmit }: NameInputPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedName = localStorage.getItem("userName")

    if (!savedName) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        setIsLoaded(true)
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      setIsLoaded(true)
    }
  }, [])

  const getBackgroundStyle = () => {
    switch (timeOfDay) {
      case "morning":
        return "from-yellow-100/90 to-orange-100/90"
      case "afternoon":
        return "from-blue-100/90 to-white/90"
      case "evening":
        return "from-orange-100/90 to-pink-100/90"
      case "night":
        return "from-indigo-900/90 to-purple-900/90"
      default:
        return "from-yellow-100/90 to-orange-100/90"
    }
  }

  const getButtonStyle = () => {
    switch (timeOfDay) {
      case "morning":
        return "bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
      case "afternoon":
        return "bg-blue-400 hover:bg-blue-500 text-blue-900"
      case "evening":
        return "bg-orange-400 hover:bg-orange-500 text-orange-900"
      case "night":
        return "bg-indigo-500 hover:bg-indigo-600 text-white"
      default:
        return "bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
    }
  }

  const getSecondaryButtonStyle = () => {
    return timeOfDay === "night"
      ? "bg-gray-700 hover:bg-gray-600 text-white"
      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
  }

  const getTextColor = () => {
    return timeOfDay === "night" ? "text-white" : "text-gray-800"
  }

  const getInputStyle = () => {
    return timeOfDay === "night"
      ? "bg-indigo-800/50 text-white placeholder:text-indigo-300 border-indigo-600"
      : "bg-white/80 text-gray-800 placeholder:text-gray-500 border-gray-300"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = name.trim()
    onNameSubmit(trimmedName)

    if (trimmedName) {
      localStorage.setItem("userName", trimmedName)
    }

    setIsOpen(false)
  }

  const handleSkip = () => {
    onNameSubmit("")
    setIsOpen(false)
    localStorage.setItem("namePopupSkipped", "true")
  }

  if (!isLoaded) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleSkip}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full max-w-md rounded-2xl shadow-xl overflow-hidden ${
              timeOfDay === "night" ? "border border-indigo-500/30" : "border border-white/30"
            }`}
          >
            <div className={`p-6 bg-gradient-to-br ${getBackgroundStyle()} backdrop-blur-md ${getTextColor()}`}>
              <div className="flex justify-center mb-4">
                <Heart className="h-10 w-10 text-pink-500" fill="currentColor" />
              </div>

              <h2 className="text-2xl font-bold text-center mb-2">Hai Sayang! ❤️</h2>
              <p className="text-center mb-6">
                Boleh tau nama kamu siapa? Biar aku bisa manggil kamu dengan lebih manis
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama ayang..."
                    className={`w-full px-4 py-3 rounded-lg border ${getInputStyle()} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                    autoFocus
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className={`flex-1 px-4 py-3 rounded-lg font-medium ${getButtonStyle()} transition-colors duration-200`}
                  >
                    Simpan Sayang
                  </button>
                  <button
                    type="button"
                    onClick={handleSkip}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium ${getSecondaryButtonStyle()} transition-colors duration-200`}
                  >
                    Nanti Aja
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

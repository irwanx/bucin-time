"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Edit2, Check, X } from "lucide-react"

type NameInputFormProps = {
  timeOfDay: "morning" | "afternoon" | "evening" | "night" | "midnight"
  onNameChange: (name: string) => void
  currentName: string
}

export default function NameInputForm({ timeOfDay, onNameChange, currentName }: NameInputFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(currentName)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const getFormStyle = () => {
    switch (timeOfDay) {
      case "morning":
        return "bg-yellow-50 border-yellow-300 focus-within:border-yellow-500"
      case "afternoon":
        return "bg-blue-50 border-blue-300 focus-within:border-blue-500"
      case "evening":
        return "bg-orange-50 border-orange-300 focus-within:border-orange-500"
      case "night":
        return "bg-indigo-900/30 border-indigo-500 focus-within:border-indigo-400"
      default:
        return "bg-yellow-50 border-yellow-300 focus-within:border-yellow-500"
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

  const getTextColor = () => {
    return timeOfDay === "night" ? "text-white" : "text-gray-800"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onNameChange(name.trim())
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setName(currentName)
    setIsEditing(false)
  }

  return (
    <div className="fixed top-5 right-5 z-30">
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.form
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            onSubmit={handleSubmit}
            className={`flex items-center gap-2 p-2 rounded-lg shadow-md border-2 backdrop-blur-md ${getFormStyle()}`}
          >
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama ayang..."
                className={`px-3 py-1.5 rounded-md outline-none w-full max-w-[200px] ${
                  timeOfDay === "night"
                    ? "bg-indigo-800/50 text-white placeholder:text-indigo-300"
                    : "bg-white/80 text-gray-800 placeholder:text-gray-500"
                }`}
                autoFocus
              />
            </div>
            <div className="flex gap-1">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-1.5 rounded-md ${getButtonStyle()}`}
                aria-label="Simpan nama"
              >
                <Check className="h-4 w-4" />
              </motion.button>
              <motion.button
                type="button"
                onClick={handleCancel}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-1.5 rounded-md ${
                  timeOfDay === "night"
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
                aria-label="Batal"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-end gap-2"
          >
            {showSuccessMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  timeOfDay === "night" ? "bg-indigo-800/50 text-white" : "bg-white/80 text-gray-800"
                } backdrop-blur-md shadow-md flex items-center gap-1.5`}
              >
                <Heart className="h-3.5 w-3.5" fill="currentColor" />
                <span>Nama ayang tersimpan! ❤️</span>
              </motion.div>
            )}
            <motion.button
              onClick={() => setIsEditing(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-md backdrop-blur-md ${
                timeOfDay === "night"
                  ? "bg-indigo-800/50 text-white hover:bg-indigo-700/50"
                  : "bg-white/80 text-gray-800 hover:bg-white/90"
              }`}
            >
              <Edit2 className="h-3.5 w-3.5" />
              <span className="text-sm font-medium">{currentName ? `Ubah Nama: ${currentName}` : "Tambah Nama"}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

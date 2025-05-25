"use client"

import { useEffect, useRef, useState } from "react"
import { useWindowSize } from "@/hooks/use-window-size"
import { useDevicePerformance } from "@/hooks/use-device-performance"
import { throttle } from "@/lib/utils"

type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  originalX: number
  originalY: number
}

type ParticleEffectProps = {
  timeOfDay: "morning" | "afternoon" | "evening" | "night" | "midnight"
}

export default function ParticleEffect({ timeOfDay }: ParticleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { width = 0, height = 0 } = useWindowSize()
  const particlesRef = useRef<Particle[]>([])
  const mousePositionRef = useRef<{ x: number; y: number } | null>(null)
  const animationFrameRef = useRef<number>(0)
  const lastUpdateTimeRef = useRef<number>(0)
  const isInitializedRef = useRef(false)
  const [, forceRender] = useState({})
  const { isMobile, isLowPerfDevice, performanceScore } = useDevicePerformance()

  const getParticleColors = () => {
    switch (timeOfDay) {
      case "morning":
        return ["#FFD700", "#FFA500", "#FF8C00", "#FFDF00", "#FFB6C1"]
      case "afternoon":
        return ["#87CEEB", "#ADD8E6", "#B0E0E6", "#F0F8FF", "#E6E6FA"]
      case "evening":
        return ["#FF7F50", "#FF6347", "#FFA07A", "#FA8072", "#FFB6C1"]
      case "night":
        return ["#9370DB", "#8A2BE2", "#9932CC", "#BA55D3", "#E6E6FA"]
      case "midnight":
        return ["#000080", "#191970", "#00008B", "#0000CD", "#1E90FF"]
      default:
        return ["#FFD700", "#FFA500", "#FF8C00", "#FFDF00", "#FFB6C1"]
    }
  }

  const getOptimalParticleCount = () => {
    const baseCount = Math.floor(performanceScore / 2)

    const screenSizeFactor = Math.min(1, (width * height) / (1920 * 1080))

    let count = Math.floor(baseCount * screenSizeFactor)

    if (isLowPerfDevice) {
      count = Math.min(count, 15)
    } else if (isMobile) {
      count = Math.min(count, 30)
    } else {
      count = Math.min(count, 80)
    }

    return Math.max(10, count)
  }

  useEffect(() => {
    if (!width || !height) return

    const colors = getParticleColors()
    const particleCount = getOptimalParticleCount()

    const newParticles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const size = Math.random() * (isMobile ? 2 : 3) + 1

      newParticles.push({
        x,
        y,
        size,
        speedX: Math.random() * 0.3 - 0.15,
        speedY: Math.random() * 0.3 - 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
        originalX: x,
        originalY: y,
      })
    }

    particlesRef.current = newParticles
    isInitializedRef.current = true

    forceRender({})

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [width, height, timeOfDay, isMobile, isLowPerfDevice, performanceScore])

  useEffect(() => {
    const throttleTime = isMobile ? 100 : isLowPerfDevice ? 50 : 16

    const handleMouseMove = throttle((e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY }
    }, throttleTime)

    const handleTouchMove = throttle((e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }, throttleTime)

    const handleMouseLeave = () => {
      mousePositionRef.current = null
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("touchend", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("touchend", handleMouseLeave)
    }
  }, [isMobile, isLowPerfDevice])

  useEffect(() => {
    if (!canvasRef.current || !isInitializedRef.current || particlesRef.current.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const frameSkip = isLowPerfDevice ? 3 : isMobile ? 2 : 1
    let frameCount = 0

    const animate = (timestamp: number) => {
      frameCount = (frameCount + 1) % frameSkip
      if (frameCount !== 0) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      const deltaTime = timestamp - (lastUpdateTimeRef.current || timestamp)
      lastUpdateTimeRef.current = timestamp

      const limitedDelta = Math.min(deltaTime, 100) / 16.67 // Normalize to ~60fps

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX * limitedDelta
        particle.y += particle.speedY * limitedDelta

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        if (mousePositionRef.current) {
          const dx = mousePositionRef.current.x - particle.x
          const dy = mousePositionRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = isMobile ? 100 : 150

          if (distance < maxDistance) {
            const force = ((maxDistance - distance) / maxDistance) * (isMobile ? 0.5 : 1.0)

            const attractMode = timeOfDay === "morning" || timeOfDay === "evening"
            const forceDirectionX = attractMode ? dx : -dx
            const forceDirectionY = attractMode ? dy : -dy

            const forceFactor = isMobile ? 0.01 : 0.02
            particle.x += forceDirectionX * force * forceFactor * limitedDelta
            particle.y += forceDirectionY * force * forceFactor * limitedDelta
          } else {
            particle.x += (particle.originalX - particle.x) * 0.01 * limitedDelta
            particle.y += (particle.originalY - particle.y) * 0.01 * limitedDelta
          }
        } else {
          particle.x += (particle.originalX - particle.x) * 0.01 * limitedDelta
          particle.y += (particle.originalY - particle.y) * 0.01 * limitedDelta
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()

        if (!isMobile && !isLowPerfDevice) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            particle.size * 0.5,
            particle.x,
            particle.y,
            particle.size * 2,
          )
          gradient.addColorStop(
            0,
            `${particle.color}${Math.floor(particle.opacity * 0.5 * 255)
              .toString(16)
              .padStart(2, "0")}`,
          )
          gradient.addColorStop(1, `${particle.color}00`)
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [timeOfDay, isMobile, isLowPerfDevice])

  useEffect(() => {
    if (canvasRef.current && width && height) {
      canvasRef.current.width = width
      canvasRef.current.height = height
    }
  }, [width, height])

  return <canvas ref={canvasRef} className="fixed inset-0 z-10 pointer-events-none" style={{ touchAction: "none" }} />
}

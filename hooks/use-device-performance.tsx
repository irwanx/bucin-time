"use client"

import { useState, useEffect } from "react"

type DevicePerformance = {
  isMobile: boolean
  isLowPerfDevice: boolean
  performanceScore: number // 0-100 scale, higher is better
}

export function useDevicePerformance(): DevicePerformance {
  const [performance, setPerformance] = useState<DevicePerformance>({
    isMobile: false,
    isLowPerfDevice: false,
    performanceScore: 100,
  })

  useEffect(() => {
    const checkIsMobile = () => {
      return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth <= 768
      )
    }

    const estimatePerformance = () => {
      const isMobile = checkIsMobile()

      let score = 100

      if (isMobile) score -= 30

      if (!window.requestAnimationFrame) score -= 20
      if (!window.performance) score -= 10

      if (
        navigator.deviceMemory !== undefined &&
        navigator.deviceMemory < 4
      ) {
        score -= (4 - navigator.deviceMemory) * 10
      }

      if (
        navigator.hardwareConcurrency !== undefined &&
        navigator.hardwareConcurrency < 4
      ) {
        score -= (4 - navigator.hardwareConcurrency) * 5
      }

      score = Math.max(0, Math.min(100, score))

      return {
        isMobile,
        isLowPerfDevice: score < 50,
        performanceScore: score,
      }
    }

    setPerformance(estimatePerformance())
  }, [])

  return performance
}

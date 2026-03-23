"use client"
import React, { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"

export const TechBackground = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generamos partículas persistentes solo en cliente
  const particles = useMemo(() => {
    if (typeof window === "undefined") return []
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * -20,
    }))
  }, [])

  if (!mounted) {
    return (
      <div className="fixed inset-0 -z-30 bg-[#050508]" />
    )
  }

  return (
    <div className="fixed inset-0 -z-30 bg-[#050508] overflow-hidden">
      {/* Grid Tecnológico Persistente */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #76b900 1px, transparent 1px),
            linear-gradient(to bottom, #76b900 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
        }}
      />

      {/* Partículas de Neón Flotantes */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#76b900]/20 blur-[1px] pointer-events-none shadow-[0_0_10px_#76b90044]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0, 100, 0],
            x: [0, 50, 0, -50, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Brillos de Profundidad (Beams) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#76b900]/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-blue-500/[0.03] blur-[150px] rounded-full animate-pulse pointer-events-none shadow-inner" />
      
      {/* Ruido de Grano Premium */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none contrast-150 brightness-150 grayscale invert" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
    </div>
  )
}

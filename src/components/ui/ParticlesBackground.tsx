'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Particles } from './particles'
import { THEME_COLORS } from '@/lib/constants/theme_colors'

/**
 * Composant ParticlesBackground
 * Affiche un fond de particules avec une couleur adaptée au thème (dark/light)
 */

export function ParticlesBackground() {
  const { theme } = useTheme()
  const [color, setColor] = useState(THEME_COLORS.particles.light)

  useEffect(() => {
    // Change la couleur selon le thème
    setColor(theme === "dark" ? THEME_COLORS.particles.dark : THEME_COLORS.particles.light)
  }, [theme])

  return (
    <Particles
      className="fixed inset-0 -z-10 pointer-events-none"
      quantity={150}
      ease={80}
      color={color}
      refresh={false}
      staticity={50}
      size={0.4}
    />
  )
}
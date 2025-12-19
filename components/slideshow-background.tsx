"use client"

import { useState, useEffect } from "react"

const images = [
  "/indian-post-office-building-exterior-with-red-post.jpg",
  "/indian-postal-worker-delivering-mail-in-village.jpg",
  "/historic-india-post-office-heritage-building.jpg",
  "/modern-india-post-logistics-center-with-parcels.jpg",
]

export function SlideshowBackground() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-0">
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/80 via-[#1a1a2e]/70 to-[#1a1a2e]/90" />
    </div>
  )
}

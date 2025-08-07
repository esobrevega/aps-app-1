// src/components/hover-mouse.tsx

"use client"
import React from "react"

export const HoverCardNearMouse = ({
  children,
  content,
}: {
  children: React.ReactNode
  content: React.ReactNode
}) => {
  const [open, setOpen] = React.useState(false)
  const [coords, setCoords] = React.useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setCoords({ x: e.clientX, y: e.clientY })
    setOpen(true)
  }

  const handleMouseLeave = () => {
    setOpen(false)
  }

  return (
    <>
      <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      {open && (
        <div
          className="fixed z-50 bg-white border border-gray-200 shadow-md rounded-md px-3 py-2 text-sm pointer-events-none"
          style={{
            top: coords.y + 12,
            left: coords.x + 12,
          }}
        >
          {content}
        </div>
      )}
    </>
  )
}

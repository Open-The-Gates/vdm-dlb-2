"use client"

import { useEffect } from "react"

export function useHotkeys(hotkeys: [string, (e: KeyboardEvent) => void][]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      hotkeys.forEach(([key, handler]) => {
        if (event.key.toLowerCase() === key.toLowerCase() && (event.metaKey || event.ctrlKey)) {
          event.preventDefault()
          handler(event)
        } else if (event.key.toLowerCase() === key.toLowerCase() && !event.metaKey && !event.ctrlKey) {
          const activeElement = document.activeElement
          if (!["input", "textarea"].includes(activeElement?.tagName.toLowerCase() || "")) {
            event.preventDefault()
            handler(event)
          }
        }
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [hotkeys])
}

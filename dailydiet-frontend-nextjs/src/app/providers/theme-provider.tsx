"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

interface ThemeContextType {
  theme: string
  toggleTheme: (selectedTheme: string) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>("light")

  const applyTheme = (newTheme: string) => {
    document.body.classList.remove("light", "dark")

    if (newTheme !== "system") {
      document.body.classList.add(newTheme)
      localStorage.setItem("theme", newTheme)
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches
      document.body.classList.add(systemPrefersDark ? "dark" : "light")
      localStorage.setItem("theme", "system")
    }
  }

  const toggleTheme = (selectedTheme: string) => {
    setTheme(selectedTheme)
    applyTheme(selectedTheme)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      // Default to system theme if nothing is saved
      setTheme("system")
      applyTheme("system")
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

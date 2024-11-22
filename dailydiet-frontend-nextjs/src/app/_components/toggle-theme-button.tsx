import { useTheme } from "../providers/theme-provider"
import { Moon, Settings, Sun } from "lucide-react"

export function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      {theme === "dark" && (
        <button
          className="rounded-lg border border-base700 bg-background p-2 text-foreground hover:border-blue-950 hover:bg-blue-950"
          onClick={() => toggleTheme("light")}
        >
          <Moon size={16} />
        </button>
      )}
      {theme === "light" && (
        <button
          className="rounded-lg border border-base700 bg-background p-2 text-foreground hover:border-yellow-500 hover:bg-yellow-500"
          onClick={() => toggleTheme("system")}
        >
          <Sun size={16} />
        </button>
      )}
      {theme === "system" && (
        <button
          className="rounded-lg border border-base700 bg-background p-2 text-foreground hover:bg-gray-300 hover:text-background"
          onClick={() => toggleTheme("dark")}
        >
          <Settings size={16} />
        </button>
      )}
    </>
  )
}

import { useTheme } from "../providers/theme-provider"
import { Moon, Settings, Sun } from "lucide-react"

export function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div>
      {theme === "dark" && (
        <button
          className="rounded-lg border border-foreground bg-background p-2 text-foreground hover:bg-gray-300"
          onClick={() => toggleTheme("light")}
        >
          <Moon size={16} />
        </button>
      )}
      {theme === "light" && (
        <button
          className="rounded-lg border border-foreground bg-background p-2 text-foreground hover:bg-gray-300"
          onClick={() => toggleTheme("system")}
        >
          <Sun size={16} />
        </button>
      )}
      {theme === "system" && (
        <button
          className="rounded-lg border border-foreground bg-background p-2 text-foreground hover:bg-gray-300"
          onClick={() => toggleTheme("dark")}
        >
          <Settings size={16} />
        </button>
      )}
    </div>
  )
}

import { useTheme } from "../providers/theme-provider"

export default function ToggleThemeInput() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex items-center gap-4">
      <label htmlFor="theme">Theme:</label>
      <select
        id="theme"
        value={theme}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          toggleTheme(e.target.value)
        }
        className="rounded bg-background p-2 text-foreground"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System Default</option>
      </select>
    </div>
  )
}

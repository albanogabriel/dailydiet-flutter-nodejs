import { useTheme } from "../providers/theme-provider"

export default function useEffectiveTheme() {
  const { theme } = useTheme()

  const effectiveTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme

  return { effectiveTheme }
}

"use client"
import { useState } from "react"
import { useTheme } from "../providers/theme-provider"

export default function Login() {
  const { theme, toggleTheme } = useTheme()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await fetch("http://localhost:3333/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const data = await response.json()
      console.log("data", data)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <label htmlFor="theme">Theme:</label>
          <select
            id="theme"
            value={theme}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              toggleTheme(e.target.value)
            }
            className="rounded bg-gray-300 p-2 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            placeholder="albanogabriel@gmail.com"
            className="rounded-md px-2 py-1 text-black md:w-[300px]"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            className="rounded-md px-2 py-1 md:w-[300px]"
            placeholder="@!123asd"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button type="submit" className="rounded-md bg-white p-2 text-black">
          Login
        </button>
      </div>
    </form>
  )
}

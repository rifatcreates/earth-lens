import { useEffect } from "react"
import Navbar from "./components/layout/Navbar"
import DashboardPage from "./pages/DashboardPage"
import { useStore } from "./store/useStore"

const App = () => {
  const theme = useStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-7xl p-4">
        <DashboardPage />
      </main>
    </div>
  )
}

export default App
import { useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import useFinanceStore from './store/useFinanceStore'

export default function App() {
  const { darkMode } = useFinanceStore()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return <Dashboard />
}
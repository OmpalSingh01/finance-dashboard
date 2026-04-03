import { useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import useFinanceStore from './store/useFinanceStore'
import { Toaster } from 'react-hot-toast'

export default function App() {
  const { darkMode } = useFinanceStore()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: '12px',
            padding: '12px 16px',
          },
        }}
      />

      <Dashboard />
    </>
  )
}
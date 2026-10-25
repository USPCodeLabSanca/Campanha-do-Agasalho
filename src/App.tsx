import { AppRoutes } from './AppRoutes'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

export function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'

import { AdminHeader } from '../components/admin/AdminHeader'
import { AdminSidebar } from '../components/admin/AdminSidebar'

export function AdminLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (!isMenuOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeMenu()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  return (
    <div className="min-h-screen bg-background text-blue-1">
      <AdminHeader isMenuOpen={isMenuOpen} onToggleMenu={toggleMenu} />

      <div className="md:flex">
        <AdminSidebar isOpen={isMenuOpen} onNavigate={closeMenu} />

        {/* Fundo escuro atrás do menu no celular; clicar nele fecha o menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 top-16 z-30 bg-blue-1/30 md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

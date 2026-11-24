import { Link, useNavigate } from 'react-router'

import { ListIcon, XIcon } from '@phosphor-icons/react'

import logo from '../../assets/images/logo.svg'

type AdminHeaderProps = {
  isMenuOpen: boolean
  onToggleMenu: () => void
}

export function AdminHeader({ isMenuOpen, onToggleMenu }: AdminHeaderProps) {
  const navigate = useNavigate()

  function handleLogout() {
    navigate('/admin/login')
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-3 bg-blue-1 px-4 text-white shadow-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="cursor-pointer p-1 md:hidden"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="admin-sidebar"
          onClick={onToggleMenu}
        >
          {isMenuOpen ? (
            <XIcon size={26} aria-hidden="true" />
          ) : (
            <ListIcon size={26} aria-hidden="true" />
          )}
        </button>

        <Link to="/admin">
          <img src={logo} alt="Campanha USP do Agasalho" className="h-10" />
        </Link>

        <span className="hidden rounded-full bg-orange-1 px-2 text-caption font-extrabold tracking-wider text-blue-1 uppercase sm:inline">
          Admin
        </span>
      </div>

      <button
        type="button"
        className="cursor-pointer rounded-full border-2 border-white px-4 py-1 text-button transition hover:bg-white hover:text-blue-1"
        onClick={handleLogout}
      >
        Sair
      </button>
    </header>
  )
}

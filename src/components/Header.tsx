import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { ListIcon, XIcon } from '@phosphor-icons/react'

import { Button } from './Button'
import { NavItem } from './NavItem'
import { LanguageSwitch } from './LanguageSwitch'

import { pages } from '../constants/pages'

import logo from '../assets/images/logo.svg'

export function Header() {
  const { t } = useTranslation()

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
    <header className="sticky top-0 z-50 h-20 bg-blue-1 shadow-md">
      <div className="page-container flex h-full items-center justify-between">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt={t('header.logoAlt')} className="h-14" />
        </Link>

        <nav aria-label={t('header.navLabel')} className="hidden xl:flex">
          <ul className="flex gap-2">
            {pages.map((page) => (
              <li key={page.path}>
                <NavItem to={page.path}>{t(page.labelKey)}</NavItem>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <LanguageSwitch />
          <Button to="/pontos-coleta">{t('header.donate')}</Button>
        </div>

        <button
          type="button"
          className="cursor-pointer p-2 text-white xl:hidden"
          aria-label={isMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <XIcon size={24} aria-hidden="true" />
          ) : (
            <ListIcon size={24} aria-hidden="true" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute top-full left-0 max-h-[calc(100dvh-5rem)] w-full overflow-y-auto border-t border-white/10 bg-blue-1 shadow-md xl:hidden"
        >
          <div className="page-container flex flex-col gap-6 pt-2 pb-6">
            <nav aria-label={t('header.navLabel')}>
              <ul>
                {pages.map((page) => (
                  <li key={page.path}>
                    <NavItem
                      to={page.path}
                      variant="mobile"
                      onClick={closeMenu}
                    >
                      {t(page.labelKey)}
                    </NavItem>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="grid gap-3">
              <LanguageSwitch />
              <Button to="/pontos-coleta" onClick={closeMenu}>
                {t('header.donate')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

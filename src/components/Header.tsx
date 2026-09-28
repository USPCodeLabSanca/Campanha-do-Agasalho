import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Button } from './Button'
import { NavItem } from './NavItem'
import { LanguageSwitch } from './LanguageSwitch'

import logo from '../assets/images/logo.svg'

const pages = [
  { labelKey: 'nav.home', path: '/' },
  { labelKey: 'nav.campaign', path: '/campanha' },
  { labelKey: 'nav.howToHelp', path: '/como-ajudar' },
  { labelKey: 'nav.collectionPoints', path: '/pontos-coleta' },
  { labelKey: 'nav.entities', path: '/entidades' },
  { labelKey: 'nav.impact', path: '/impacto' },
  { labelKey: 'nav.shop', path: '/lojinha' },
  { labelKey: 'nav.participate', path: '/participe' },
] as const

export function Header() {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 h-20 bg-blue-1 shadow-md">
      <div className="page-container flex h-full items-center justify-between">
        <Link to="/">
          <img src={logo} alt={t('header.logoAlt')} className="h-14" />
        </Link>

        <nav aria-label={t('header.navLabel')}>
          <ul className="flex gap-2">
            {pages.map((page) => (
              <li key={page.path}>
                <NavItem to={page.path}>{t(page.labelKey)}</NavItem>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitch />
          <Button to="/pontos-coleta">{t('header.donate')}</Button>
        </div>
      </div>
    </header>
  )
}

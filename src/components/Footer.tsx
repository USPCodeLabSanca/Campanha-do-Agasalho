import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import {
  InstagramLogoIcon,
  TiktokLogoIcon,
  FacebookLogoIcon,
} from '@phosphor-icons/react'

import { NavItem } from './NavItem'

import logo from '../assets/images/logo.svg'
import logoCodeLab from '../assets/images/logoCodeLab.svg'

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

const socialLinks = [
  {
    labelKey: 'footer.navInstagram',
    icon: InstagramLogoIcon,
    url: 'https://www.instagram.com/instagasalho?utm_source=ig_web_button_share_sheet&exln=ZDNlZDc0MzIxNw==',
  },
  {
    labelKey: 'footer.navTiktok',
    icon: TiktokLogoIcon,
    url: 'https://www.tiktok.com/@campanhagasalho?is_from_webapp=1&sender_device=pc',
  },
  {
    labelKey: 'footer.navFacebook',
    icon: FacebookLogoIcon,
    url: 'https://www.facebook.com/campanhadoagasalhouspsc/',
  },
] as const

export function Footer() {
  const { t } = useTranslation()

  const footerPages = pages.filter((page) => page.labelKey !== 'nav.shop')

  return (
    <footer className="z-0 h-auto w-full bg-blue-1 pt-5 shadow-md">
      <div className="page-container mx-auto mt-20 mb-10 flex flex-col items-start gap-10 xl:my-10 xl:flex-row xl:justify-between xl:px-30">
        <Link to="/" className="xl:self-center">
          <img src={logo} alt={t('header.logoAlt')} className="h-24" />
        </Link>

        <nav aria-label={t('footer.navLabel')} className="flex flex-col gap-5">
          <p className="px-2 text-button text-orange-1">
            {t('footer.usefulLinks')}
          </p>
          <ul className="grid grid-flow-row gap-5 xl:grid-flow-col xl:grid-rows-4">
            {footerPages.map((page) => (
              <li key={page.path}>
                <NavItem to={page.path}>{t(page.labelKey)}</NavItem>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t('footer.contact')}>
          <ul className="flex flex-col gap-5 text-white">
            <menu className="text-button text-orange-1">
              {t('footer.contact')}
            </menu>
            <a href="mailto:campanha.agasalho@usp.br">
              campanha.agasalho@usp.br
            </a>
            <div className="flex gap-5">
              {socialLinks.map((social) => {
                const CurrentIcon = social.icon
                return (
                  <li key={social.labelKey} aria-label={t(social.labelKey)}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CurrentIcon size={32} />
                    </a>
                  </li>
                )
              })}
            </div>
          </ul>
        </nav>
      </div>
      <div className="page-container border-t-1 border-white text-strong xl:px-0">
        <ul className="mx-5 flex flex-col items-start justify-between py-5 text-white xl:flex-row xl:items-center">
          <li>{t('title')} - USP 2026</li>

          <li className="hidden items-center xl:flex">
            <p>
              {t('footer.developedBy')}
              <span className="text-emerald-300"> CodeLab Sanca</span>
            </p>
            <img
              src={logoCodeLab}
              alt={'CodeLab Sanca'}
              className="h-10 px-5"
            />
          </li>

          <li className="flex flex-col items-start gap-5 pt-5 xl:hidden">
            <img
              src={logoCodeLab}
              alt={'CodeLab Sanca'}
              className="h-10 px-5"
            />
            <p>
              {t('footer.developedBy')}
              <span className="text-emerald-300"> CodeLab Sanca</span>
            </p>
          </li>
        </ul>
      </div>
    </footer>
  )
}

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import {
  InstagramLogoIcon,
  TiktokLogoIcon,
  FacebookLogoIcon,
  LinkedinLogoIcon,
} from '@phosphor-icons/react'

import { pages } from '../constants/pages'

import logo from '../assets/images/logo.svg'
import logoCodeLab from '../assets/images/logoCodeLab.svg'

const socialLinks = [
  {
    labelKey: 'footer.navInstagram',
    icon: InstagramLogoIcon,
    url: 'https://www.instagram.com/instagasalho',
  },
  {
    labelKey: 'footer.navTiktok',
    icon: TiktokLogoIcon,
    url: 'https://www.tiktok.com/@campanhagasalho',
  },
  {
    labelKey: 'footer.navFacebook',
    icon: FacebookLogoIcon,
    url: 'https://www.facebook.com/campanhadoagasalhouspsc/',
  },
  {
    labelKey: 'footer.navLinkedin',
    icon: LinkedinLogoIcon,
    url: 'https://www.linkedin.com/company/campanha-usp-do-agasalho-oficial/',
  },
] as const

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="w-full bg-blue-1">
      <div className="page-container grid items-start gap-10 py-10 md:grid-cols-2 xl:flex xl:justify-between">
        <Link to="/" className="md:col-span-2 xl:self-center">
          <img src={logo} alt={t('header.logoAlt')} className="h-24" />
        </Link>

        <nav aria-label={t('footer.navLabel')} className="flex flex-col gap-5">
          <p className="text-button text-orange-1">{t('footer.usefulLinks')}</p>
          <ul className="grid grid-flow-col grid-rows-4 gap-x-10 gap-y-5">
            {pages.map((page) => (
              <li key={page.path}>
                <Link
                  to={page.path}
                  className="text-body text-white transition hover:text-orange-1"
                >
                  {t(page.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t('footer.contact')}>
          <div className="flex flex-col gap-5 text-white">
            <p className="text-button text-orange-1">{t('footer.contact')}</p>
            <a
              href="mailto:campanha.agasalho@usp.br"
              className="transition hover:text-orange-1"
            >
              campanha.agasalho@usp.br
            </a>
            <ul className="flex gap-5">
              {socialLinks.map((social) => {
                const CurrentIcon = social.icon
                return (
                  <li key={social.labelKey}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t(social.labelKey)}
                      className="transition hover:text-orange-1"
                    >
                      <CurrentIcon size={32} aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </div>
      <div className="page-container">
        <div className="flex flex-col items-start justify-between gap-5 border-t border-white py-5 text-strong text-white md:flex-row md:items-center">
          <p>© 2026 {t('title')} - USP São Carlos</p>

          <div className="flex items-center gap-3">
            <p>
              {t('footer.madeWith')}{' '}
              <a
                href="https://codelab.icmc.usp.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-codelab hover:underline"
              >
                USPCodeLab Sanca
              </a>
            </p>
            <img src={logoCodeLab} alt="" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  )
}

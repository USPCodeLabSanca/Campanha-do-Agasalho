import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation } from 'react-router'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { pages } from '../constants/pages'

export function SiteLayout() {
  const { t } = useTranslation()
  const { pathname, hash } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const previousPathname = useRef(pathname)

  const currentPath = pathname.replace(/\/$/, '') || '/'
  const page = pages.find((item) => item.path === currentPath)
  const pageName = page ? t(page.labelKey) : t('notFound.pageTitle')
  const title =
    currentPath === '/' ? t('siteName') : `${pageName} | ${t('siteName')}`

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    const hasPathChanged = previousPathname.current !== pathname
    previousPathname.current = pathname

    if (hash) {
      document.querySelector(hash)?.scrollIntoView()
      return
    }

    if (!hasPathChanged) return

    window.scrollTo(0, 0)
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname, hash])

  function skipToContent(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    mainRef.current?.focus()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        onClick={skipToContent}
        className="sr-only rounded-full bg-orange-1 text-button text-blue-1 shadow-md focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:px-5 focus:py-3"
      >
        {t('skipToContent')}
      </a>
      <Header />
      <main
        id="conteudo"
        ref={mainRef}
        tabIndex={-1}
        className="flex-1 focus:outline-none"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

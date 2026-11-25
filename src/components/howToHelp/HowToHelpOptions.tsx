import { useTranslation } from 'react-i18next'

import { TextLink } from '../TextLink'

import { useContacts } from '../../hooks/useContacts'

export function HowToHelpOptions() {
  const { t } = useTranslation()
  const contacts = useContacts()

  const options = [
    { key: 'donate', to: '/pontos-coleta' },
    { key: 'shop', to: '/lojinha' },
    { key: 'raffles', to: contacts?.instagram },
    {
      key: 'partner',
      to: contacts?.email ? `mailto:${contacts.email}` : undefined,
    },
    { key: 'volunteer', to: '/participe' },
  ] as const

  return (
    <section className="section-spacing" aria-labelledby="help-options-title">
      <div className="page-container">
        <h2 id="help-options-title" className="text-h2">
          {t('howToHelp.options.title')}
        </h2>
        <ul
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {options.map((option) => (
            <li
              key={option.key}
              className="flex flex-col card border-green-1/40 p-6"
            >
              <h3 className="text-h4">
                {t(`howToHelp.options.${option.key}.title`)}
              </h3>
              <p className="mt-2 text-body">
                {t(`howToHelp.options.${option.key}.description`)}
              </p>
              {/* Sem link (contato vazio ou ainda carregando), o card fica sem o link */}
              {option.to && (
                <div className="mt-auto pt-6">
                  <TextLink to={option.to}>
                    {t(`howToHelp.options.${option.key}.link`)}
                  </TextLink>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

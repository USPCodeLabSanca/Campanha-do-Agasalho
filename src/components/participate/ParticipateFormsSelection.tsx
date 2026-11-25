import { useTranslation } from 'react-i18next'

import { Button } from '../Button'
import { useContacts } from '../../hooks/useContacts'
import logo from '../../assets/images/logo_without_title.svg'
import arrowIcon from '../../assets/images/arrow_up_right.svg'

export function ParticipateFormsSelection() {
  const { t } = useTranslation()
  const contacts = useContacts()

  return (
    <section
      className="bg-pink-4 section-spacing"
      aria-labelledby="selection-title"
    >
      <div className="page-container">
        <h2 id="selection-title" className="text-h2">
          {t('participate.selection.title')}
        </h2>

        <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-6 rounded-3xl border-2 border-dashed border-gray-1 bg-background p-8 text-center sm:p-12">
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            className="h-28 w-28 object-contain"
          />

          <span className="text-small rounded-full bg-gray-2 px-8 py-3">
            {t('participate.selection.badge')}
          </span>

          <h3 className="text-h3">{t('participate.selection.heading')}</h3>
          <p className="text-body max-w-xl">
            {t('participate.selection.description')}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            {/* O link vem dos contatos (editados no admin).
                Se o Instagram estiver vazio, o botão não aparece */}
            {contacts?.instagram && (
              <Button
                variant="dark"
                href={contacts.instagram}
                rightIcon={<img src={arrowIcon} alt="" />}
              >
                {t('participate.selection.instagram')}
              </Button>
            )}
            <Button variant="outlineDark" to="/como-ajudar">
              {t('participate.selection.help')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
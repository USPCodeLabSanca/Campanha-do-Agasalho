import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpRightIcon, CalendarBlankIcon } from '@phosphor-icons/react'

import { Button } from '../Button'
import { useContacts } from '../../hooks/useContacts'
import { getSelectionProcess } from '../../services/participate'
import type { SelectionProcess } from '../../types/participate'
import { getTranslatedText } from '../../utils/getTranslatedText'
import { formatDate } from '../../utils/formatDate'
import logo from '../../assets/images/logo_without_title.svg'
import arrowIcon from '../../assets/images/arrow_up_right.svg'
import floqHello from '../../assets/images/floq_hello_pink.svg'

export function ParticipateFormsSelection() {
  const { t, i18n } = useTranslation()
  const contacts = useContacts()
  const [selection, setSelection] = useState<SelectionProcess | null>(null)

  useEffect(() => {
    getSelectionProcess().then(setSelection)
  }, [])

  const isOpen = Boolean(selection?.isOpen && selection.formUrl)

  return (
    <section
      className="bg-pink-4 section-spacing"
      aria-labelledby="selection-title"
    >
      <div className="page-container">
        <h2 id="selection-title" className="text-h2">
          {t('participate.selection.title')}
        </h2>

        {selection && (
          <div
            className={`mx-auto mt-10 flex max-w-4xl flex-col items-center gap-6 rounded-3xl p-8 text-center sm:p-12 ${
              isOpen
                ? 'border-2 border-pink-2 bg-white shadow-xl'
                : 'border-2 border-dashed border-gray-1 bg-background'
            }`}
          >
            <img
              src={isOpen ? floqHello : logo}
              alt=""
              aria-hidden="true"
              className="h-28 w-auto object-contain"
            />

            {isOpen ? (
              <span className="flex items-center gap-2 rounded-full bg-green-3 px-8 py-3 text-small font-bold">
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full bg-green-1"
                />
                {t('participate.selection.open.badge')}
              </span>
            ) : (
              <span className="rounded-full bg-gray-2 px-8 py-3 text-small">
                {t('participate.selection.closed.badge')}
              </span>
            )}

            <h3 className="text-h3">
              {isOpen
                ? t('participate.selection.open.heading')
                : t('participate.selection.closed.heading')}
            </h3>
            <p className="max-w-xl text-body">
              {getTranslatedText(
                isOpen ? selection.openMessage : selection.closedMessage,
                i18n.resolvedLanguage,
              )}
            </p>

            {isOpen && selection.deadline && (
              <p className="flex items-center gap-2 rounded-xl bg-orange-3 px-4 py-2 text-strong">
                <CalendarBlankIcon size={20} aria-hidden="true" />
                {t('participate.selection.open.deadline', {
                  date: formatDate(selection.deadline, i18n.resolvedLanguage),
                })}
              </p>
            )}

            <div className="flex flex-col gap-4 sm:flex-row">
              {isOpen ? (
                <Button
                  href={selection.formUrl}
                  rightIcon={<ArrowUpRightIcon size={20} weight="bold" />}
                >
                  {t('participate.selection.open.apply')}
                </Button>
              ) : (
                contacts?.instagram && (
                  <Button
                    variant="dark"
                    href={contacts.instagram}
                    rightIcon={<img src={arrowIcon} alt="" />}
                  >
                    {t('participate.selection.instagram')}
                  </Button>
                )
              )}
              <Button variant="outlineDark" to="/como-ajudar">
                {t('participate.selection.help')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

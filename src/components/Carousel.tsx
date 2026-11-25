import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

export type CarouselCard = {
  image: string
  alt: string
  title: string
  description: string
}

type CarouselProps = {
  label: string
  cards: CarouselCard[]
}

const arrowClasses =
  'absolute top-1/2 flex h-10 cursor-pointer w-10 -translate-y-1/2 items-center justify-center rounded-full bg-orange-1 text-blue-1 shadow-md transition hover:brightness-95'

export function Carousel({ label, cards }: CarouselProps) {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const total = cards.length

  if (total === 0) return null

  const safeIndex = Math.min(currentIndex, total - 1)
  const activeCard = cards[safeIndex]

  function goTo(index: number) {
    setDirection(index < safeIndex ? 'prev' : 'next')
    setCurrentIndex(index)
  }

  function handleNext() {
    setDirection('next')
    setCurrentIndex((safeIndex + 1) % total)
  }

  function handlePrev() {
    setDirection('prev')
    setCurrentIndex((safeIndex - 1 + total) % total)
  }

  return (
    <div
      role="region"
      aria-roledescription={t('carousel.roleDescription')}
      aria-label={label}
      className="mt-10 flex flex-col items-center"
    >
      <div className="relative w-full max-w-160">
        <div aria-live="polite">
          <div
            key={safeIndex}
            role="group"
            aria-roledescription={t('carousel.slide')}
            aria-label={t('carousel.slideLabel', {
              current: safeIndex + 1,
              total,
            })}
            className={`relative flex h-100 flex-col justify-end overflow-hidden rounded-2xl bg-blue-4 p-4 pb-6 drop-shadow-xl ${
              direction === 'next'
                ? 'motion-safe:animate-enter-from-right'
                : 'motion-safe:animate-enter-from-left'
            }`}
          >
            <img
              src={activeCard.image}
              alt={activeCard.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 from-5% via-transparent" />
            <h3 className="relative text-h3 text-white">{activeCard.title}</h3>
            <p className="relative text-small text-white">
              {activeCard.description}
            </p>
          </div>
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              aria-label={t('carousel.previous')}
              className={`${arrowClasses} left-4`}
              onClick={handlePrev}
            >
              <CaretLeftIcon size={20} weight="bold" aria-hidden />
            </button>
            <button
              type="button"
              aria-label={t('carousel.next')}
              className={`${arrowClasses} right-4`}
              onClick={handleNext}
            >
              <CaretRightIcon size={20} weight="bold" aria-hidden />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mt-4 flex items-center gap-1">
          {cards.map((card, index) => {
            const isActive = index === safeIndex
            return (
              <button
                key={card.title}
                type="button"
                aria-label={t('carousel.goTo', { number: index + 1 })}
                aria-current={isActive}
                className="flex h-6 cursor-pointer items-center px-0.5"
                onClick={() => goTo(index)}
              >
                <span
                  className={`block h-2 rounded-full bg-orange-1 transition-all duration-300 ${
                    isActive ? 'w-8' : 'w-2 opacity-50'
                  }`}
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

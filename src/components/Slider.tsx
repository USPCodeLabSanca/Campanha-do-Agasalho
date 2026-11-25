import React from 'react'
import { useState } from 'react'

export interface MemoryCard {
  image: string
  title: string
  description: string
}

interface MultiCardCarouselProps {
  cards: MemoryCard[]
}

export function MultiCardCarousel({ cards }: MultiCardCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  if (cards.length === 0) {
    return null
  }
  const safeIndex =
    cards.length === 0 ? 0 : Math.min(currentIndex, cards.length - 1)
  const activeCard = cards[safeIndex]

  const handleNext = () => {
    setDirection('next')
    setCurrentIndex((safeIndex + 1) % cards.length)
  }

  const handlePrev = () => {
    setDirection('prev')
    setCurrentIndex((safeIndex - 1 + cards.length) % cards.length)
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label="carousel">
      {cards.length > 0 && (
        <div className="mt-10 flex flex-col items-center justify-center">
          <style>{`
                    @keyframes RcardFadeIn {
                        from {
                          opacity: 0.5;
                          transform: translateX(10px);
                        }
                        to {
                          opacity: 1;
                          transform: translateX(0);
                        }
                      }
                    @keyframes LcardFadeIn {
                        from {
                          opacity: 0.5;
                          transform: translateX(-10px);
                        }
                        to {
                          opacity: 1;
                          transform: translateX(0);
                        }
                      }
                      .animate-card-in-left {
                        animation: LcardFadeIn 400ms ease-out;
                      }
                      .animate-card-in-right {
                        animation: RcardFadeIn 400ms ease-out;
                      }
                `}</style>

          <div
            key={safeIndex}
            style={{ backgroundImage: `url(${activeCard.image})` }}
            className={`${
              direction === 'next'
                ? 'animate-card-in-left'
                : 'animate-card-in-right'
            } relative flex h-[25rem] w-full max-w-[40rem] flex-col justify-end rounded-xl bg-blue-4 bg-cover bg-center bg-no-repeat p-4 drop-shadow-xl`}
          >
            <div className="z-50 flex justify-between pb-24">
              <button
                type="button"
                aria-label="Previous Slide"
                className="h-[2.5rem] w-[2.5rem] rounded-full border-white bg-white text-button text-blue-1 opacity-40 transition-opacity hover:bg-white hover:text-blue-1 hover:opacity-100"
                onClick={handlePrev}
              >
                &lt;
              </button>
              <button
                type="button"
                aria-label="Next Slide"
                className="h-[2.5rem] w-[2.5rem] rounded-full border-white bg-white text-button text-blue-1 opacity-40 transition-opacity hover:bg-white hover:text-blue-1 hover:opacity-100"
                onClick={handleNext}
              >
                &gt;
              </button>
            </div>
            <h3 className="z-50 text-body-lg text-white">{activeCard.title}</h3>
            <p className="z-50 text-small text-white">
              {activeCard.description}
            </p>
            <div className="absolute inset-0 z-10 rounded-xl bg-gradient-to-t from-black/75 from-5% via-transparent" />
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            {cards.map((_card, index) => {
              const isActive = index === safeIndex
              return (
                <div
                  key={index}
                  className={`h-[0.5rem] rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-[2rem] bg-orange-1 opacity-100'
                      : 'w-[0.5rem] bg-orange-1 opacity-50'
                  }`}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

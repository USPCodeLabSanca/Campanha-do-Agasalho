import { useState } from 'react'

import snowFlake from '../assets/images/snowflake.svg'
import snowBall from '../assets/images/snowball.svg'

type SnowfallProps = {
  count?: number
}

function createFlakes(count: number) {
  const flakes = []

  for (let i = 0; i < count; i++) {
    flakes.push({
      top: Math.random() * 100,
      left: Math.random() * 100,
      src: Math.random() < 0.6 ? snowFlake : snowBall,
    })
  }

  return flakes
}

// Flocos de neve espalhados. O elemento pai precisa ter "relative" e "overflow-hidden".
export function Snowfall({ count = 65 }: SnowfallProps) {
  const [flakes] = useState(() => createFlakes(count))

  return (
    <>
      {flakes.map((flake, index) => (
        <img
          key={index}
          src={flake.src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ top: `${flake.top}%`, left: `${flake.left}%` }}
        />
      ))}
    </>
  )
}

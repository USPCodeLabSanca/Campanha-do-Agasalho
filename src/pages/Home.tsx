import { HomeHero } from '../components/home/HomeHero'
import { HomeGetStarted } from '../components/home/HomeGetStarted'
import { HomeHowItWorks } from '../components/home/HomeHowItWorks'
import { HomeJoin } from '../components/home/HomeJoin'

export function Home() {
  return (
    <>
      <HomeHero />
      <HomeGetStarted />
      <HomeHowItWorks />
      <HomeJoin />
    </>
  )
}

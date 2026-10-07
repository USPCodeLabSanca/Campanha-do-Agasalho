import { HomeHero } from '../components/home/HomeHero'
import { HomeGetStarted } from '../components/home/HomeGetStarted'
import { HomeHowItWorks } from '../components/home/HomeHowItWorks'

export function Home() {
  return (
    <>
      <HomeHero />
      <HomeGetStarted />
      <HomeHowItWorks />
    </>
  )
}

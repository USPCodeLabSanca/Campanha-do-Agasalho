import { Route, Routes } from 'react-router'

import { Home } from './pages/Home'
import { Campaign } from './pages/Campaign'
import { HowToHelp } from './pages/HowToHelp'
import { CollectionPoints } from './pages/CollectionPoints'
import { Entities } from './pages/Entities'
import { Impact } from './pages/Impact'
import { Participate } from './pages/Participate'
import { Shop } from './pages/Shop'
import { NotFound } from './pages/NotFound'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/campanha" element={<Campaign />} />
      <Route path="/como-ajudar" element={<HowToHelp />} />
      <Route path="/pontos-coleta" element={<CollectionPoints />} />
      <Route path="/entidades" element={<Entities />} />
      <Route path="/impacto" element={<Impact />} />
      <Route path="/lojinha" element={<Shop />} />
      <Route path="/participe" element={<Participate />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

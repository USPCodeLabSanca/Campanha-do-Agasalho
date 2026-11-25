import floqCar from '../assets/images/floq_car_entity.svg'
import floqInfra from '../assets/images/floq_jumping_infra.svg'
import floqMoney from '../assets/images/floq_money_orange.svg'
import floqSmartphone from '../assets/images/floq_smartphone_pink.svg'
import floqSuit from '../assets/images/floq_suit.svg'

import type { MascotKey } from '../types/participate'

export const MASCOTS: Record<MascotKey, { label: string; src: string }> = {
  suit: { label: 'Pinguim de terno', src: floqSuit },
  smartphone: { label: 'Pinguim com celular', src: floqSmartphone },
  car: { label: 'Pinguim no carro', src: floqCar },
  money: { label: 'Pinguim com moedas', src: floqMoney },
  infra: { label: 'Pinguim pulando', src: floqInfra },
}

export const MASCOT_KEYS = Object.keys(MASCOTS) as MascotKey[]

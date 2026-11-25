import {
  AddressBookIcon,
  ChartBarIcon,
  ClockCounterClockwiseIcon,
  HandHeartIcon,
  HouseIcon,
  MapPinIcon,
  ShoppingBagIcon,
  UsersThreeIcon,
  type Icon,
} from '@phosphor-icons/react'

export type AdminPage = {
  path: string
  label: string
  icon: Icon
}

export type AdminPageGroup = {
  title?: string
  pages: AdminPage[]
}

export const adminPageGroups: AdminPageGroup[] = [
  {
    pages: [{ path: '/admin', label: 'Painel', icon: HouseIcon }],
  },
  {
    title: 'Conteúdo do site',
    pages: [
      {
        path: '/admin/pontos-de-coleta',
        label: 'Pontos de coleta',
        icon: MapPinIcon,
      },
      { path: '/admin/entidades', label: 'Entidades', icon: HandHeartIcon },
      {
        path: '/admin/produtos',
        label: 'Produtos da lojinha',
        icon: ShoppingBagIcon,
      },
      {
        path: '/admin/edicoes',
        label: 'Edições e números',
        icon: ChartBarIcon,
      },
      {
        path: '/admin/linha-do-tempo',
        label: 'Linha do tempo',
        icon: ClockCounterClockwiseIcon,
      },
      {
        path: '/admin/participe',
        label: 'Participe',
        icon: UsersThreeIcon,
      },
    ],
  },
  {
    title: 'Geral',
    pages: [
      {
        path: '/admin/contatos',
        label: 'Contatos e redes',
        icon: AddressBookIcon,
      },
    ],
  },
]
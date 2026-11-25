import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import {
  AddressBookIcon,
  ChartBarIcon,
  ClockCounterClockwiseIcon,
  HandHeartIcon,
  MapPinIcon,
  PlusIcon,
  ShoppingBagIcon,
} from '@phosphor-icons/react'

import { AdminStatCard } from '../../components/admin/AdminStatCard'

import { getCollectionPoints } from '../../services/collectionPoints'
import { getEntities } from '../../services/entities'
import { getProducts } from '../../services/shop'
import { getEditions } from '../../services/impact'
import type { CollectionPoint } from '../../types/collectionPoint'
import type { Entity } from '../../types/entity'
import type { Product } from '../../types/product'
import type { Edition } from '../../types/edition'

import floqSuit from '../../assets/images/floq_suit.svg'

type DashboardData = {
  points: CollectionPoint[]
  entities: Entity[]
  products: Product[]
  editions: Edition[]
}

const shortcuts = [
  {
    label: 'Adicionar ponto de coleta',
    to: '/admin/pontos-de-coleta',
    state: { openNewForm: true },
    icon: PlusIcon,
  },
  {
    label: 'Adicionar produto',
    to: '/admin/produtos',
    state: { openNewForm: true },
    icon: PlusIcon,
  },
  {
    label: 'Adicionar marco na linha do tempo',
    to: '/admin/linha-do-tempo',
    state: { openNewForm: true },
    icon: ClockCounterClockwiseIcon,
  },
  {
    label: 'Editar contatos e redes',
    to: '/admin/contatos',
    icon: AddressBookIcon,
  },
]

export function AdminHome() {
  const [data, setData] = useState<DashboardData | null>(null)

  useEffect(() => {
    // Busca tudo ao mesmo tempo e só mostra quando tudo chegou
    Promise.all([
      getCollectionPoints(),
      getEntities(),
      getProducts(),
      getEditions(),
    ]).then(([points, entities, products, editions]) => {
      setData({ points, entities, products, editions })
    })
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start gap-4 rounded-2xl bg-orange-3 p-6 sm:flex-row sm:items-center sm:gap-6 sm:px-8">
        <img src={floqSuit} alt="" className="h-20 w-auto shrink-0 sm:h-28" />
        <div className="flex flex-col gap-2">
          <h1 className="text-h2">Olá, equipe!</h1>
          <p className="text-body-lg">
            Aqui está um resumo do que está no site agora.
          </p>
        </div>
      </div>

      {!data ? (
        <p className="text-body">Carregando...</p>
      ) : (
        <DashboardStats data={data} />
      )}

      <section
        aria-labelledby="shortcuts-title"
        className="flex flex-col gap-4"
      >
        <h2 id="shortcuts-title" className="text-h4">
          Atalhos
        </h2>
        <ul className="grid auto-rows-fr gap-3 sm:grid-cols-2">
          {shortcuts.map((shortcut) => (
            <li key={shortcut.label}>
              <Link
                to={shortcut.to}
                state={shortcut.state}
                className="flex h-full items-center gap-3 rounded-2xl border border-gray-2 bg-white p-4 text-strong transition hover:border-blue-1"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-orange-3 text-orange-2">
                  <shortcut.icon size={20} aria-hidden="true" />
                </span>
                {shortcut.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function DashboardStats({ data }: { data: DashboardData }) {
  const activePoints = data.points.filter((point) => point.isActive).length
  const activeEntities = data.entities.filter(
    (entity) => entity.isActive,
  ).length
  const soldOut = data.products.filter((product) => product.isSoldOut).length
  const ongoing = data.editions.find((edition) => edition.isOngoing)

  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <li>
        <AdminStatCard
          to="/admin/pontos-de-coleta"
          icon={MapPinIcon}
          label="Pontos de coleta"
          value={String(activePoints)}
          detail={`no site, de ${data.points.length} cadastrados`}
        />
      </li>
      <li>
        <AdminStatCard
          to="/admin/entidades"
          icon={HandHeartIcon}
          label="Entidades"
          value={String(activeEntities)}
          detail={`no site, de ${data.entities.length} cadastradas`}
        />
      </li>
      <li>
        <AdminStatCard
          to="/admin/produtos"
          icon={ShoppingBagIcon}
          label="Produtos da lojinha"
          value={String(data.products.length)}
          detail={
            soldOut === 0
              ? 'nenhum esgotado'
              : `${soldOut} ${soldOut === 1 ? 'esgotado' : 'esgotados'}`
          }
          isWarning={soldOut > 0}
        />
      </li>
      <li>
        <AdminStatCard
          to="/admin/edicoes"
          icon={ChartBarIcon}
          label="Edição em andamento"
          value={ongoing ? String(ongoing.year) : '—'}
          detail={
            ongoing
              ? `${ongoing.totalCollected.toLocaleString('pt-BR')} peças até agora`
              : 'nenhuma edição em andamento'
          }
        />
      </li>
    </ul>
  )
}

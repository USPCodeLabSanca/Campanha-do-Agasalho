import { Link, NavLink } from 'react-router'

import { ArrowSquareOutIcon } from '@phosphor-icons/react'

import { adminPageGroups } from '../../constants/adminPages'

type AdminSidebarProps = {
  isOpen: boolean
  onNavigate: () => void
}

const linkClasses =
  'flex items-center gap-3 rounded-xl px-3 py-2 text-strong transition'

export function AdminSidebar({ isOpen, onNavigate }: AdminSidebarProps) {
  return (
    <nav
      id="admin-sidebar"
      aria-label="Menu do admin"
      className={`fixed top-16 bottom-0 left-0 z-40 flex w-72 max-w-[85vw] flex-col gap-1 overflow-y-auto border-r border-gray-2 bg-white p-4 transition md:visible md:sticky md:h-[calc(100dvh-4rem)] md:w-60 md:shrink-0 md:translate-x-0 md:shadow-none ${
        isOpen
          ? 'visible translate-x-0 shadow-xl'
          : 'invisible -translate-x-full'
      }`}
    >
      {adminPageGroups.map((group, index) => (
        <div key={group.title ?? index}>
          {group.title && (
            <p className="px-3 pt-4 pb-2 text-caption font-extrabold tracking-widest text-blue-4 uppercase">
              {group.title}
            </p>
          )}

          <ul className="flex flex-col gap-1">
            {group.pages.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `${linkClasses} ${isActive ? 'bg-blue-1 text-white' : 'hover:bg-background'}`
                  }
                >
                  <Icon size={20} aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="mt-auto border-t border-gray-2 pt-3">
        <Link to="/" className={`${linkClasses} hover:bg-background`}>
          Voltar ao site
          <ArrowSquareOutIcon size={20} aria-hidden="true" />
        </Link>
      </div>
    </nav>
  )
}

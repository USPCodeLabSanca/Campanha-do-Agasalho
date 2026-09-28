import { NavLink } from 'react-router'

type NavItemProps = {
  to: string
  children: React.ReactNode
}

const baseClasses = 'transition px-2 py-1'

const inactiveClasses = 'text-body text-white hover:text-orange-1'

const activeClasses =
  'text-button text-orange-1 underline underline-offset-8 decoration-2'

export function NavItem({ to, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      {children}
    </NavLink>
  )
}

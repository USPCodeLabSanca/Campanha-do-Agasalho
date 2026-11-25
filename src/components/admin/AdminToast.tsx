import { useEffect } from 'react'
import { CheckCircleIcon } from '@phosphor-icons/react'

type AdminToastProps = {
  message: string
  onHide: () => void
}

const TOAST_DURATION = 3000

export function AdminToast({ message, onHide }: AdminToastProps) {
  useEffect(() => {
    const timer = setTimeout(onHide, TOAST_DURATION)
    return () => clearTimeout(timer)
  }, [message, onHide])

  return (
    <div
      role="status"
      className="fixed right-4 bottom-4 left-4 z-50 mx-auto flex max-w-sm items-center gap-2 rounded-full bg-blue-1 px-5 py-3 text-strong text-white shadow-lg sm:left-auto"
    >
      <CheckCircleIcon size={22} aria-hidden="true" className="text-green-2" />
      {message}
    </div>
  )
}

import { useEffect, useState } from 'react'

import { getContacts } from '../services/contacts'
import type { Contacts } from '../types/contacts'

export function useContacts() {
  const [contacts, setContacts] = useState<Contacts | null>(null)

  useEffect(() => {
    getContacts().then(setContacts)
  }, [])

  return contacts
}

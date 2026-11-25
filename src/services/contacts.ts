import type { Contacts } from '../types/contacts'

let mockContacts: Contacts = {
  email: 'campanha.agasalho@usp.br',
  whatsapp: '16900000000',
  instagram: 'https://www.instagram.com/instagasalho',
  tiktok: 'https://www.tiktok.com/@campanhagasalho',
  facebook: 'https://www.facebook.com/campanhadoagasalhouspsc/',
  linkedin:
    'https://www.linkedin.com/company/campanha-usp-do-agasalho-oficial/',
}

export async function getContacts(): Promise<Contacts> {
  return mockContacts
}

export async function updateContacts(contacts: Contacts): Promise<Contacts> {
  mockContacts = contacts
  return mockContacts
}

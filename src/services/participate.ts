import type {
  Nucleus,
  NucleusInput,
  SelectionProcess,
} from '../types/participate'

let mockNuclei: Nucleus[] = [
  {
    id: 'gerais',
    name: { pt: 'Gerais', en: 'General' },
    description: {
      pt: 'Coordena a campanha, conecta os núcleos e acompanha metas e prazos da edição.',
      en: 'Coordinates the campaign, connects the teams and tracks goals and deadlines.',
    },
    mascot: 'suit',
    isActive: true,
  },
  {
    id: 'divulgacao',
    name: { pt: 'Divulgação', en: 'Outreach' },
    description: {
      pt: 'Cria posts, artes, conteúdos para o Instagram e estratégias para alcançarmos cada vez mais pessoas.',
      en: 'Creates posts, artwork and Instagram content, and strategies to reach more and more people.',
    },
    mascot: 'smartphone',
    isActive: true,
  },
  {
    id: 'entidades',
    name: { pt: 'Entidades', en: 'Organizations' },
    description: {
      pt: 'Faz a ponte com as entidades parceiras e organiza a entrega das doações.',
      en: 'Builds the bridge with partner organizations and handles donation deliveries.',
    },
    mascot: 'car',
    isActive: true,
  },
  {
    id: 'relacoes-externas',
    name: { pt: 'Relações externas', en: 'External relations' },
    description: {
      pt: 'Gerencia os recursos e constrói parcerias com patrocinadores que tornam o projeto possível.',
      en: 'Manages resources and builds partnerships with the sponsors that make the project possible.',
    },
    mascot: 'money',
    isActive: true,
  },
  {
    id: 'infraestrutura',
    name: { pt: 'Infraestrutura', en: 'Infrastructure' },
    description: {
      pt: 'Cuida da arrecadação, administra as caixas de doação e planeja os grandes eventos.',
      en: 'Handles collection, manages the donation boxes and plans the big events.',
    },
    mascot: 'infra',
    isActive: true,
  },
]

let mockSelectionProcess: SelectionProcess = {
  isOpen: false,
  formUrl: '',
  deadline: '',
  openMessage: {
    pt: 'Quer ajudar a aquecer mais gente neste inverno? Preencha o formulário e venha fazer parte da campanha.',
    en: 'Want to help keep more people warm this winter? Fill out the form and join the campaign.',
  },
  closedMessage: {
    pt: 'As inscrições abrem no início de cada semestre. Acompanhe o Instagram da campanha para saber da próxima chamada — e, enquanto isso, você pode ajudar doando.',
    en: 'Applications open at the start of each semester. Follow the campaign on Instagram to hear about the next call — and in the meantime you can help by donating.',
  },
}

export async function getNuclei(): Promise<Nucleus[]> {
  return mockNuclei
}

export async function updateNucleus(
  id: string,
  input: NucleusInput,
): Promise<Nucleus> {
  const nucleus = { id, ...input }
  mockNuclei = mockNuclei.map((item) => (item.id === id ? nucleus : item))
  return nucleus
}

export async function getSelectionProcess(): Promise<SelectionProcess> {
  return mockSelectionProcess
}

export async function updateSelectionProcess(
  input: SelectionProcess,
): Promise<SelectionProcess> {
  mockSelectionProcess = input
  return mockSelectionProcess
}

import type { DestinationType } from '../types/edition'

export const DESTINATION_LABELS: Record<DestinationType, string> = {
  shelters: 'Abrigos e casas de acolhida',
  elderly: 'Instituições para idosos',
  childcare: 'Creches e escolas',
  socialProjects: 'Projetos sociais e ONGs',
  families: 'Famílias atendidas pelo CRAS',
}

export const DESTINATION_TYPES = Object.keys(
  DESTINATION_LABELS,
) as DestinationType[]

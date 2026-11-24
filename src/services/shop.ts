import type { Product } from '../types/product'

const mockProducts: Product[] = [
  {
    id: 'camiseta-2026',
    name: 'Camiseta Campanha 2026',
    category: 'clothes',
    price: 50,
    description:
      'Camiseta de algodão azul com a arte da edição 2026 na frente e o logo da campanha nas costas.',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: 'caneca-floquinho',
    name: 'Caneca Floquinho',
    category: 'mugs',
    price: 35,
    description: 'Caneca de cerâmica de 325 ml com o Floquinho de cachecol.',
  },
  {
    id: 'tirante',
    name: 'Tirante Campanha do Agasalho',
    category: 'accessories',
    price: 15,
    description:
      'Tirante azul com o nome da campanha e mosquetão, para pendurar crachá ou chaves.',
  },
  {
    id: 'chaveiro-floquinho',
    name: 'Chaveiro Floquinho',
    category: 'accessories',
    price: 12,
    description: 'Chaveiro de acrílico com o Floquinho de cachecol.',
  },
  {
    id: 'chaveiro-floquinho-festivo',
    name: 'Chaveiro Floquinho Festivo',
    category: 'accessories',
    price: 12,
    description: 'Chaveiro de acrílico com o Floquinho de chapéu de festa.',
  },
  {
    id: 'botton-floquinho',
    name: 'Botton Floquinho',
    category: 'accessories',
    price: 6,
    description:
      'Botton de 4,5 cm com o Floquinho, para usar na mochila ou na roupa.',
  },
  {
    id: 'botton-quente',
    name: 'Botton Quanto mais gente, mais quente',
    category: 'accessories',
    price: 6,
    description: 'Botton de 4,5 cm com a frase da campanha em laranja.',
  },
]

export async function getProducts(): Promise<Product[]> {
  return mockProducts
}

import type { Product, ProductInput } from '../types/product'

let mockProducts: Product[] = [
  {
    id: 'camiseta-2026',
    name: 'Camiseta Campanha 2026',
    category: 'clothes',
    price: 50,
    description: {
      pt: 'Camiseta de algodão azul com a arte da edição 2026 na frente e o logo da campanha nas costas.',
      en: 'Blue cotton T-shirt with the 2026 edition artwork on the front and the campaign logo on the back.',
    },
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    sizeGuide: [
      { size: 'PP', width: 46, length: 64 },
      { size: 'P', width: 50, length: 68 },
      { size: 'M', width: 53, length: 71 },
      { size: 'G', width: 56, length: 74 },
      { size: 'GG', width: 60, length: 77 },
    ],
  },
  {
    id: 'caneca-floquinho',
    name: 'Caneca Floquinho',
    category: 'mugs',
    price: 35,
    description: {
      pt: 'Caneca de cerâmica de 325 ml com o Floquinho de cachecol.',
      en: '325 ml ceramic mug with Floquinho wearing a scarf.',
    },
  },
  {
    id: 'tirante',
    name: 'Tirante Campanha do Agasalho',
    category: 'accessories',
    price: 15,
    description: {
      pt: 'Tirante azul com o nome da campanha e mosquetão, para pendurar crachá ou chaves.',
      en: 'Blue lanyard with the campaign name and a clip, for badges or keys.',
    },
  },
  {
    id: 'chaveiro-floquinho',
    name: 'Chaveiro Floquinho',
    category: 'accessories',
    price: 12,
    description: {
      pt: 'Chaveiro de acrílico com o Floquinho de cachecol.',
      en: 'Acrylic keychain with Floquinho wearing a scarf.',
    },
  },
  {
    id: 'chaveiro-floquinho-festivo',
    name: 'Chaveiro Floquinho Festivo',
    category: 'accessories',
    price: 12,
    description: {
      pt: 'Chaveiro de acrílico com o Floquinho de chapéu de festa.',
      en: 'Acrylic keychain with Floquinho wearing a party hat.',
    },
  },
  {
    id: 'botton-floquinho',
    name: 'Botton Floquinho',
    category: 'accessories',
    price: 6,
    description: {
      pt: 'Botton de 4,5 cm com o Floquinho, para usar na mochila ou na roupa.',
      en: '4.5 cm button with Floquinho, for your backpack or clothes.',
    },
  },
  {
    id: 'botton-quente',
    name: 'Botton Quanto mais gente, mais quente',
    category: 'accessories',
    price: 6,
    description: {
      pt: 'Botton de 4,5 cm com a frase da campanha em laranja.',
      en: '',
    },
  },
]

export async function getProducts(): Promise<Product[]> {
  return mockProducts
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const product = { id: crypto.randomUUID(), ...input }
  mockProducts = [...mockProducts, product]
  return product
}

export async function updateProduct(
  id: string,
  input: ProductInput,
): Promise<Product> {
  const product = { id, ...input }
  mockProducts = mockProducts.map((item) => (item.id === id ? product : item))
  return product
}

export async function deleteProduct(id: string): Promise<void> {
  mockProducts = mockProducts.filter((item) => item.id !== id)
}

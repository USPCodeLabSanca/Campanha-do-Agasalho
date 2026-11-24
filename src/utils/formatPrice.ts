export function formatPrice(value: number, language = 'pt') {
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

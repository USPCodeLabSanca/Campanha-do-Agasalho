export function formatCompact(value: number, language = 'pt') {
  return new Intl.NumberFormat(language, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

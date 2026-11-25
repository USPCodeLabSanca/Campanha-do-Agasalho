export function formatDate(date: string, language = 'pt') {
  const [year, month, day] = date.split('-').map(Number)

  return new Date(year, month - 1, day).toLocaleDateString(language, {
    day: 'numeric',
    month: 'long',
  })
}

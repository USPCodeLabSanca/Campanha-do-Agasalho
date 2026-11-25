export function onlyPhoneDigits(value: string) {
  return value.replace(/\D/g, '').slice(0, 11)
}

export function formatPhone(digits: string) {
  const ddd = digits.slice(0, 2)
  const number = digits.slice(2)

  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${ddd}`
  if (number.length <= 4) return `(${ddd}) ${number}`

  const splitAt = number.length === 9 ? 5 : 4
  return `(${ddd}) ${number.slice(0, splitAt)}-${number.slice(splitAt)}`
}

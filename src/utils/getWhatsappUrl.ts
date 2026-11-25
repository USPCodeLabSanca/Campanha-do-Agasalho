export function getWhatsappUrl(phone: string, message: string) {
  return `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`
}

const API_URL = import.meta.env.VITE_API_URL

export async function login(email: string, password: string) {
  if (!API_URL) {
    throw new Error('VITE_API_URL não configurada. Veja o .env.example.')
  }

  const response = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })

  return response.ok
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { WarningCircleIcon } from '@phosphor-icons/react'

import { Button } from '../../components/Button'
import { Snowfall } from '../../components/Snowfall'
import { login } from '../../services/auth'

import logo from '../../assets/images/logo.svg'
import floqWelcome from '../../assets/images/floq_welcome_admin.svg'

const inputClasses =
  'w-full rounded-lg border border-gray-1 bg-white px-4 py-3 text-body placeholder:text-blue-4/70'

export function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    document.title = 'Entrar | Admin - Campanha USP do Agasalho'
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    try {
      const isLoggedIn = await login(email, password)

      if (isLoggedIn) {
        navigate('/admin')
      } else {
        setErrorMessage('E-mail ou senha incorretos.')
      }
    } catch {
      setErrorMessage(
        'Não foi possível conectar ao servidor. Tente novamente mais tarde.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen bg-background text-blue-1 lg:grid-cols-2">
      <div className="relative hidden items-center justify-center overflow-hidden bg-linear-to-b from-blue-1 to-blue-5 lg:flex">
        <Snowfall count={40} />
        <img src={floqWelcome} alt="" className="relative w-full max-w-96" />
      </div>

      <main className="flex flex-col items-center justify-center px-4 py-12">
        <img
          src={logo}
          alt="Campanha USP do Agasalho"
          className="h-24 w-auto"
        />

        <div className="mt-8 w-full max-w-md rounded-2xl border border-gray-2 bg-white p-6 sm:p-8">
          <h1 className="text-h2">Área administrativa</h1>
          <p className="mt-2 text-body">
            Entre com seu acesso da equipe para atualizar o conteúdo do site.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
            <div>
              <label htmlFor="email" className="text-strong">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="email@usp.br"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={`mt-2 ${inputClasses}`}
              />
            </div>

            <div>
              <label htmlFor="password" className="text-strong">
                Senha
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Sua senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={`mt-2 ${inputClasses}`}
              />
            </div>

            {errorMessage && (
              <p
                role="alert"
                className="flex items-center gap-2 text-small font-bold"
              >
                <WarningCircleIcon
                  size={20}
                  weight="fill"
                  className="shrink-0 text-orange-2"
                  aria-hidden="true"
                />
                {errorMessage}
              </p>
            )}

            <Button type="submit" variant="dark" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <p className="mt-5 text-center text-small">
            Esqueceu a senha? Fale com a coordenação.
          </p>
        </div>
      </main>
    </div>
  )
}

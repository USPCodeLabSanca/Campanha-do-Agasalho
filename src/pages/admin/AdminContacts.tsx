import { useCallback, useEffect, useState } from 'react'

import { Button } from '../../components/Button'
import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { AdminToast } from '../../components/admin/AdminToast'
import { TextField } from '../../components/admin/form/TextField'

import { getContacts, updateContacts } from '../../services/contacts'
import type { Contacts } from '../../types/contacts'
import { formatPhone, onlyPhoneDigits } from '../../utils/formatPhone'

export function AdminContacts() {
  const [values, setValues] = useState<Contacts | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    getContacts().then(setValues)
  }, [])

  const hideToast = useCallback(() => setToast(null), [])

  function updateField(key: keyof Contacts, value: string) {
    setValues((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!values) return

    setIsSaving(true)

    await updateContacts({
      email: values.email.trim(),
      whatsapp: values.whatsapp.trim(),
      instagram: values.instagram.trim(),
      tiktok: values.tiktok.trim(),
      facebook: values.facebook.trim(),
      linkedin: values.linkedin.trim(),
    })

    setIsSaving(false)
    setToast('Contatos salvos')
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Contatos e redes"
        description="Aparecem no rodapé do site, em Como ajudar e na sacolinha da Lojinha."
      />

      {!values ? (
        <p className="text-body">Carregando...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-2 bg-white"
        >
          <div className="flex flex-col gap-8 p-6">
            {/* Cada seção ocupa a largura toda, com os campos em duas colunas */}
            <fieldset>
              <legend className="mb-4 text-h4">Contato</legend>
              <div className="grid items-start gap-5 md:grid-cols-2">
                <TextField
                  label="E-mail"
                  type="email"
                  value={values.email}
                  onChange={(value) => updateField('email', value)}
                />
                <TextField
                  label="WhatsApp da Lojinha"
                  type="tel"
                  pattern="\(\d{2}\) \d{4,5}-\d{4}"
                  value={formatPhone(values.whatsapp)}
                  onChange={(value) =>
                    updateField('whatsapp', onlyPhoneDigits(value))
                  }
                  help="Com DDD. Ex.: (16) 99999-0000"
                />
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-1 text-h4">Redes sociais</legend>
              <p className="mb-4 text-small text-blue-4">
                Use o link completo, começando com https://. Uma rede deixada
                vazia não aparece no site.
              </p>
              <div className="grid gap-5 md:grid-cols-2">
                <TextField
                  label="Instagram"
                  type="url"
                  value={values.instagram}
                  onChange={(value) => updateField('instagram', value)}
                />
                <TextField
                  label="TikTok"
                  type="url"
                  value={values.tiktok}
                  onChange={(value) => updateField('tiktok', value)}
                />
                <TextField
                  label="Facebook"
                  type="url"
                  value={values.facebook}
                  onChange={(value) => updateField('facebook', value)}
                />
                <TextField
                  label="LinkedIn"
                  type="url"
                  value={values.linkedin}
                  onChange={(value) => updateField('linkedin', value)}
                />
              </div>
            </fieldset>
          </div>

          <div className="flex justify-end px-6 pb-6">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      )}

      {toast && <AdminToast message={toast} onHide={hideToast} />}
    </div>
  )
}

import { useState } from 'react'

import { AdminDrawer } from '../AdminDrawer'
import { TextField } from '../form/TextField'
import { CheckboxField } from '../form/CheckboxField'

import type {
  CollectionPoint,
  CollectionPointInput,
} from '../../../types/collectionPoint'
import { hasCoords } from '../../../utils/collectionPoints'
import { parseMapsLink } from '../../../utils/parseMapsLink'

type CollectionPointFormProps = {
  point?: CollectionPoint
  isSaving: boolean
  onSave: (input: CollectionPointInput) => void
  onClose: () => void
}

const emptyPoint: CollectionPointInput = {
  name: '',
  address: '',
  neighborhood: '',
  hours: '',
  isActive: true,
}

export function CollectionPointForm({
  point,
  isSaving,
  onSave,
  onClose,
}: CollectionPointFormProps) {
  const [values, setValues] = useState<CollectionPointInput>(
    point ?? emptyPoint,
  )
  const [mapsLink, setMapsLink] = useState('')
  const [error, setError] = useState<string | null>(null)

  function updateField<Key extends keyof CollectionPointInput>(
    key: Key,
    value: CollectionPointInput[Key],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const linkLocation = mapsLink.trim() ? parseMapsLink(mapsLink) : null
  const hasLocation = point ? hasCoords(point) : false

  function getLinkHelp() {
    if (mapsLink.trim()) {
      return linkLocation
        ? '✓ Localização encontrada no link.'
        : 'Não achamos a localização nesse link. Veja a dica abaixo.'
    }
    if (hasLocation) {
      return 'Este ponto já está no mapa. Cole um link novo só se quiser mudar o lugar.'
    }
    return 'Sem a localização, o ponto aparece na lista, mas não no mapa.'
  }

  function handleSubmit() {
    if (mapsLink.trim() && !linkLocation) {
      setError(
        'Não achamos a localização no link do Google Maps. Abra o link no navegador e copie o endereço completo da barra.',
      )
      return
    }

    onSave({
      name: values.name.trim(),
      address: values.address.trim(),
      neighborhood: values.neighborhood?.trim(),
      hours: values.hours.trim(),
      isActive: values.isActive,
      lat: linkLocation?.lat ?? values.lat,
      lng: linkLocation?.lng ?? values.lng,
    })
  }

  return (
    <AdminDrawer
      title={point ? 'Editar ponto de coleta' : 'Adicionar ponto de coleta'}
      isSaving={isSaving}
      error={error}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <TextField
        label="Nome do local"
        value={values.name}
        onChange={(value) => updateField('name', value)}
        required
      />
      <TextField
        label="Endereço"
        value={values.address}
        onChange={(value) => updateField('address', value)}
      />
      <TextField
        label="Bairro"
        value={values.neighborhood ?? ''}
        onChange={(value) => updateField('neighborhood', value)}
        help="Aparece no filtro de bairro do site. Escreva sempre do mesmo jeito para os pontos do mesmo bairro ficarem juntos."
      />
      <TextField
        label="Horário"
        value={values.hours}
        onChange={(value) => updateField('hours', value)}
        help="Ex.: Seg a sex, 8h às 22h"
      />

      <div className="flex flex-col gap-2">
        <TextField
          label="Link do Google Maps"
          type="url"
          value={mapsLink}
          onChange={(value) => {
            setMapsLink(value)
            setError(null)
          }}
          help={getLinkHelp()}
        />
        <details className="text-small text-blue-4">
          <summary className="cursor-pointer text-strong text-blue-1">
            Como pegar o link
          </summary>
          <ol className="mt-2 ml-5 list-decimal space-y-1">
            <li>Abra o Google Maps no computador e procure o lugar.</li>
            <li>Clique no lugar para ele ficar marcado no mapa.</li>
            <li>Copie o endereço da barra do navegador e cole aqui.</li>
          </ol>
          <p className="mt-2">
            Links curtos, como maps.app.goo.gl, não trazem a localização. Se for
            o caso, abra o link no navegador e copie o endereço completo.
          </p>
        </details>
      </div>

      <CheckboxField
        label="Mostrar no site"
        checked={values.isActive}
        onChange={(checked) => updateField('isActive', checked)}
        help="Desmarque para esconder o ponto sem precisar excluir"
      />
    </AdminDrawer>
  )
}

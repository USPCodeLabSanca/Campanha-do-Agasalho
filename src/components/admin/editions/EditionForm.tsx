import { useState } from 'react'

import { AdminDrawer } from '../AdminDrawer'
import { TextField } from '../form/TextField'
import { CheckboxField } from '../form/CheckboxField'

import {
  DESTINATION_LABELS,
  DESTINATION_TYPES,
} from '../../../constants/impact'
import { MAX_YEAR, MIN_YEAR } from '../../../constants/years'
import type { DestinationType, Edition } from '../../../types/edition'

type EditionFormProps = {
  edition?: Edition
  usedYears: number[]
  isSaving: boolean
  onSave: (edition: Edition) => void
  onClose: () => void
}

type FormValues = {
  year: string
  totalCollected: string
  totalCollectionPoints: string
  totalBeneficiaryEntities: string
  volunteers: string
  isOngoing: boolean
  destinations: Record<DestinationType, string>
}

function toFormValues(edition?: Edition): FormValues {
  const destinations = {} as Record<DestinationType, string>
  DESTINATION_TYPES.forEach((type) => {
    const destination = edition?.destinations?.find(
      (item) => item.type === type,
    )
    destinations[type] = destination ? String(destination.percentage) : ''
  })

  return {
    year: edition ? String(edition.year) : String(new Date().getFullYear()),
    totalCollected: edition ? String(edition.totalCollected) : '',
    totalCollectionPoints: edition ? String(edition.totalCollectionPoints) : '',
    totalBeneficiaryEntities: edition
      ? String(edition.totalBeneficiaryEntities)
      : '',
    volunteers: edition ? String(edition.volunteers) : '',
    isOngoing: edition?.isOngoing ?? false,
    destinations,
  }
}

export function EditionForm({
  edition,
  usedYears,
  isSaving,
  onSave,
  onClose,
}: EditionFormProps) {
  const [values, setValues] = useState<FormValues>(toFormValues(edition))
  const [error, setError] = useState<string | null>(null)

  function updateField<Key extends keyof FormValues>(
    key: Key,
    value: FormValues[Key],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }

  function updateDestination(type: DestinationType, value: string) {
    updateField('destinations', { ...values.destinations, [type]: value })
  }

  const percentages = Object.values(values.destinations)
  const hasDestinations = percentages.some((value) => value !== '')
  const totalPercentage = percentages.reduce(
    (sum, value) => sum + Number(value),
    0,
  )

  function handleSubmit() {
    const year = Number(values.year)

    if (usedYears.includes(year)) {
      setError(`Já existe uma edição de ${year}.`)
      return
    }

    if (hasDestinations && totalPercentage !== 100) {
      setError(
        `As porcentagens precisam somar 100%. Agora somam ${totalPercentage}%.`,
      )
      return
    }

    onSave({
      year,
      totalCollected: Number(values.totalCollected),
      totalCollectionPoints: Number(values.totalCollectionPoints),
      totalBeneficiaryEntities: Number(values.totalBeneficiaryEntities),
      volunteers: Number(values.volunteers),
      isOngoing: values.isOngoing,
      destinations: hasDestinations
        ? DESTINATION_TYPES.map((type) => ({
            type,
            percentage: Number(values.destinations[type]),
          }))
        : undefined,
    })
  }

  return (
    <AdminDrawer
      title={edition ? `Editar edição ${edition.year}` : 'Adicionar edição'}
      isSaving={isSaving}
      error={error}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <TextField
        label="Ano"
        type="number"
        value={values.year}
        onChange={(value) => updateField('year', value)}
        min={MIN_YEAR}
        max={MAX_YEAR}
        required
      />
      <TextField
        label="Peças arrecadadas"
        type="number"
        value={values.totalCollected}
        onChange={(value) => updateField('totalCollected', value)}
      />

      <div className="grid items-end gap-5 sm:grid-cols-3">
        <TextField
          label="Pontos de coleta"
          type="number"
          value={values.totalCollectionPoints}
          onChange={(value) => updateField('totalCollectionPoints', value)}
        />
        <TextField
          label="Entidades atendidas"
          type="number"
          value={values.totalBeneficiaryEntities}
          onChange={(value) => updateField('totalBeneficiaryEntities', value)}
        />
        <TextField
          label="Voluntários"
          type="number"
          value={values.volunteers}
          onChange={(value) => updateField('volunteers', value)}
        />
      </div>

      <CheckboxField
        label="Edição em andamento"
        checked={values.isOngoing}
        onChange={(checked) => updateField('isOngoing', checked)}
        help="No site, os números aparecem como parciais. Só uma edição pode estar em andamento."
      />

      <fieldset className="flex flex-col gap-3 rounded-2xl border border-gray-2 p-4">
        <legend className="px-1 text-strong">
          Para onde foram as peças (%)
        </legend>
        <p className="text-small text-blue-4">
          Deixe tudo vazio se os números ainda não foram fechados.
        </p>

        {DESTINATION_TYPES.map((type) => (
          <TextField
            key={type}
            label={DESTINATION_LABELS[type]}
            type="number"
            value={values.destinations[type]}
            onChange={(value) => updateDestination(type, value)}
          />
        ))}

        {hasDestinations && (
          <p
            className={`text-strong ${totalPercentage === 100 ? 'text-blue-1' : 'text-pink-1'}`}
          >
            Total: {totalPercentage}%
          </p>
        )}
      </fieldset>
    </AdminDrawer>
  )
}

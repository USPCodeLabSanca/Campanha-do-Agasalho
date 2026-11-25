import { useState } from 'react'
import floqCar from '../../../assets/images/floq_car_entity.svg'
import floqInfra from '../../../assets/images/floq_jumping_infra.svg'
import floqMoney from '../../../assets/images/floq_money_orange.svg'
import floqSmartphone from '../../../assets/images/floq_smartphone_pink.svg'
import floqSuit from '../../../assets/images/floq_suit.svg'
import type {
  MascotKey,
  Nucleus,
  NucleusInput,
} from '../../../types/participate'
import { AdminFormModal, FormField, inputClasses } from './AdminFormModal'

export const mascots: Record<MascotKey, { label: string; src: string }> = {
  suit: { label: 'Pinguim de terno', src: floqSuit },
  smartphone: { label: 'Pinguim com celular', src: floqSmartphone },
  car: { label: 'Pinguim no carro', src: floqCar },
  money: { label: 'Pinguim com moedas', src: floqMoney },
  infra: { label: 'Pinguim pulando', src: floqInfra },
}

export const mascotKeys = Object.keys(mascots) as MascotKey[]

type NucleusFormProps = {
  nucleus: Nucleus
  isSaving: boolean
  onSave: (input: NucleusInput) => void
  onClose: () => void
}

export function NucleusForm({
  nucleus,
  isSaving,
  onSave,
  onClose,
}: NucleusFormProps) {
  const [namePt, setNamePt] = useState(nucleus.name.pt)
  const [nameEn, setNameEn] = useState(nucleus.name.en)
  const [descriptionPt, setDescriptionPt] = useState(nucleus.description.pt)
  const [descriptionEn, setDescriptionEn] = useState(nucleus.description.en)
  const [mascot, setMascot] = useState<MascotKey>(nucleus.mascot)
  const [isActive, setIsActive] = useState(nucleus.isActive)
  const [showErrors, setShowErrors] = useState(false)

  const nameError = !namePt.trim() ? 'Informe o nome em português.' : undefined
  const descriptionError = !descriptionPt.trim()
    ? 'Informe a descrição em português.'
    : undefined

  function handleSubmit() {
    if (nameError || descriptionError) {
      setShowErrors(true)
      return
    }

    onSave({
      name: { pt: namePt.trim(), en: nameEn.trim() },
      description: { pt: descriptionPt.trim(), en: descriptionEn.trim() },
      mascot,
      isActive,
    })
  }

  return (
    <AdminFormModal
      title={`Editar núcleo: ${nucleus.name.pt}`}
      isSaving={isSaving}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <FormField
        label="Nome (português)"
        error={showErrors ? nameError : undefined}
      >
        <input
          className={inputClasses}
          value={namePt}
          onChange={(e) => setNamePt(e.target.value)}
        />
      </FormField>

      <FormField
        label="Nome (inglês)"
        hint="Se ficar vazio, o site mostra o nome em português."
      >
        <input
          className={inputClasses}
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
        />
      </FormField>

      <FormField
        label="Descrição (português)"
        error={showErrors ? descriptionError : undefined}
      >
        <textarea
          rows={3}
          className={inputClasses}
          value={descriptionPt}
          onChange={(e) => setDescriptionPt(e.target.value)}
        />
      </FormField>

      <FormField
        label="Descrição (inglês)"
        hint="Se ficar vazio, o site mostra a descrição em português."
      >
        <textarea
          rows={3}
          className={inputClasses}
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
        />
      </FormField>

      <div className="flex items-center gap-4">
        <img
          src={mascots[mascot].src}
          alt=""
          className="h-20 w-20 shrink-0 object-contain"
        />
        <div className="flex-1">
          <FormField label="Mascote do núcleo">
            <select
              className={inputClasses}
              value={mascot}
              onChange={(e) => setMascot(e.target.value as MascotKey)}
            >
              {mascotKeys.map((key) => (
                <option key={key} value={key}>
                  {mascots[key].label}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-semibold text-blue-1">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="size-4 accent-blue-1"
        />
        Mostrar este núcleo no site
      </label>
    </AdminFormModal>
  )
}
import { CustomInputField } from '@/components/common/UI'
import { useHealthHistory } from '@/context'
import { formatDate } from '@zl-asica/react'
import EditableList from './EditableList'

const InputMedications = () => {
  const { medications, addMedication, updateMedication, removeMedication } = useHealthHistory()

  const handleTimeChanges = (id: number, time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    const formattedTime = new Date().setHours(hours, minutes, 0, 0)
    updateMedication(id, 'time', new Date(formattedTime).toISOString())
  }

  return (
    <EditableList
      title="Medications"
      description="Please list any medications you are currently taking."
      items={medications}
      addItem={addMedication}
      removeItem={removeMedication}
    >
      {med => (
        <>
          <CustomInputField
            label="Name"
            value={med.name}
            onChange={value => updateMedication(med.id, 'name', value)}
          />
          <CustomInputField
            label="Dosage"
            value={med.dosage}
            onChange={value => updateMedication(med.id, 'dosage', value)}
          />
          <CustomInputField
            type="time"
            label="Time (HH:MM)"
            value={formatDate(med.time !== undefined ? new Date(med.time) : new Date(), 'HH:mm')}
            onChange={value => handleTimeChanges(med.id, value)}
            inputLabel={{ shrink: true }}
          />
        </>
      )}
    </EditableList>
  )
}

export default InputMedications

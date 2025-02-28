import { CustomInputField } from '@/components/common/UI'
import { useHealthHistory } from '@/context'
import EditableList from './EditableList'

const InputMedications = () => {
  const { medications, addMedication, updateMedication, removeMedication } = useHealthHistory()

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
            type="number"
            label="Frequency (every x days)"
            value={med.frequency}
            onChange={value => updateMedication(med.id, 'frequency', value)}
          />
          <CustomInputField
            type="time"
            label="Time (HH:MM)"
            value={med.time}
            onChange={value => updateMedication(med.id, 'time', value)}
            inputLabel={{ shrink: true }}
          />
        </>
      )}
    </EditableList>
  )
}

export default InputMedications

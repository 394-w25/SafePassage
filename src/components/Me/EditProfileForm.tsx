import { AddFamilyContacts, InputHealthHistory, InputMedications } from '@/components/Onboarding'
import { HealthHistoryProvider, useHealthHistory } from '@/context'
import { Box, Button } from '@mui/material'

interface ProfileFormProps {
  onSave: () => void
  onCancel: () => void
}

const ProfileFormContent = ({ onSave, onCancel }: ProfileFormProps) => {
  const { submitProfile } = useHealthHistory()
  return (
    <Box mx="auto">
      <InputHealthHistory />
      <InputMedications />
      <AddFamilyContacts />

      <Box display="flex" justifyContent="center" gap={2} mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            submitProfile()
            onSave()
          }}
        >
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  )
}

const ProfileForm = ({ onSave, onCancel }: ProfileFormProps) => {
  return (
    <HealthHistoryProvider>
      <ProfileFormContent onSave={onSave} onCancel={onCancel} />
    </HealthHistoryProvider>
  )
}

export default ProfileForm

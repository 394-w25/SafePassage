import { SmallLoadingCircle } from '@/components/common'
import { useHealthHistory } from '@/context'
import { Box, Button } from '@mui/material'

interface ActionButtonsProps {
  editing: boolean
  onSave: () => void
  loading: boolean
  onCancel: () => void
  onEdit: () => void
}

const ActionButtons = ({
  editing,
  onSave,
  loading,
  onCancel,
  onEdit,
}: ActionButtonsProps) => {
  const { submitProfile } = useHealthHistory()
  return (
    <Box display="flex" justifyContent="center" gap={2} mt={4}>
      {editing
        ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  submitProfile()
                  onSave()
                }}
                disabled={loading}
              >
                {loading ? <SmallLoadingCircle text="Saving..." /> : 'Save'}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            </>
          )
        : (
            <Button variant="outlined" onClick={onEdit}>
              Edit Profile
            </Button>
          )}
    </Box>
  )
}

export default ActionButtons

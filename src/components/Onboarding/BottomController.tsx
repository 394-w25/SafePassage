import { useHealthHistory } from '@/context'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const steps = ['Input Health History', 'Add Your Family']

interface BottomControllerProps {
  activeStep: number
  setActiveStep: (step: number) => void
}

const BottomController = ({ activeStep, setActiveStep }: BottomControllerProps) => {
  const navigate = useNavigate()
  const { submitProfile } = useHealthHistory()

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
      <Button variant="contained" disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)}>
        Back
      </Button>
      {activeStep < steps.length - 1 && (
        <Button variant="contained" disabled={activeStep === 1} onClick={() => setActiveStep(activeStep + 1)}>
          Next
        </Button>
      )}
      {activeStep === steps.length - 1 && (
        <Button variant="contained" color="secondary" onClick={() => submitProfile(navigate)}>
          Submit
        </Button>
      )}
    </Box>
  )
}

export default BottomController

import { useHealthHistory } from '@/context'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface BottomControllerProps {
  stepsCount: number
  activeStep: number
  setActiveStep: (step: number) => void
}

const BottomController = ({ stepsCount, activeStep, setActiveStep }: BottomControllerProps) => {
  const navigate = useNavigate()
  const { submitProfile } = useHealthHistory()

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
      <Button variant="contained" size="small" disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)}>
        Back
      </Button>
      {activeStep < stepsCount - 1 && (
        <Button variant="contained" size="small" disabled={activeStep === stepsCount} onClick={() => setActiveStep(activeStep + 1)}>
          Next
        </Button>
      )}
      {activeStep === stepsCount - 1 && (
        <Button variant="contained" size="small" color="secondary" onClick={() => submitProfile(navigate)}>
          Submit
        </Button>
      )}
    </Box>
  )
}

export default BottomController

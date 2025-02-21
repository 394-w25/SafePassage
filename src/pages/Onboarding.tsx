import { AddFamilyContacts, BottomController, InputHealthHistory } from '@/components/Onboarding'
import { HealthHistoryProvider } from '@/context'
import {
  Box,
  Container,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material'
import { useState } from 'react'

const steps = ['Input Health History', 'Add Your Family']

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <HealthHistoryProvider>
      <Container maxWidth="sm" sx={{ py: 4, px: 1, backgroundColor: '#FBF9FE' }}>
        <Box>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && <InputHealthHistory />}
          {activeStep === 1 && <AddFamilyContacts />}

          <BottomController activeStep={activeStep} setActiveStep={setActiveStep} />
        </Box>
      </Container>
    </HealthHistoryProvider>
  )
}

export default Onboarding

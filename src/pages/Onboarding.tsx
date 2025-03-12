import { AddFamilyContacts, BottomController, InputHealthHistory, InputMedications } from '@/components/Onboarding'
import { HealthHistoryProvider } from '@/context'
import { useLanguageStore } from '@/stores'
import { translations } from '@/utils/translations'

import {
  Box,
  Container,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material'
import { useState } from 'react'

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState(0)
  const language = useLanguageStore(state => state.language)

  const steps = [translations[language].HealthHistory, translations[language].Medications, translations[language].EmergencyContacts]
  return (
    <HealthHistoryProvider>
      <Container maxWidth="sm" sx={{ py: 4, px: 1 }}>
        <Box>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && <InputHealthHistory />}
          {activeStep === 1 && <InputMedications />}
          {activeStep === 2 && <AddFamilyContacts />}

          <BottomController stepsCount={steps.length} activeStep={activeStep} setActiveStep={setActiveStep} />
        </Box>
      </Container>
    </HealthHistoryProvider>
  )
}

export default Onboarding

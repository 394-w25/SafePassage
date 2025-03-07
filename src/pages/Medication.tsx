import Medication from '@/components/Medication'
import Trip from '@/components/Trip'
import { DateSliderProvider } from '@/context'
import Box from '@mui/material/Box'

const MedicationPage = () => {
  return (
    <Box p={2}>
      <DateSliderProvider>
        <Medication />
      </DateSliderProvider>

      <Trip />
    </Box>
  )
}

export default MedicationPage

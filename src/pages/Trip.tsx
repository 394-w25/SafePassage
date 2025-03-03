import { LanguageToggle } from '@/components/Home'
import { TravelMedication } from '@/components/Trip'
import { useUserStore } from '@/stores'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Box, IconButton } from '@mui/material'
import { useState } from 'react'

const Trip = () => {
  const [showFlag, setShowFlag] = useState<boolean>(true)
  const userData = useUserStore(state => state.user)

  if (!userData) {
    return null
  }

  const travelData: TravelInfo = (userData?.travelData as TravelInfo) ?? { startDate: '', endDate: '' }

  const showAdd = () => {
    if (Object.values(travelData).every((v: string) => v === '') && showFlag) {
      return true
    }
    return false
  }

  return (
    <Box sx={{ px: 2, py: 3 }}>
      {showAdd()
        ? (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <IconButton color="primary" onClick={() => setShowFlag(false)}>
                <AddCircleOutlineIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>
          )
        : <TravelMedication travel={travelData} />}
      <LanguageToggle />
    </Box>
  )
}

export default Trip

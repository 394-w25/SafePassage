import { DateSlider } from '@/components/Medication'
import Trip from '@/components/Trip'
import { useDateSlider } from '@/hooks'
import { useUserStore } from '@/stores'
import { Box, Card, CardContent, Stack, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'

const Medication = () => {
  const theme = useTheme()
  const userData = useUserStore(state => state.user)
  const { selectedDate } = useDateSlider()

  const dailyMedications = useMemo(() => {
    if (!userData?.healthData?.medications) {
      return []
    }
    return [...userData.healthData.medications].sort((a, b) =>
      a.time !== undefined && b.time !== undefined ? a.time.localeCompare(b.time) : 0,
    )
  }, [userData?.healthData?.medications])

  if (!userData) {
    return null
  }

  return (
    <>
      <Box mb={3} p={2}>
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          Medication Schedule
        </Typography>

        <DateSlider />

        <Stack spacing={1} mt={2}>
          {dailyMedications.length === 0
            ? (
                <Typography variant="body2" textAlign="center" color="textSecondary">
                  No medications scheduled for today.
                </Typography>
              )
            : (
                dailyMedications.map(med => (
                  <Card key={med.id} sx={{ backgroundColor: theme.palette.grey[100] }}>
                    <CardContent>
                      <Typography variant="body1" fontWeight="bold">
                        {selectedDate.format('ddd, MMM D')}
                      </Typography>
                      <Typography variant="body2">{med.name}</Typography>
                    </CardContent>
                  </Card>
                ))
              )}
        </Stack>
      </Box>
      <Trip />
    </>
  )
}

export default Medication

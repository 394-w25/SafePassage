import { useDateSlider } from '@/context'
import { useUserStore } from '@/stores'
import { getMedicationSchedule } from '@/utils/medicationUtils'
import { Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useMemo } from 'react'
import DateSlider from './DateSlider'
import MedicationCard from './MedicationCard'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isBetween)

const Medication = () => {
  const userData = useUserStore(state => state.user)
  const { selectedDate } = useDateSlider()

  const dailyMedications = useMemo(() => {
    if (!userData?.healthData?.medications || !userData?.timeInfo) {
      return []
    }

    const { homeTimezone } = userData.timeInfo

    return userData.healthData.medications
      .map(med =>
        getMedicationSchedule(med, userData.trips || [], homeTimezone, selectedDate),
      )
      .sort((a, b) => {
        if (a.time === undefined) {
          return 1
        }
        if (b.time === undefined) {
          return -1
        }
        return a.time.localeCompare(b.time)
      })
  }, [userData?.healthData?.medications, userData?.trips, userData?.timeInfo, selectedDate])

  return (
    <>
      <Typography variant="h6" fontWeight="bold" textAlign="center">
        Medication Schedule
      </Typography>

      <DateSlider />

      <Stack spacing={1} mt={2} mb={3}>
        {dailyMedications.length === 0
          ? (
              <Typography variant="body2" textAlign="center" color="textSecondary">
                No medications scheduled for today.
              </Typography>
            )
          : (
              dailyMedications.map(med => (
                <MedicationCard key={med.id} medication={med} />
              ))
            )}
      </Stack>
    </>
  )
}

export default Medication

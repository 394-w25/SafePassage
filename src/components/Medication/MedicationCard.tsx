import { styles } from '@/utils/tripUtils'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { useMemo, useState } from 'react'

interface MedicationCardProps {
  medication: MedicationSchedule
}

const MedicationCard = ({ medication }: MedicationCardProps) => {
  const [timeString, setTimeString] = useState<string | undefined>('N/A')

  const cardStyles = useMemo(() => {
    if (medication.duringTrip) {
      setTimeString(`${medication.time} (During Trip)`)
      return styles.ongoing // Color for ongoing trip medication
    }
    else if (medication.adjusted) {
      setTimeString(`${medication.time} (Adjusted)`)
      return styles.future // Color for adjusted medication
    }
    setTimeString(medication.time)
    return styles.past // Color for at-home medication
  }, [medication.duringTrip, medication.adjusted, medication.time])

  return (
    <Card sx={{ ...cardStyles, transition: '0.3s', p: 1, borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" fontWeight="bold">
            {timeString ?? 'N/A'}
          </Typography>
          <Typography variant="body2">
            {medication.name}
          </Typography>
        </Box>

        {medication.dosage !== undefined && (
          <Typography variant="caption" color="textSecondary">
            {medication.dosage}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default MedicationCard

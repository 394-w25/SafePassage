import { styles } from '@/utils/tripUtils'
import { ContentCopy, Edit } from '@mui/icons-material'
import {
  Card,
  CardContent,
  Fade,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { formatDate } from '@zl-asica/react'

interface TripCardProps {
  trip: Trip
  loading: boolean
  onEdit: () => void
  onDuplicate: () => void
}

const TripCard = ({ trip, loading, onEdit, onDuplicate }: TripCardProps) => {
  const now = formatDate(new Date())

  const tripType: 'ongoing' | 'future' | 'past'
    = formatDate(new Date(trip.startDate)) <= now && formatDate(new Date(trip.endDate)) >= now
      ? 'ongoing'
      : trip.startDate > now
        ? 'future'
        : 'past'

  return (
    <Fade in timeout={300}>
      <Card sx={{ ...styles[tripType], p: 1, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {trip.city !== undefined && trip.city.trim() !== '' ? `${trip.city}, ` : ''}
            {trip.country}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {formatDate(new Date(trip.startDate), 'MM-DD-YYYY')}
            {' '}
            →
            {formatDate(new Date(trip.endDate), 'MM-DD-YYYY')}
          </Typography>
          <Stack direction="row" justifyContent="flex-end" spacing={1} mt={1}>
            <IconButton
              size="small"
              aria-label="Duplicate Trip"
              disabled={loading}
              onClick={onDuplicate}
            >
              <ContentCopy />
            </IconButton>
            <IconButton
              size="small"
              aria-label="Edit Trip"
              disabled={loading}
              onClick={onEdit}
            >
              <Edit />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>
    </Fade>
  )
}

export default TripCard

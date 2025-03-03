import { HealthHistoryProvider } from '@/context'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Card, CardContent, IconButton, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import UpdateTravelDialog from './UpdateTravelDialog'

interface TravelInfo {
  startDate?: string
  endDate?: string
  country?: string
  countryName?: string
  city?: string
}

interface Props {
  travel: TravelInfo
}

const TravelMedication = ({ travel }: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Box>
      <Card elevation={2} sx={{ borderRadius: 2, mt: 3 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: 'primary.main' }}>
              Travel Information
            </Typography>
            <IconButton size="small" sx={{ ml: 1 }} onClick={() => setOpen(true)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">
                Country
              </Typography>
              <Typography variant="body1">
                {travel.countryName! || ''}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">
                City
              </Typography>
              <Typography variant="body1">
                {travel.city! || ''}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">
                Start Date
              </Typography>
              <Typography variant="body1">
                {travel.startDate! || ''}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">
                End Date
              </Typography>
              <Typography variant="body1">
                {travel.endDate! || ''}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <HealthHistoryProvider>
        <UpdateTravelDialog open={open} onCancel={() => setOpen(false)} onSuccess={() => setOpen(false)} />
      </HealthHistoryProvider>
    </Box>
  )
}

export default TravelMedication

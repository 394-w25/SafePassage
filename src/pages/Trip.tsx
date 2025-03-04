import { ConfirmationDialog } from '@/components/common'
import { TripCard, TripDialog } from '@/components/Trip'
import { useTrips } from '@/hooks'
import { Box, Button, Fade, Stack, Typography } from '@mui/material'
import { useToggle } from '@zl-asica/react'
import { useCallback, useMemo, useState } from 'react'

const useSortedTrips = (trips: Trip[]) => {
  const now = new Date().toISOString().split('T')[0]

  return useMemo(() => {
    return [...trips].sort((a, _) => {
      // Ongoing first
      if (a.startDate <= now && a.endDate >= now) {
        return -1
      }
      // Future next
      if (a.startDate > now) {
        return 0
      }
      return 1 // Past last
    })
  }, [trips, now])
}

const TripPage = () => {
  const { trips, loading, addTrips, updateTrips, removeTrips, duplicateTrips } = useTrips()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentTrip, setCurrentTrip] = useState<Trip | undefined>()
  const [duplicateTripId, setDuplicateTripId] = useState<number | undefined>()
  const [duplicateConfirmationDialog, toggleDuplicateConfirmationDialog] = useToggle()

  const sortedTrips = useSortedTrips(trips)

  const handleOpenDialog = useCallback((trip?: Trip) => {
    setCurrentTrip(trip)
    setDialogOpen(true)
  }, [])

  const handleDuplicateButton = useCallback((tripId: number) => {
    setDuplicateTripId(tripId)
    toggleDuplicateConfirmationDialog()
  }, [toggleDuplicateConfirmationDialog])

  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
        Trip Records
      </Typography>

      {/* No Trip Records */}
      {!loading && trips.length === 0 && (
        <Typography variant="body1" color="textSecondary" textAlign="center" mb={2}>
          You have no trip records.
          <br />
          Add one to track your medication schedules more effectively!
        </Typography>
      )}

      {/* Trip List */}
      <Stack spacing={2}>
        {sortedTrips.map(trip => (
          <TripCard
            key={trip.id}
            trip={trip}
            loading={loading}
            onEdit={() => handleOpenDialog(trip)}
            onDuplicate={() => handleDuplicateButton(trip.id)}
          />
        ))}
      </Stack>

      {/* Add Trip Button */}
      <Fade in timeout={300}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{ mt: 3, mx: 'auto', display: 'block' }}
          onClick={() => handleOpenDialog()}
        >
          + New Trip
        </Button>
      </Fade>

      {/* Trip Dialog (Add / Edit) */}
      <TripDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        trip={currentTrip}
        onSave={currentTrip ? async (trip: Trip) => updateTrips(trip.id, trip) : addTrips}
        onDelete={
          currentTrip
            ? async (tripId: number) => {
              await removeTrips(tripId)
              setDialogOpen(false)
            }
            : undefined
        }
      />

      {/* Duplicate Confirmation Dialog */}
      <ConfirmationDialog
        open={duplicateConfirmationDialog}
        onClose={() => {
          setDuplicateTripId(undefined)
          toggleDuplicateConfirmationDialog()
        }}
        onConfirm={async () => {
          if (duplicateTripId === undefined) {
            return
          }
          await duplicateTrips(duplicateTripId)
          setDuplicateTripId(undefined)
          toggleDuplicateConfirmationDialog()
        }}
        title="Duplicate Trip"
        description="Are you sure you want to duplicate this trip?"
      />
    </Box>
  )
}

export default TripPage

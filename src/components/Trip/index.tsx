import { ConfirmationDialog } from '@/components/common'
import { useTrips } from '@/hooks'
import { Button, Fade, Stack, Typography } from '@mui/material'
import { useToggle } from '@zl-asica/react'
import { useCallback, useMemo, useState } from 'react'
import TripCard from './TripCard'
import TripDialog from './TripDialog'

/**
  Sort by ongoing, future, and past trips
 */
const useSortedTrips = (trips: Trip[]) => {
  const now = new Date().toISOString().split('T')[0]

  return useMemo(() => {
    return [...trips].sort((a, b) => {
      const isOngoing = (trip: Trip) => trip.startDate <= now && trip.endDate >= now
      const isFuture = (trip: Trip) => trip.startDate > now

      if (isOngoing(a) && !isOngoing(b)) {
        return -1
      }
      if (!isOngoing(a) && isOngoing(b)) {
        return 1
      }

      if (isFuture(a) && !isFuture(b)) {
        return -1
      }
      if (!isFuture(a) && isFuture(b)) {
        return 1
      }

      return a.startDate.localeCompare(b.startDate)
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
    <>
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

      {/* Trip List */}
      <Stack spacing={2} mt={5} mb={2}>
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
    </>
  )
}

export default TripPage

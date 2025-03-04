import { useUserStore } from '@/stores'
import { produce } from 'immer'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

export const useTrips = () => {
  const userData = useUserStore(state => state.user)
  const updateProfile = useUserStore(state => state.updateProfile)

  const initialTrips = useMemo(() => userData?.trips || [], [userData?.trips])
  const [trips, setTrips] = useState<Trip[]>(initialTrips)
  const [loading, setLoading] = useState(false)

  const updateStore = async (newTrips: Trip[], description: string) => {
    setTrips(newTrips)
    setLoading(true)
    try {
      await updateProfile({ trips: newTrips }) // Persist to user profile
    }
    catch (error) {
      console.error('Error updating user profile:', error)
      toast.error('Failed to update trip records')
    }
    finally {
      setLoading(false)
      toast.success(description)
    }
  }

  // Add a new trip
  const addTrips = async (newData: Trip) => {
    const updatedTrips = produce(trips, (draft) => {
      draft.push({
        ...newData,
        id: newData.id || Date.now(),
        startDate: newData.startDate,
        endDate: newData.endDate,
      })
    })
    await updateStore(updatedTrips, 'New trip record added')
  }

  // Update an existing trip
  const updateTrips = async (id: number, data: Partial<Trip>) => {
    const updatedTrips = produce(trips, (draft) => {
      const item = draft.find(t => t.id === id)
      if (item) {
        Object.assign(item, {
          ...data,
        })
      }
    })
    await updateStore(updatedTrips, 'Trip record updated')
  }

  // Remove a trip
  const removeTrips = async (id: number) => {
    const updatedTrips = produce(trips, (draft) => {
      const index = draft.findIndex(t => t.id === id)
      if (index !== -1) {
        draft.splice(index, 1)
      }
    })
    await updateStore(updatedTrips, 'Trip record removed')
  }

  // Duplicate a trip
  const duplicateTrips = async (id: number) => {
    const updatedTrips = produce(trips, (draft) => {
      const item = draft.find(t => t.id === id)
      if (item) {
        draft.push({ ...item, id: Date.now() })
      }
    })
    await updateStore(updatedTrips, 'Trip record duplicated')
  }

  return {
    trips,
    loading,
    addTrips,
    updateTrips,
    removeTrips,
    duplicateTrips,
  }
}

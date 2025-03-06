import { ConfirmationDialog } from '@/components/common'
import { CustomInputField, CustomSelectField } from '@/components/common/UI'
import { allCountries, getCountryCities } from '@/utils/tripUtils'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

import { useToggle } from '@zl-asica/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface TripDialogProps {
  open: boolean
  onClose: () => void
  trip?: Trip | null
  onSave: (trip: Trip) => void
  onDelete?: (id: number) => Promise<void>
}

const TripDialog = ({ open, onClose, trip, onSave, onDelete }: TripDialogProps) => {
  const [deleteConfirmationDialog, toggleDeleteConfirmationDialog] = useToggle()
  const [formData, setFormData] = useState<Trip>({
    id: Date.now(),
    country: '',
    city: '',
    startDate: '',
    endDate: '',
  })

  const [citiesOptions, setCitiesOptions] = useState<string[]>([])

  useEffect(() => {
    if (trip) {
      setFormData(trip)
    }
    else {
      setFormData({ id: Date.now(), country: '', city: '', startDate: '', endDate: '' })
    }
  }, [trip])

  useEffect(() => {
    if (!formData.country) {
      setCitiesOptions([])
      return
    }
    setCitiesOptions(getCountryCities(formData.country))
  }, [formData.country])

  const handleChange = (key: keyof Trip, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    if (!formData.country || !formData.startDate || !formData.endDate) {
      toast.error('Please fill in all fields.')
      return
    }
    onSave(formData)
    onClose()
  }

  const handleClose = () => {
    setFormData({ id: Date.now(), country: '', city: '', startDate: '', endDate: '' })
    onClose()
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{trip ? 'Edit Trip' : 'New Trip'}</DialogTitle>
        <DialogContent>
          <CustomSelectField
            label="Country"
            value={formData.country}
            onChange={value => handleChange('country', value)}
            options={allCountries}
            required
          />
          <CustomSelectField
            label="City"
            value={formData.city}
            onChange={value => handleChange('city', value)}
            options={citiesOptions}
            disabled={!formData.country}
          />
          <CustomInputField
            label="Start Date"
            type="date"
            inputLabel={{ shrink: true }}
            value={formData.startDate}
            onChange={value => handleChange('startDate', value)}
            required
          />
          <CustomInputField
            label="End Date"
            type="date"
            inputLabel={{ shrink: true }}
            value={formData.endDate}
            onChange={value => handleChange('endDate', value)}
            required
          />
        </DialogContent>
        <DialogActions>
          {trip && onDelete && (
            <Button color="secondary" onClick={toggleDeleteConfirmationDialog}>
              Delete
            </Button>
          )}
          <Button onClick={onClose}>Cancel</Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationDialog
        open={deleteConfirmationDialog}
        onClose={toggleDeleteConfirmationDialog}
        onConfirm={async () => {
          await onDelete?.(formData.id)
          toggleDeleteConfirmationDialog()
          onClose()
        }}
        title="Delete Trip"
        description="Are you sure you want to delete this trip?"
      />
    </>
  )
}

export default TripDialog

import { formatTitleCase } from '@/utils/onboardingUtils' // 格式化标题工具
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { produce } from 'immer'
import { useState } from 'react'

interface Medication {
  id: string
  name: string
  dosage: string
  time: string
}

interface EditableSectionProps {
  title: keyof HealthInfos
  items: string[] | Medication[]
  onSave: (newData: string[] | Medication[]) => void
}

const EditableSection = ({ title, items, onSave }: EditableSectionProps) => {
  const [open, setOpen] = useState(false)

  const isMedication = title === 'medications'
  const [newItems, setNewItems] = useState(() =>
    isMedication ? [...(items as Medication[])] : [...(items as string[])],
  )

  const [errors, setErrors] = useState(() =>
    isMedication
      ? (items as Medication[]).map(() => ({ name: false, dosage: false, time: false }))
      : (items as string[]).map(() => false),
  )

  const handleSave = () => {
    if (isMedication) {
      // const validItems = (newItems as Medication[]).filter(
      //   med => !!med.name?.trim() && !!med.dosage?.trim() && !!med.time?.trim(),
      // )
      const validItems = (newItems as Medication[]).filter(
        med => med.name.trim().length > 0 && med.dosage.trim().length > 0 && med.time.trim().length > 0,
      )

      onSave(validItems)
    }
    else {
      const validItems = (newItems as string[]).map(item => item.trim()).filter(item => item.length > 0)
      onSave(validItems)
    }
    setOpen(false)
  }

  const handleChange = (index: number, field: keyof Medication | string, value: string) => {
    setNewItems(prev =>
      produce(prev, (draft) => {
        if (isMedication) {
          // const updatedMedication = { ...(draft[index] as Medication), [field]: value };
          // (draft as Medication[])[index] = updatedMedication
          (draft as Medication[])[index] = {
            ...((draft as Medication[])[index]),
            [field]: value,
          }
        }
        else {
          (draft as string[])[index] = value
        }
      }),
    )

    setErrors(prev =>
      produce(prev, (draft) => {
        if (isMedication) {
          const updatedError = { ...(draft[index] as { name: boolean, dosage: boolean, time: boolean }), [field]: value.trim() === '' };
          (draft as { name: boolean, dosage: boolean, time: boolean }[])[index] = updatedError
        }
        else {
          (draft as boolean[])[index] = value.trim() === ''
        }
      }),
    )
  }

  const handleAddItem = () => {
    setNewItems(prev =>
      produce(prev, (draft) => {
        if (isMedication) {
          (draft as Medication[]).push({ name: '', dosage: '', time: '' })
        }
        else {
          (draft as string[]).push('')
        }
      }),
    )

    setErrors(prev =>
      produce(prev, (draft) => {
        if (isMedication) {
          (draft as { name: boolean, dosage: boolean, time: boolean }[]).push({ name: false, dosage: false, time: false })
        }
        else {
          (draft as boolean[]).push(false)
        }
      }),
    )
  }

  const handleDeleteItem = (index: number) => {
    setNewItems(prev =>
      produce(prev, (draft) => {
        draft.splice(index, 1)
      }),
    )
  }

  return (
    <>
      <Paper
        sx={{
          p: 2,
          mt: 2,
          position: 'relative',
          borderLeft: `4px solid ${items.length > 0 ? '#1976d2' : 'transparent'}`,
          bgcolor: 'background.paper',
        }}
      >

        <Stack direction="row" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {formatTitleCase(title)}
              </Typography>
              <Box>
                <IconButton size="small" sx={{ ml: 1 }} onClick={() => setOpen(true)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
            </Stack>

            <Box sx={{ mt: 1 }}>
              {items.length > 0
                ? (
                    <List dense sx={{ py: 0, pl: 1 }}>
                      {items.map((item, index) => (

                        // <ListItem key={index} sx={{ pl: 0, py: 0, display: 'flex', alignItems: 'center', mb: 1 }}>
                        // <ListItem key={(item as Medication).name || index} sx={{ pl: 0, py: 0, display: 'flex', alignItems: 'center', mb: 1 }}>
                        // <ListItem key={`${(item as Medication).name}-${index}`} sx={{ pl: 0, py: 0, display: 'flex', alignItems: 'center', mb: 1 }}>
                        <ListItem key={(item as Medication).id || index}>

                          <Typography variant="body2" color="textPrimary" sx={{ mr: 1 }}>
                            •
                          </Typography>
                          {isMedication
                            ? (
                                <ListItemText
                                  primary={(

                                    <Typography variant="body2">
                                      <strong>Name:</strong>
                                      {' '}
                                      {(item as Medication).name}
                                      <br />
                                      <strong>Dosage:</strong>
                                      {' '}
                                      {(item as Medication).dosage}
                                      <br />
                                      <strong>Time:</strong>
                                      {' '}
                                      {(item as Medication).time}
                                    </Typography>
                                  )}
                                />
                              )
                            : (
                                <ListItemText primary={item as string} />
                              )}
                        </ListItem>
                      ))}
                    </List>
                  )
                : (
                    <Typography variant="body2" color="textSecondary">
                      No entries. Click edit to add.
                    </Typography>
                  )}
            </Box>

          </Box>
        </Stack>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>
          Edit
          {formatTitleCase(title)}
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
            Changes will be saved only if you press "Save". Empty entries will be removed.
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold">
              Current Entries:
            </Typography>
            <Box sx={{ bgcolor: '#f5f5f5', p: 1, borderRadius: 1 }}>
              {items.length > 0
                ? (
                    <List dense>
                      {items.map((item, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <ListItem key={index} sx={{ pl: 0, py: 0 }}>
                          <ListItemText primary={`${(item as Medication).name} - ${(item as Medication).dosage} at ${(item as Medication).time}`} />
                        </ListItem>
                      ))}
                    </List>
                  )
                : (
                    <Typography variant="body2" color="textSecondary">
                      No previous entries.
                    </Typography>
                  )}
            </Box>
          </Box>

          <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
            New Entries:
          </Typography>

          {newItems.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {isMedication
                ? (
                    <Stack spacing={1} sx={{ flex: 1, mb: 2 }}>
                      <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={(item as Medication).name}
                        size="small"
                        onChange={e => handleChange(index, 'name', e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Dosage"
                        variant="outlined"
                        value={(item as Medication).dosage}
                        size="small"
                        onChange={e => handleChange(index, 'dosage', e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Time"
                        variant="outlined"
                        value={(item as Medication).time}
                        size="small"
                        onChange={e => handleChange(index, 'time', e.target.value)}
                      />
                    </Stack>
                  )
                : (
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={item as string}
                      size="small"
                      onChange={e => handleChange(index, '', e.target.value)}
                    />
                  )}

              <IconButton onClick={() => handleDeleteItem(index)} sx={{ ml: 1 }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddItem}
            sx={{ mt: 1, color: '#1976d2' }}
          >
            Add Entry
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isMedication ? errors.some(e => Object.values(e).some(Boolean)) : errors.some(Boolean)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditableSection

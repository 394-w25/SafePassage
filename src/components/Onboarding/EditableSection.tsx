import { formatTitleCase } from '@/utils/onboardingUtils'
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

interface EditableSectionProps {
  title: keyof HealthInfos
  items: string[]
  onSave: (newData: string[]) => void
}

const EditableSection = ({ title, items, onSave }: EditableSectionProps) => {
  const [open, setOpen] = useState(false)
  const [newItems, setNewItems] = useState<string[]>(() => [...items])
  const [errors, setErrors] = useState<boolean[]>(Array.from<boolean>({ length: items.length }).fill(false))

  const handleSave = () => {
    const trimmedItems = newItems.map(item => item.trim()).filter(item => item !== '')
    const uniqueItems = Array.from(new Set(trimmedItems))

    onSave(uniqueItems)
    setOpen(false)
  }

  const handleChange = (index: number, value: string) => {
    setNewItems(prev =>
      produce(prev, (draft) => {
        draft[index] = value
      }),
    )

    setErrors((prev) => {
      const newErrors = [...prev]
      newErrors[index] = value.trim() === '' || newItems.filter(i => i === value).length > 1
      return newErrors
    })
  }

  const handleAddItem = () => {
    setNewItems(prev =>
      produce(prev, (draft) => {
        draft.push('')
      }),
    )
    setErrors(prev => [...prev, true])
  }

  const handleDeleteItem = (index: number) => {
    setNewItems(prev =>
      produce(prev, (draft) => {
        draft.splice(index, 1)
      }),
    )
    setErrors(prev =>
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
                        // eslint-disable-next-line react/no-array-index-key
                        <ListItem key={`${title}-${index}`} sx={{ pl: 0, py: 0, display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" color="textPrimary" sx={{ mr: 1 }}>
                            •
                          </Typography>
                          <ListItemText primary={item} />
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
          {' '}
          {formatTitleCase(title)}
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
            Changes will be saved only if you press "Save".
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
                        <ListItem key={`${title}-${index}`} sx={{ pl: 0, py: 0 }}>
                          <ListItemText primary={item} />
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
            <Box key={`${title}-${index}`} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={item}
                size="small"
                error={errors[index]}
                helperText={errors[index] ? 'Cannot be empty or duplicate' : ''}
                onChange={e => handleChange(index, e.target.value)}
              />
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
            disabled={errors.some(e => e)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditableSection

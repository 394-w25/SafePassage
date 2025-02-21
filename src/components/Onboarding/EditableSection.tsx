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
import EditabelIcon from './EditabelIcon'

interface EditableSectionProps {
  title: keyof HealthInfos
  items: string[]
  onSave: (newData: string[]) => void
}

const EditableSection = ({ title, items, onSave }: EditableSectionProps) => {
  const [open, setOpen] = useState(false)
  const [newItems, setNewItems] = useState<string[]>(() => [...items])

  const handleSave = () => {
    onSave(
      newItems
        .map(item => item.trim())
        .filter((item, index, arr) => item !== '' && arr.indexOf(item) === index),
    )
    setOpen(false)
  }

  const handleChange = (index: number, value: string) => {
    setNewItems(prev =>
      produce(prev, (draft) => {
        draft[index] = value
      }),
    )
  }

  const handleAddItem = () => {
    setNewItems(prev =>
      produce(prev, (draft) => {
        draft.push('')
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
      <Paper sx={{ p: 2, mt: 2, position: 'relative' }}>
        <Stack direction="row" spacing={2}>
          <EditabelIcon />
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
            <Box>
              {items.length > 0
                ? (
                    <List dense sx={{ py: 0 }}>
                      {items.map((item, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                        <ListItem key={index} sx={{ pl: 0, py: 0 }}>
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
          {newItems.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={item}
                size="small"
                onChange={e => handleChange(index, e.target.value)}
              />
              <IconButton onClick={() => handleDeleteItem(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddItem} sx={{ mt: 1 }}>
            Add Entry
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditableSection

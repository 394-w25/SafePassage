import type { ReactNode } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, IconButton, Paper, Typography } from '@mui/material'

interface EditableListProps<T> {
  title: string
  description?: string
  items: T[]
  addItem: () => void
  removeItem: (id: number) => void
  children: (item: T, index: number) => ReactNode
}

const EditableList = <T extends { id: number }>({
  title,
  description,
  items,
  addItem,
  removeItem,
  children,
}: EditableListProps<T>) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 'bold',
          py: 0,
          px: 1,
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>

      {description !== undefined && (
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            py: 0,
            px: 1,
            textAlign: 'center',
          }}
        >
          {description}
        </Typography>
      )}

      {items.map((item, index) => (
        <Paper key={item.id} sx={{ p: 2, mb: 2, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {title}
            {' '}
            {index + 1}
          </Typography>
          {children(item, index)}
          <IconButton color="error" onClick={() => removeItem(item.id)} sx={{ mt: 1 }}>
            <DeleteIcon />
          </IconButton>
        </Paper>
      ))}

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <IconButton color="primary" onClick={addItem}>
          <AddCircleOutlineIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default EditableList

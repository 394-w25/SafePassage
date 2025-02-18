import { useHealthHistory } from '@/context'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Box,
  IconButton,
  Paper,
  Typography,
} from '@mui/material'
import { CustomInputField } from '../common/UI'

const AddFamilyContacts = () => {
  const { contacts, addContact, updateContact, removeContact } = useHealthHistory()

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 'bold',
          backgroundColor: '#ccc',
          p: 1,
          textAlign: 'center',
        }}
      >
        Add Your Family
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontStyle: 'italic', textAlign: 'center', mb: 2 }}
      >
        Add members for SafePassage access and emergency notifications
      </Typography>

      {contacts.map((contact, index) => (
        <Paper key={contact.id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Contact
            {' '}
            {index + 1}
          </Typography>
          <CustomInputField
            label="Name"
            value={contact.name}
            onChange={value => updateContact(contact.id, 'name', value)}
          />
          <CustomInputField
            label="Relationship"
            value={contact.relationship}
            onChange={value => updateContact(contact.id, 'relationship', value)}
          />
          <CustomInputField
            label="Phone number"
            type="tel"
            value={contact.phone}
            onChange={value => updateContact(contact.id, 'phone', value)}
          />
          <IconButton
            color="error"
            onClick={() => removeContact(contact.id)}
            sx={{ mt: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Paper>
      ))}

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <IconButton color="primary" onClick={addContact}>
          <AddCircleOutlineIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default AddFamilyContacts

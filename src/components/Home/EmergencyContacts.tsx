import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'

interface EmergencyContactsProps {
  contacts: Contact[] | undefined
}

const EmergencyContacts = ({ contacts }: EmergencyContactsProps) => {
  return (
    <Card elevation={2} sx={{ borderRadius: 2, mt: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" sx={{ color: 'primary.main', mb: 1.2 }}>
          Emergency Contacts
        </Typography>

        {Array.isArray(contacts) && contacts.length > 0
          ? (
              <List dense sx={{ bgcolor: '#FAF9F6', borderRadius: 1, p: 1 }}>
                {contacts.map(contact => (
                  <React.Fragment key={contact.id}>
                    <ListItem disablePadding>
                      <ListItemText
                        primary={contact.name}
                        secondary={contact.relationship}
                      />
                      <ListItemText
                        primary={contact.phone}
                        sx={{ textAlign: 'right' }}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )
          : (
              <Typography variant="body2" color="text.secondary">
                No emergency contacts available.
              </Typography>
            )}
      </CardContent>
    </Card>
  )
}

export default EmergencyContacts

import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'

interface MedicationInfosProps {
  medications: Medication[] | undefined
}

const MedicationInfos = ({ medications }: MedicationInfosProps) => {
  return (
    <Card elevation={2} sx={{ borderRadius: 2, mt: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" sx={{ color: 'primary.main', mb: 1.2 }}>
          Medication Infos
        </Typography>

        {Array.isArray(medications) && medications.length > 0
          ? (
              <List dense sx={{ bgcolor: '#FAF9F6', borderRadius: 1, p: 1 }}>
                {medications.map((medication, index) => (
                  <React.Fragment key={medication.id}>
                    <ListItem disablePadding>
                      <ListItemText
                        primary={medication.name}
                        secondary={medication.dosage}
                      />
                      <ListItemText
                        primary={`Each ${medication.frequency} days`}
                        secondary={medication.time}
                        sx={{ textAlign: 'right' }}
                      />
                    </ListItem>
                    {index < medications.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )
          : (
              <Typography variant="body2" color="text.secondary">
                No medications available.
              </Typography>
            )}
      </CardContent>
    </Card>
  )
}

export default MedicationInfos

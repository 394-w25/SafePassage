import { calculateAge, formatTitleCase } from '@/utils/onboardingUtils'
import { Avatar, Box, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material'

interface MedicalProviderViewProps {
  name: string
  profilePic: string
  dateOfBirth: string | undefined
  healthInfos: HealthInfos | undefined
}

const MedicalProviderView = ({
  name,
  profilePic,
  dateOfBirth,
  healthInfos,
}: MedicalProviderViewProps) => {
  return (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" sx={{ color: 'primary.main', mb: 1.2 }}>
          Medical Provider View
        </Typography>

        {/* User Profile */}
        <Box
          display="flex"
          alignItems="center"
          sx={{
            mb: 2,
            backgroundColor: '#F5F5FA',
            px: 2,
            py: 1.5,
            borderRadius: 2,
          }}
        >
          <Avatar sx={{ mr: 2 }} src={profilePic}>
            {name?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body1">
              Name:
              {' '}
              {name || 'N/A'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Age:
              {' '}
              {calculateAge(dateOfBirth)}
            </Typography>
          </Box>
        </Box>

        {/* Health Infos */}
        {healthInfos && Object.entries(healthInfos).map(([key, items]) => (
          (items as string[])?.length > 0 && (
            <Box key={key} sx={{ mb: 2 }}>
              <Typography fontWeight="bold" sx={{ mb: 1, color: 'primary.main' }}>
                {formatTitleCase(key)}
              </Typography>
              <List dense sx={{ bgcolor: '#FAF9F6', borderRadius: 1, p: 1 }}>
                {(items as string[]).map(item => (
                  <ListItem key={item} sx={{ pl: 1 }}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )
        ))}
      </CardContent>
    </Card>

  )
}

export default MedicalProviderView

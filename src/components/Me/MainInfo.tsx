import { useLanguageStore } from '@/stores'
import { calculateAge } from '@/utils/onboardingUtils'
import { translations } from '@/utils/translations'
import { Avatar, Box, Card, CardContent, Divider, Grid2 as Grid, Typography } from '@mui/material'

interface MainInfoProps {
  displayName: string | undefined
  email: string | undefined
  timeInfo: TimeInfo | undefined
  profilePic: string | undefined
  healthData: HealthData | undefined
}

const MainInfo = ({ displayName, email, timeInfo, profilePic, healthData }: MainInfoProps) => {
  const age = calculateAge(healthData?.dateOfBirth)
  const language = useLanguageStore(state => state.language)
  const medicationCount = healthData?.medications?.length ?? 0
  const allergiesCount = healthData?.healthInfos?.allergies?.length ?? 0
  const pastSurgeriesCount = healthData?.healthInfos?.pastSurgeries?.length ?? 0
  const medicalConditionsCount = healthData?.healthInfos?.medicalConditions?.length ?? 0
  const medicalDevicesCount = healthData?.healthInfos?.medicalDevices?.length ?? 0
  const emergencyContactsCount = healthData?.contacts?.length ?? 0

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', textAlign: 'center', p: 3 }}>
      <Box display="flex" justifyContent="center" mb={3}>
        <Avatar
          src={profilePic ?? ''}
          alt={displayName}
          sx={{
            width: 120,
            height: 120,
            boxShadow: 3,
            border: '4px solid #fff',
          }}
        />
      </Box>

      {/* Basic Info */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
        {displayName ?? 'N/A'}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {email ?? 'N/A'}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {age}
        {' '}
        years old
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        {timeInfo?.homeCity ?? 'N/A'}
        {', '}
        {timeInfo?.homeCountry ?? 'N/A'}
      </Typography>

      {/* Health Summary */}
      <Card sx={{ mt: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Health Summary
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2} justifyContent="center">
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">
                {translations[language].healthInfos.allergies}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {allergiesCount}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Surgeries
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {pastSurgeriesCount}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Conditions
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {medicalConditionsCount}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Devices
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {medicalDevicesCount}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Medications
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {medicationCount}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Emergency Contacts
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {emergencyContactsCount}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default MainInfo

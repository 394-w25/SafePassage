import { LoadingCircle } from '@/components/common'
import { LanguageToggle, MedicalProviderView, MedicationInfos } from '@/components/Home'
import EmergencyContacts from '@/components/Home/EmergencyContacts'
import { useEmergencyAlert } from '@/hooks'
import { useLanguageStore } from '@/stores'
import { translations } from '@/utils/translations'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'

const UserMedicalRecord = () => {
  const language = useLanguageStore(state => state.language)
  const {
    userData,
    loading,
    showPopup,
    countdown,
    hasTriggeredRef,
    handleEmergency,
    handleSendNow,
    handleCancel,
  } = useEmergencyAlert()

  if (loading) {
    return <LoadingCircle textInfo="Loading User Data..." />
  }

  if (!userData) {
    return null
  }

  const { healthData, name, profilePic, timeInfo } = userData
  const { dateOfBirth, healthInfos, contacts, medications } = healthData || {}

  return (
    <Box sx={{ px: 2, py: 3 }}>

      <MedicalProviderView
        name={name}
        profilePic={profilePic}
        timeInfo={timeInfo}
        dateOfBirth={dateOfBirth}
        healthInfos={healthInfos}
      />

      <MedicationInfos medications={medications} />

      <EmergencyContacts contacts={contacts} />

      <LanguageToggle />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
        <Button
          variant="contained"
          size="large"
          disabled={hasTriggeredRef.current}
          onClick={handleEmergency}
          sx={{
            backgroundColor: 'red',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          🚨
          {' '}
          {translations[language].EMERGENCY_BUTTON}
          {' '}
          🚨
        </Button>
      </Box>

      {/* Countdown Dialog */}
      <Dialog open={showPopup} onClose={handleCancel}>
        <DialogTitle>{translations[language].emergencyAlert}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {translations[language].emergencyAlertContent}
          </Typography>
          <Typography variant="h5" fontWeight="bold" color="error" sx={{ textAlign: 'center' }}>
            {countdown}
            {' '}
            {translations[language].seconds}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">{translations[language].cancelButton}</Button>
          <Button onClick={handleSendNow} color="error" variant="contained">{translations[language].sendNowButton}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UserMedicalRecord

import { LanguageToggle, MedicalProviderView, QRCode } from '@/components/Home'
import { useUserStore } from '@/stores'
import { Box } from '@mui/material'

const Home = () => {
  const userData = useUserStore(state => state.user)

  if (!userData) {
    return null
  }

  const { uid, name, profilePic, healthData } = userData
  const { dateOfBirth, healthInfos } = healthData || {}

  return (
    <Box sx={{ px: 2, py: 3 }}>

      {/* QR Code Section */}
      <QRCode uid={uid} />

      <MedicalProviderView
        name={name}
        profilePic={profilePic}
        dateOfBirth={dateOfBirth}
        healthInfos={healthInfos}
      />

      <LanguageToggle />
    </Box>
  )
}

export default Home

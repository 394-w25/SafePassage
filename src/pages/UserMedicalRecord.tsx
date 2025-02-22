import { LoadingCircle } from '@/components/common'
import { LanguageToggle, MedicalProviderView } from '@/components/Home'
import { getUIDProfile } from '@/utils/firebase'
import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const UserMedicalRecord = () => {
  const { uid } = useParams<{ uid: string }>()
  const navigate = useNavigate()

  const [userData, setUserData] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUIDProfile(uid)
        if (!data) {
          void navigate('/404')
          return
        }
        setUserData(data)
      }
      catch (error) {
        console.error('Failed to fetch user data:', error)
        void navigate('/404')
      }
      finally {
        setLoading(false)
      }
    }

    void fetchUserData()
  }, [uid, navigate])

  if (loading) {
    return (
      <>
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 3 }}>
          Loading User Data...
        </Typography>
        <LoadingCircle />
      </>
    )
  }

  if (!userData) {
    return null
  }

  const { healthData, name, profilePic } = userData
  const { dateOfBirth, healthInfos } = healthData || {}

  const handleEmergency = () => {
    toast.error(`⚠️ EMERGENCY ALERT: ${name} needs immediate assistance!`, {
      duration: 8000,
    })
  }

  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ color: 'primary.main', mb: 2 }}>
        Medical Record for
        {' '}
        {name}
      </Typography>

      <MedicalProviderView
        name={name}
        profilePic={profilePic}
        dateOfBirth={dateOfBirth}
        healthInfos={healthInfos}
      />

      <LanguageToggle />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleEmergency}
          sx={{
            backgroundColor: 'red',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          🚨 EMERGENCY 🚨
        </Button>
      </Box>

    </Box>
  )
}

export default UserMedicalRecord

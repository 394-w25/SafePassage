import { useUserStore } from '@/stores'
import { calculateAge, formatTitleCase } from '@/utils/onboardingUtils'
import { translations } from '@/utils/translations'
import { Avatar, Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { toast } from 'sonner'

const Home = () => {
  const user = useUserStore(state => state.user)
  const [language, setLanguage] = useState('English')

  if (!user) {
    return
  }
  const { healthData, name } = user
  const { dateOfBirth, healthInfos } = healthData || {}

  const handleChangeLanguage = () => {
    setLanguage(prev => (prev === 'English' ? 'Mandarian' : 'English'))
    toast.success(translations.changeLanguageSuccess[language === 'English' ? 'CN' : 'EN'])
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold">
        Your QR Code
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Put this QR code in a visible place (like wrist band and back of phone)
      </Typography>

      {/* Placeholder QR Code */}
      <Box sx={{ width: 150, height: 150, backgroundColor: '#ccc', mx: 'auto', mb: 3 }} />

      <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
        Medical Provider View
      </Typography>
      <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
        <Avatar sx={{ mr: 2 }} src={user.profilePic}>
          {name?.charAt(0)}
        </Avatar>
        <Box>
          <Typography>
            Name:
            {' '}
            {name || 'N/A'}
          </Typography>
          <Typography>
            Age:
            {' '}
            {calculateAge(dateOfBirth)}
          </Typography>
        </Box>
      </Box>
      {healthInfos && (
        Object.entries(healthInfos).map(([key, items]) => (
          (items as string[])?.length > 0 && (
            <Box key={key} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
              <Typography fontWeight="bold" sx={{ mb: 1 }}>
                {formatTitleCase(key)}
              </Typography>
              <ul>
                {(items as string[]).map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Box>
          )
        ))
      )}

      <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }} alignItems="center">
        <Typography sx={{ mr: 1 }}>{language}</Typography>
        <Button variant="contained" onClick={handleChangeLanguage}>{translations.changeLanguage[language === 'English' ? 'EN' : 'CN']}</Button>
      </Box>
    </Box>
  )
}

export default Home

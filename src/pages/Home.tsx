import { useUserStore } from '@/stores'
import { formatTitleCase } from '@/utils/onboardingUtils'
import { translations } from '@/utils/translations'
import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material'
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
    <Box>
      <Box sx={{
        p: 2,
        mt: -2,
        pt: 4,
        backgroundImage: `linear-gradient(#E4E0EE, #ffffff)`,
      }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ color: 'primary.main' }}>
          Your QR Code
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, color: '#71717A' }}>
          Put this QR code in a visible place (like wrist band and back of phone)
        </Typography>

      </Box>
      {/* Placeholder QR Code */}
      <Box sx={{ width: 150, height: 150, border: '1px solid #E4E0EE', backgroundColor: '#ccc', mx: 'auto', mb: 3 }} />

      <Box sx={{ px: 2, pb: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: 'primary.main', mb: 1.2 }}>
          Medical Provider View
        </Typography>
        <Box display="flex" alignItems="center" sx={{ mb: 2, backgroundColor: '#eee8ff', px: 2, py: 1.5, borderRadius: '8px' }}>
          <Avatar sx={{ mr: 2 }} src={user.profilePic}>
            {name?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body1">
              Name:
              {' '}
              {name || 'N/A'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#71717a' }}>
              Age:
              {' '}
              {dateOfBirth ? new Date().getFullYear() - new Date(dateOfBirth).getFullYear() : 'N/A'}
            </Typography>
          </Box>
        </Box>
        <Stack sx={{ mb: 2.5 }}>
          {healthInfos && (
            Object.entries(healthInfos).map(([key, items]) => (
              (items as string[])?.length > 0 && (
                <Box key={key} sx={{ px: 2, pb: 2, pt: 1.5, backgroundColor: '#E6E6FA', borderRadius: '8px' }}>
                  <Typography fontWeight="bold" sx={{ mb: 1, color: 'primary.main' }}>
                    {formatTitleCase(key)}
                  </Typography>
                  <Stack spacing={1}>
                    {(items as string[]).map(item => (
                      <Box key={item} sx={{ backgroundColor: '#FAF9F6', borderRadius: '8px', px: 1, py: 1 }}>{item}</Box>
                    ))}
                  </Stack>
                </Box>
              )
            ))
          )}
        </Stack>
        <Divider sx={{ backgroundColor: '#FAFAFC' }} />
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }} alignItems="center">
          <Typography variant="body1" sx={{ mr: 1, color: '#71717a' }}>{language}</Typography>
          <Button variant="contained" size="small" onClick={handleChangeLanguage}>{translations.changeLanguage[language === 'English' ? 'EN' : 'CN']}</Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default Home

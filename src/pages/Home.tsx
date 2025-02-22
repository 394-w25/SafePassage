import { LanguageToggle, MedicalProviderView } from '@/components/Home'
import { Box, Paper, Typography } from '@mui/material'

const Home = () => {
  return (
    <Box sx={{ px: 2, py: 3 }}>

      {/* QR Code Section */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: 'primary.main' }}>
          Your QR Code
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Put this QR code in a visible place
          <br />
          (like a wristband or the back of your phone).
        </Typography>
        <Paper
          elevation={3}
          sx={{
            width: 160,
            height: 160,
            mx: 'auto',
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
            backgroundColor: '#ccc',
          }}
        >
          {/* Placeholder QR Code */}
        </Paper>
      </Box>

      <MedicalProviderView />

      <LanguageToggle />
    </Box>
  )
}

export default Home

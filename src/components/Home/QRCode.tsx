import { Box, Button, Paper, Typography } from '@mui/material'
import { QRCodeCanvas } from 'qrcode.react'
import { useRef } from 'react'

interface QRCodeProps {
  uid: string
}

const QRCode = ({ uid }: QRCodeProps) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL as string
  if (BASE_URL === undefined || typeof BASE_URL !== 'string' || BASE_URL === '') {
    throw new Error('VITE_BASE_URL is not defined')
  }

  const qrCodeUrl = `${BASE_URL}/medical/${uid}`
  const qrRef = useRef<HTMLCanvasElement>(null)

  const handleDownload = () => {
    if (!qrRef.current) {
      return
    }
    const canvas = qrRef.current
    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    link.download = `SafePassage-${uid.slice(0, 6)}.png`
    link.click()
  }

  return (
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
          width: 180,
          height: 180,
          mx: 'auto',
          mt: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          backgroundColor: '#fff',
          p: 2,
        }}
      >
        <QRCodeCanvas ref={qrRef} value={qrCodeUrl} size={150} />
      </Paper>

      <Button
        variant="outlined"
        size="small"
        sx={{ mt: 2 }}
        onClick={handleDownload}
      >
        Download QR Code
      </Button>
    </Box>
  )
}

export default QRCode

import { useUserStore } from '@/stores'
import { Box, Button, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const AuthPrompt = () => {
  const navigate = useNavigate()
  const login = useUserStore(state => state.login)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: theme =>
          `linear-gradient(135deg, ${theme.palette.background.default} 30%, ${theme.palette.primary.light} 100%)`,
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
          maxWidth: 400,
          width: '100%',
          backgroundColor: theme => theme.palette.background.paper,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" fontWeight={600} sx={{ mb: 1, color: 'primary.main' }}>
          Welcome to SafePassage
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          Please log in to continue
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            'width': '100%',
            'textTransform': 'none',
            'fontWeight': 'bold',
            'borderRadius': 2,
            'boxShadow': '0px 3px 6px rgba(0, 0, 0, 0.15)',
            'transition': 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
            },
          }}
          onClick={async () => login(navigate)}
        >
          Login
        </Button>
      </Paper>
    </Box>
  )
}

export default AuthPrompt

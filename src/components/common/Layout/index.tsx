import LoadingCircle from '@/components/common/LoadingCircle'
import { useIsOnboarding } from '@/hooks'
import { useUserStore } from '@/stores'
import { Box, Button, Typography } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  const isOnboarding = useIsOnboarding()
  const loading = useUserStore(state => state.loading)
  const userData = useUserStore(state => state.user)
  const login = useUserStore(state => state.login)
  const navigate = useNavigate()

  if (loading) {
    return <LoadingCircle />
  }

  if (userData === undefined) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: theme => theme.palette.background.default,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, color: 'primary.main' }}>
          Welcome to SafePassage
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Please login to continue
        </Typography>
        <Button variant="contained" size="large" onClick={async () => login(navigate)}>
          Login
        </Button>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        background: theme =>
          `linear-gradient(135deg, ${theme.palette.background.default} 30%, ${theme.palette.primary.light} 100%)`,
        backgroundAttachment: 'fixed',
      }}
    >

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          mt: 4,
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: '1200px',
            width: '100%',
            mx: 2,
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {!isOnboarding && userData !== undefined && <Footer />}
    </Box>
  )
}

export default Layout

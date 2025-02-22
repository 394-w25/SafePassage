import LoadingCircle from '@/components/common/LoadingCircle'
import { useIsOnboarding } from '@/hooks'
import { useUserStore } from '@/stores'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AuthPrompt from './AuthPrompt'
import Footer from './Footer'

const Layout = () => {
  const isOnboarding = useIsOnboarding()
  const loading = useUserStore(state => state.loading)
  const userData = useUserStore(state => state.user)

  if (loading) {
    return <LoadingCircle />
  }

  if (userData === undefined) {
    return (
      <AuthPrompt />
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

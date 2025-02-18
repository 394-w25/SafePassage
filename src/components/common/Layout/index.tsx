import { useIsOnboarding } from '@/hooks'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'

const Layout = () => {
  const isOnboarding = useIsOnboarding()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        backgroundColor: theme => theme.palette.background.default,
      }}
    >
      {!isOnboarding
      && <Header />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: '1200px',
            width: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Box>
      {!isOnboarding
      && <Footer />}
    </Box>
  )
}

export default Layout

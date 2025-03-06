import { Layout, LoadingCircle, ProtectedRoute } from '@/components/common'
import Home from '@/pages/Home'
import Me from '@/pages/Me'
import Medication from '@/pages/Medication'
import Onboarding from '@/pages/Onboarding'
import { useUserStore } from '@/stores'
import Box from '@mui/material/Box'
import { Route, Routes } from 'react-router-dom'
import UserMedicalRecord from './pages/UserMedicalRecord'

const AppRoutes = () => {
  const routeConfig = [
    { path: '/onboarding', element: <Onboarding /> },
    { path: '/medication', element: <Medication /> },
    { path: '/user', element: <Me /> },
  ]

  const loading = useUserStore(state => state.loading)

  if (loading) {
    return <LoadingCircle />
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProtectedRoute element={<Home />} />} />

        {routeConfig.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute element={element} />}
          />
        ))}

        {/* QR Code Scanned */}
        <Route path="/medical/:uid" element={<UserMedicalRecord />} />

        {/* 404 Page */}
        <Route
          path="*"
          element={(
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                mt: 10,
              }}
            >
              <h1>404</h1>
              <p>Oops! The page you're looking for doesn't exist.</p>
            </Box>
          )}
        />
      </Route>
    </Routes>
  )
}

export default AppRoutes

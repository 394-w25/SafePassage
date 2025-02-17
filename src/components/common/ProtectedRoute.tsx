import type { ReactElement } from 'react'
import LoadingCircle from '@/components/common/LoadingCircle'
import { useIsOnboarding } from '@/hooks'
import { useUserStore } from '@/stores'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
  element: ReactElement
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const user = useUserStore(state => state.user)
  const loading = useUserStore(state => state.loading)
  const isOnboarding = useIsOnboarding()
  const navigate = useNavigate()

  if (loading) {
    return <LoadingCircle />
  }

  if (!user) {
    if (isOnboarding) {
      try {
        void navigate('/')
      }
      catch (error) {
        console.error('Navigation error:', error)
      }
    }
    return (
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          marginTop: '2rem',
        }}
      >
        Please sign in to view this page
      </Typography>
    )
  }

  return element
}

export default ProtectedRoute

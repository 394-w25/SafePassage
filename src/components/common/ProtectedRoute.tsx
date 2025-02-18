import type { ReactElement } from 'react'
import LoadingCircle from '@/components/common/LoadingCircle'
import { useIsOnboarding } from '@/hooks'
import { useUserStore } from '@/stores'
import { Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
  element: ReactElement
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const user = useUserStore(state => state.user)
  const loading = useUserStore(state => state.loading)
  const isOnboarding = useIsOnboarding()
  const navigate = useNavigate()

  useEffect(() => {
    // Avoid navigating while still loading
    if (loading) {
      return
    }

    if (!user) {
      if (isOnboarding) {
        void navigate('/', { replace: true })
      }
      return
    }

    if (user.onboarded === undefined || user.onboarded === false) {
      void navigate('/onboarding', { replace: true })
    }
    else if (isOnboarding) {
      void navigate('/', { replace: true })
    }
  }, [user, isOnboarding, loading, navigate])

  if (loading) {
    return <LoadingCircle />
  }

  if (!user) {
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

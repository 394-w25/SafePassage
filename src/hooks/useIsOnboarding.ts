import { useLocation } from 'react-router-dom'

export const useIsOnboarding = () => {
  const currentPath = useLocation().pathname
  return currentPath === '/onboarding'
}

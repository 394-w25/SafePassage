import { useLocation } from 'react-router-dom'

export const useShowFooter = () => {
  const currentPath = useLocation().pathname
  return currentPath === '/onboarding' || currentPath.startsWith('/medical')
}

export const useIsOnboarding = () => {
  const currentPath = useLocation().pathname
  return currentPath === '/onboarding'
}

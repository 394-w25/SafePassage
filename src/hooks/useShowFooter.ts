import { useLocation } from 'react-router-dom'

export const useIsOnboarding = () => {
  const currentPath = useLocation().pathname
  return currentPath === '/onboarding'
}

export const useIsMedicalRecord = () => {
  const currentPath = useLocation().pathname
  return currentPath.startsWith('/medical')
}

export const useShowFooter = () => {
  const isOnboarding = useIsOnboarding()
  const isMedicalRecord = useIsMedicalRecord()
  return isOnboarding || isMedicalRecord
}

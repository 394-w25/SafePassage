import { useLanguageStore } from '@/stores'
import emergencyMessageUtil from '@/utils/emergencyMessageUtil'
import { getUIDProfile } from '@/utils/firebase'
import { translations } from '@/utils/translations'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export const useEmergencyAlert = (countDown: number = 10) => {
  const { uid } = useParams<{ uid: string }>()
  const navigate = useNavigate()
  const language = useLanguageStore(state => state.language)

  const [userData, setUserData] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [countdown, setCountdown] = useState(10)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const hasTriggeredRef = useRef<boolean>(false)

  const handleEmergency = useCallback(async () => {
    if (!hasTriggeredRef.current) {
      hasTriggeredRef.current = true
      try {
        const allEmergencyPhoneNumbers = userData?.healthData?.contacts?.map(contact => contact.phone) ?? []
        if (allEmergencyPhoneNumbers.length === 0) {
          toast.error(`⚠️ ${translations[language].errors.noEmergencyContacts}`)
          return
        }

        await emergencyMessageUtil(allEmergencyPhoneNumbers, userData?.name ?? 'User')
        toast.success(`⚠️ ${translations[language].emergencySent}!`, { duration: 8000 })
      }
      catch (error) {
        toast.error(error instanceof Error ? error.message : translations[language].errors.unknownError)
      }
    }
  }, [userData, language])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUIDProfile(uid)
        if (!data) {
          toast.error(`⚠️ ${translations[language].errors.userNotFound}`)
          throw new Error(`${uid} User data not found`)
        }
        setUserData(data)
      }
      catch (error) {
        console.error('Failed to fetch user data:', error)
        void navigate('/404')
      }
      finally {
        setLoading(false)
      }
    }

    void fetchUserData()
  }, [uid, navigate, language])

  useEffect(() => {
    if (userData) {
      setShowPopup(true)
      setCountdown(countDown)
      hasTriggeredRef.current = false

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      timerRef.current = setInterval(async () => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timerRef.current!)
            timerRef.current = null
            setShowPopup(false)
            void handleEmergency()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
      }
    }
  }, [userData, countDown, handleEmergency])

  const handleSendNow = async () => {
    setShowPopup(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    await handleEmergency()
  }

  const handleCancel = () => {
    setShowPopup(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  return {
    userData,
    loading,
    showPopup,
    countdown,
    hasTriggeredRef,
    handleEmergency,
    handleSendNow,
    handleCancel,
  }
}

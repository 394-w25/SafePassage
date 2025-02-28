import type { ReactNode } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import { useUserStore } from '@/stores'
import { formatPhoneNumber, isValidUSPhoneNumber } from '@/utils/onboardingUtils'
import { produce } from 'immer'
import { createContext, useContext, useState } from 'react'
import { toast } from 'sonner'

interface BasicInfo {
  name: string
  dateOfBirth?: string
}

interface HealthHistoryContextType {
  basicInfo: BasicInfo
  updateBasicInfo: (name?: string, dateOfBirth?: Date) => void
  healthInfos: HealthInfos
  updateHealthInfos: (newHealthInfos: Partial<HealthInfos>) => void
  contacts: Contact[]
  addContact: () => void
  updateContact: <K extends keyof Contact>(id: number, field: K, value: Contact[K]) => void
  removeContact: (id: number) => void
  medications: Medication[]
  addMedication: () => void
  updateMedication: <K extends keyof Medication>(id: number, field: K, value: Medication[K]) => void
  removeMedication: (id: number) => void
  submitProfile: (navigate: NavigateFunction) => void
}

const HealthHistoryContext = createContext<HealthHistoryContextType | undefined>(
  undefined,
)

export const HealthHistoryProvider = ({ children }: { children: ReactNode }) => {
  const user = useUserStore(state => state.user)
  const updateProfile = useUserStore(state => state.updateProfile)

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    name: user?.name ?? '',
  })

  const [healthInfos, setHealthInfos] = useState<HealthInfos>({
    allergies: [],
    medicalConditions: [],
    pastSurgeries: [],
    medicalDevices: [],
  })

  const [contacts, setContacts] = useState<Contact[]>([])

  const [medications, setMedications] = useState<Medication[]>([])

  const updateBasicInfo = (name?: string, dateOfBirth?: Date) => {
    // Format date to 'YYYY-MM-DD'
    const formattedDateOfBirth = dateOfBirth?.toISOString().split('T')[0]
    setBasicInfo(prev => ({
      name: name ?? prev.name,
      dateOfBirth: formattedDateOfBirth ?? prev.dateOfBirth,
    }))
  }

  const updateHealthInfos = (newHealthInfos: Partial<HealthInfos>) => {
    setHealthInfos(prev =>
      produce(prev, (draft) => {
        Object.keys(newHealthInfos).forEach((key) => {
          const category = key as keyof HealthInfos
          draft[category] = Array.from(new Set(newHealthInfos[category] ?? []))
        })
      }),
    )
  }

  const addContact = () => {
    setContacts(prev =>
      produce(prev, (draft) => {
        draft.push({ id: Date.now(), name: '', relationship: '', phone: '' })
      }),
    )
  }

  const updateContact = <K extends keyof Contact>(id: number, field: K, value: Contact[K]) => {
    setContacts(prev =>
      produce(prev, (draft) => {
        const contact = draft.find(c => c.id === id)
        if (contact) {
          contact[field] = value
        }
      }),
    )
  }

  const removeContact = (id: number) => {
    setContacts(prev =>
      produce(prev, draft => draft.filter(contact => contact.id !== id)),
    )
  }

  const addMedication = () => {
    setMedications(prev =>
      produce(prev, (draft) => {
        draft.push({ id: Date.now(), name: '', dosage: undefined, frequency: undefined, time: undefined })
      }),
    )
  }

  const updateMedication = <K extends keyof Medication>(id: number, field: K, value: Medication[K]) => {
    setMedications(prev =>
      produce(prev, (draft) => {
        const medication = draft.find(m => m.id === id)
        if (medication) {
          medication[field] = value
        }
      }),
    )
  }

  const removeMedication = (id: number) => {
    setMedications(prev =>
      produce(prev, draft => draft.filter(medication => medication.id !== id)),
    )
  }

  const submitProfile = async (navigate: NavigateFunction) => {
    if (basicInfo.dateOfBirth === undefined) {
      toast.error('Please provide your date of birth.')
      return
    }

    let hasError = false

    // Use `immer` to process `contacts` and `healthInfos` before submitting
    const updatedData = produce({ contacts, healthInfos }, (draft) => {
      const errors: string[] = []

      // Process contacts: filter empty ones, validate fields, and format phone numbers
      draft.contacts = draft.contacts.reduce<Contact[]>((acc, contact, index) => {
        const { name, relationship, phone } = contact

        // If all fields are empty, remove this contact
        if (!name && !relationship && !phone) {
          return acc
        }

        // Validate required fields
        if (!name) {
          errors.push(`Contact ${index + 1}: Name is required.`)
        }
        if (!relationship) {
          errors.push(`Contact ${index + 1}: Relationship is required.`)
        }
        if (!phone) {
          errors.push(`Contact ${index + 1}: Phone number is required.`)
        }
        else if (!isValidUSPhoneNumber(phone)) {
          errors.push(`Contact ${index + 1}: Invalid phone number.`)
        }

        // If any errors exist, don't push this contact
        if (errors.length === 0) {
          acc.push({ ...contact, phone: formatPhoneNumber(phone) })
        }

        return acc
      }, [])

      // Process healthInfos: remove duplicates
      draft.healthInfos = Object.fromEntries(
        Object.entries(draft.healthInfos).map(([key, values]) => [
          key,
          Array.from(new Set(values ?? [])),
        ]),
      )

      // If errors exist, stop processing and return null
      if (errors.length > 0) {
        errors.forEach(error => toast.error(error))
        hasError = true
      }
    })

    const validatedMedications = medications.reduce<Medication[]>((acc, med, index) => {
      if (!med.id || !med.name.trim()) {
        toast.error(`Medication ${index + 1} is missing an ID or Name.`)
        hasError = true
        return acc
      }

      acc.push({
        id: med.id,
        name: med.name.trim(),
        dosage: med.dosage?.trim() ?? undefined,
        frequency: med.frequency ?? undefined,
        time: med.time?.trim() ?? undefined,
      })

      return acc
    }, [])

    // If errors exist, prevent submission
    if (hasError) {
      return
    }

    const healthData: HealthData = {
      dateOfBirth: basicInfo.dateOfBirth,
      healthInfos: updatedData.healthInfos,
      contacts: updatedData.contacts,
      medications: validatedMedications,
    }

    const updates: Partial<UserProfile> = {
      healthData,
      onboarded: true,
    }

    if (basicInfo.name !== user?.name && basicInfo.name) {
      updates.name = basicInfo.name
    }

    try {
      await updateProfile(updates)
      await navigate('/')
    }
    catch (error) {
      toast.error('Profile update failed.')
      console.error('Profile update failed:', error)
    }
  }

  return (
    <HealthHistoryContext
      value={{
        basicInfo,
        updateBasicInfo,
        healthInfos,
        updateHealthInfos,
        contacts,
        addContact,
        updateContact,
        removeContact,
        medications,
        addMedication,
        updateMedication,
        removeMedication,
        submitProfile,
      }}
    >
      {children}
    </HealthHistoryContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useHealthHistory = () => {
  const context = useContext(HealthHistoryContext)
  if (!context) {
    throw new Error('useHealthHistory must be used within a HealthHistoryProvider')
  }
  return context
}

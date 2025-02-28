type UserType = 'admin' | 'user'

interface HealthInfos {
  allergies?: string[]
  medicalConditions?: string[]
  pastSurgeries?: string[]
  medicalDevices?: string[]
}

interface Contact {
  id: number
  name: string
  relationship: string
  phone: string
}

interface Medication {
  id: number
  name: string
  dosage?: string
  frequency?: number
  time?: string
}

interface HealthData {
  dateOfBirth: string
  healthInfos?: HealthInfos
  contacts?: Contact[]
  medications?: Medication[]
}

interface UserProfile {
  uid: string
  name: string
  email: string
  profilePic: string
  createdAt: string
  role: UserType
  onboarded: boolean
  healthData?: HealthData
}

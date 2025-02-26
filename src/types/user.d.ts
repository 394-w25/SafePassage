type UserType = 'admin' | 'user'

interface Medication {
  name?: string
  dosage?: string
  time?: string
}

interface Medication {
  id: string
  name: string
  dosage: string
  time: string
}

interface HealthInfos {
  allergies?: string[]
  medications?: Medication []
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

interface HealthData {
  dateOfBirth: string
  healthInfos?: HealthInfos
  contacts?: Contact[]
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

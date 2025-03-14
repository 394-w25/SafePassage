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

interface MedicationSchedule extends Medication {
  duringTrip: boolean
  adjusted: boolean
}

interface Medication {
  id: number
  name: string
  dosage?: string
  time?: string
}

interface Trip {
  id: number
  country: string
  city?: string
  startDate: string
  endDate: string
}

interface HealthData {
  dateOfBirth: string
  healthInfos?: HealthInfos
  contacts?: Contact[]
  medications?: Medication[]
}

interface TimeInfo {
  homeCountry: string
  homeCity: string
  homeTimezone: string
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
  timeInfo?: TimeInfo
  trips?: Trip[]
}

interface TokenDocument {
  token: string

}

type Language = 'EN' | 'CN'

interface TranslationContents {
  changeLanguage: string
  changeLanguageSuccess: string
  MedicalProvider: {
    title: string
    nameLabel: string
    ageLabel: string
  }
  HealthHistory: string
  Medications: string
  EmergencyContacts: string
  healthInfos: {
    allergies: string
    medicalConditions: string
    pastSurgeries: string
    medicalDevices: string
  }
  medicationInfos: string
  emergencyContacts: string
  EMERGENCY_BUTTON: string
  emergencyAlert: string
  emergencyAlertContent: string
  seconds: string
  cancelButton: string
  sendNowButton: string
  emergencySent: string
  from: string
  errors: {
    userNotFound: string
    unknownError: string
    noEmergencyContacts: string
  }
}

type Translation = Record<Language, TranslationContents>

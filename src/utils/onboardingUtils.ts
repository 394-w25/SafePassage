export const formatTitleCase = (text: string): string => {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

export const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : value
}

// Validating phone number
export const isValidUSPhoneNumber = (value: string): boolean => {
  return /^\(\d{3}\) \d{3}-\d{4}$/.test(formatPhoneNumber(value))
}

/**
 *
 * @param dateOfBirth {string | undefined} - Date of birth in string format (YYYY-MM-DD)
 * @returns {string | number} - Age of the user or 'N/A' if dateOfBirth is undefined
 */
export const calculateAge = (dateOfBirth: string | undefined): string | number => {
  if (dateOfBirth === undefined) {
    return 'N/A'
  }
  const dobYear = new Date(dateOfBirth).getFullYear()
  const currentYear = new Date().getFullYear()
  return currentYear - dobYear
}

export const emergencyContactRelationships = [
  'Parent',
  'Sibling',
  'Spouse',
  'Child',
  'Friend',
  'Other',
  'Father',
  'Mother',
  'Brother',
  'Sister',
  'Son',
  'Daughter',
].sort((a, b) => a.localeCompare(b))

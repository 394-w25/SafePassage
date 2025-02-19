export const formatTitleCase = (text: string): string => {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[+\d][\d\s\-()]+$/
  return phoneRegex.test(phone)
}

export const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/[()\s-]/g, '')
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

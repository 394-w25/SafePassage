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

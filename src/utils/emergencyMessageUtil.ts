import { getDocument } from './firebase'

const getUserLocation = async (): Promise<{ latitude: number, longitude: number }> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }),
      error => reject(error),
      // High accuracy location, 10s timeout
      { enableHighAccuracy: true, timeout: 10000 },
    )
  })
}

const emergencyMessageUtil = async (recipients: string[], userName: string) => {
  try {
    // Get Bearer Token
    const tokenDoc = await getDocument<TokenDocument>('message', 'tokens')
    const token = tokenDoc?.token
    if (token === undefined) {
      throw new Error('Failed to retrieve authentication token')
    }

    // Get user's location
    let locationMessage = ''
    try {
      const location = await getUserLocation()
      locationMessage = `📍 Location: https://maps.google.com/?q=${location.latitude},${location.longitude}`
    }
    catch (locationError) {
      console.warn('Location not available:', locationError)
      locationMessage = '📍 Location unavailable. User denied access or location service is disabled.'
    }

    // Construct SMS content
    const smsContent = `🚨 EMERGENCY ALERT 🚨\n${userName} needs your help!\n${locationMessage}`

    // Send emergency messages
    const sendPromises = recipients.map(async (recipient) => {
      const res = await fetch('https://api.safepassage.zla.app/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipient,
          subject: '🚨 EMERGENCY ALERT 🚨',
          message: smsContent,
        }),
      })

      if (!res.ok) {
        console.error(`Failed to send SMS to ${recipient}: ${res.statusText}`)
        throw new Error(`Failed to send SMS to ${recipient}: ${res.statusText}`)
      }

      return res.json() as Promise<{ success: boolean }>
    })

    // Wait for all messages to be sent
    await Promise.all(sendPromises)
  }
  catch (error) {
    console.error('Error in emergencyMessageUtil:', error)
    throw error
  }
}

export default emergencyMessageUtil

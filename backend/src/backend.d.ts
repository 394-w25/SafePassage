interface MessageRequest {
  recipient?: string
  subject?: string
  message?: string
}

interface TwilioResponse {
  message?: string
  sid?: string
}

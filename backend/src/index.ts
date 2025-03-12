import type { Context } from 'hono'
import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

// Twilio account info (env)
interface Bindings {
  TWILIO_ACCOUNT_SID: string
  TWILIO_AUTH_TOKEN: string
  TWILIO_PHONE_NUMBER: string
  AUTH_TOKEN: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use(logger())

// CORS only allow from zla.app
app.use(cors({
  origin: origin => (
    origin.endsWith('.zla.app') || origin.startsWith('http://localhost:')
      ? origin
      : 'https://safepassage.zla.app/'),
}))

app.use('/messages', bearerAuth({ verifyToken(token, c: Context) {
  return token === (c.env as Bindings).AUTH_TOKEN
} }))

// Send SMS
app.post('/messages', async (c: Context) => {
  try {
    const request: MessageRequest = await c.req.json()
    const { recipient, subject, message } = request

    if (recipient === undefined || message === undefined) {
      return c.json({ error: 'Recipient and message are required.' }, 400)
    }

    // Construct SMS content
    const smsContent = subject !== undefined
      ? `[${subject}] ${message}`
      : message

    // Call Twilio API
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = c.env as Bindings
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
        },
        body: new URLSearchParams({
          From: TWILIO_PHONE_NUMBER,
          // Hardcoded US country code, remove non-digits
          To: `+1${recipient.replace(/\D/g, '')}`,
          Body: smsContent,
        }).toString(),
      },
    )

    const result: TwilioResponse = await response.json()

    if (!response.ok) {
      throw new Error(result instanceof Error
        ? result.message
        : result.message ?? response.statusText)
    }

    return c.json({ success: true, sid: result.sid })
  }
  catch (error) {
    console.error('Error in /messages:', error)

    return c.json({
      error: (error as { message?: string }).message ?? 'An unknown error occurred.',
    }, 500)
  }
})

export default app

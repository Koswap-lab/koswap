import { Resend } from 'resend'

// Local in-memory / persistent set for local testing & count tracking
const waitlistEmails = new Set<string>([
  'early.user1@koswap.com',
  'early.user2@koswap.com',
  'early.user3@koswap.com'
])

const BASE_COUNT = 2847

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  // GET: return current counter
  if (method === 'GET') {
    return {
      count: BASE_COUNT + waitlistEmails.size
    }
  }

  // POST: register waitlist entry
  if (method === 'POST') {
    const body = await readBody(event)
    const email = body?.email?.trim()?.toLowerCase()

    // 1. Server-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Please provide a valid email address.'
      })
    }

    // 2. Check duplicate state
    if (waitlistEmails.has(email)) {
      return {
        success: true,
        duplicate: true,
        message: "You're already on the list! We will reach out as soon as early access opens.",
        count: BASE_COUNT + waitlistEmails.size
      }
    }

    // 3. Save new email
    waitlistEmails.add(email)

    // 4. Send email via Resend if API key is present
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey)
        await resend.emails.send({
          from: 'KO SWAP <waitlist@koswap.com>',
          to: [email],
          subject: "You're on the KO SWAP Waitlist! ⚡",
          html: `
            <div style="background-color: #FAF7F2; padding: 40px 20px; font-family: sans-serif; color: #1C1B19;">
              <div style="max-width: 560px; margin: 0 auto; background: #FFFFFF; border-radius: 20px; padding: 32px; border: 1px solid #1C1B1910;">
                <div style="display: flex; align-items: center; margin-bottom: 24px;">
                  <div style="background: #1C1B19; color: #FAF7F2; font-weight: bold; width: 36px; height: 36px; border-radius: 8px; text-align: center; line-height: 36px; margin-right: 10px;">KO</div>
                  <h2 style="margin: 0; font-size: 20px; color: #1C1B19;">KO <span style="color: #2A4BFF;">SWAP</span></h2>
                </div>
                <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 16px; color: #1C1B19;">You're officially on the list!</h1>
                <p style="font-size: 16px; line-height: 1.6; color: #6B6A66; margin-bottom: 24px;">
                  Thank you for joining the KO SWAP early access waitlist. We are building the fastest, most reliable crypto and Naira swap platform in Nigeria.
                </p>
                <div style="background-color: #FAF7F2; padding: 16px; border-radius: 12px; font-family: monospace; font-size: 14px; margin-bottom: 24px; color: #1C1B19;">
                  Status: <strong>Priority Access Confirmed</strong>
                </div>
                <p style="font-size: 14px; color: #6B6A66;">
                  We'll email you the moment private beta access opens — no spam, one email.
                </p>
              </div>
            </div>
          `
        })
      } catch (e) {
        console.error('Resend email dispatch error:', e)
      }
    }

    return {
      success: true,
      duplicate: false,
      message: "You're in! We've reserved your spot on the KO SWAP waitlist.",
      count: BASE_COUNT + waitlistEmails.size
    }
  }
})

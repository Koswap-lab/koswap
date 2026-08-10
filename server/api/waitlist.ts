import { Resend } from 'resend'
import { connectToDatabase } from '../utils/db'
import { Waitlist } from '../models/Waitlist'

const BASE_COUNT = 2847

export default defineEventHandler(async (event) => {
  await connectToDatabase()
  const method = event.node.req.method

  // GET: return current counter
  if (method === 'GET') {
    const dbCount = await Waitlist.countDocuments()
    return {
      count: BASE_COUNT + dbCount
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

    // 2 & 3. Save new email / Check duplicate state
    try {
      await Waitlist.create({ email })
    } catch (error: any) {
      if (error.code === 11000) {
        // Duplicate key error
        const dbCount = await Waitlist.countDocuments()
        return {
          success: true,
          duplicate: true,
          message: "You're already on the list! We will reach out as soon as early access opens.",
          count: BASE_COUNT + dbCount
        }
      }
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal server error.'
      })
    }

    // 4. Send email via Resend if API key is present
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey)
        await resend.emails.send({
          from: 'KO SWAP <waitlist@koswap.co>',
          to: [email],
          subject: "You're on the list.",
          html: `
            <div style="background-color: #FAF7F2; padding: 40px 20px; font-family: sans-serif; color: #1C1B19;">
              <div style="max-width: 560px; margin: 0 auto; background: #FFFFFF; border-radius: 20px; padding: 32px; border: 1px solid #1C1B1910;">
                <div style="margin-bottom: 32px;">
                  <img src="https://koswap.co/logo.png" alt="KO SWAP" style="height: 32px; display: block;" />
                </div>
                <p style="font-size: 16px; line-height: 1.6; color: #1C1B19; margin-bottom: 24px;">
                  Hi,
                </p>
                <p style="font-size: 16px; line-height: 1.6; color: #1C1B19; margin-bottom: 24px;">
                  You're in.
                </p>
                <p style="font-size: 16px; line-height: 1.6; color: #1C1B19; margin-bottom: 24px;">
                  We're building KO.SWAP to make moving between digital assets and traditional finance simpler, smarter and more seamless.
                </p>
                <p style="font-size: 16px; line-height: 1.6; color: #1C1B19; margin-bottom: 24px;">
                  We're still putting the pieces together, but you'll be among the first to know when we're ready.
                </p>
                <p style="font-size: 16px; line-height: 1.6; color: #1C1B19; margin-bottom: 32px;">
                  See you on the other side.
                </p>
                <p style="font-size: 16px; line-height: 1.6; color: #1C1B19; font-weight: bold; margin: 0;">
                  KO.SWAP<br>
                  <span style="font-weight: normal; color: #6B6A66;">Finance, on your terms.</span>
                </p>
              </div>
              <div style="max-width: 560px; margin: 32px auto 0; text-align: center; color: #6B6A66; font-size: 12px; line-height: 1.6;">
                &copy; ${new Date().getFullYear()} KO.SWAP. All rights reserved.<br>
                <a href="https://koswap.co" style="color: #2A4BFF; text-decoration: none;">koswap.co</a>
              </div>
            </div>
          `
        })
      } catch (e) {
        console.error('Resend email dispatch error:', e)
      }
    }

    const dbCount = await Waitlist.countDocuments()
    return {
      success: true,
      duplicate: false,
      message: "You're in! We've reserved your spot on the KO SWAP waitlist.",
      count: BASE_COUNT + dbCount
    }
  }
})

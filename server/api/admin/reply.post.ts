import { Resend } from 'resend'
import { connectToDatabase } from '../../utils/db'
import { Waitlist } from '../../models/Waitlist'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { password, email, message } = body
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword || password !== adminPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  if (!email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and message are required.'
    })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Resend API key not configured.'
    })
  }

  await connectToDatabase()

  try {
    const resend = new Resend(resendApiKey)
    
    // Replace newlines with <br> for HTML email formatting
    const formattedMessage = message.replace(/\n/g, '<br>')

    await resend.emails.send({
      from: 'KO SWAP <waitlist@koswap.co>',
      to: [email],
      subject: "A message from KO SWAP",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="color-scheme" content="light only">
          <meta name="supported-color-schemes" content="light only">
          <style>
            :root { color-scheme: light; supported-color-schemes: light; }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #FAF7F2;">
          <div style="background-color: #FAF7F2; padding: 40px 20px; font-family: sans-serif; color: #1C1B19;">
          <div style="max-width: 560px; margin: 0 auto; background: #FFFFFF; border-radius: 20px; padding: 32px; border: 1px solid #1C1B1910;">
            <div style="margin-bottom: 32px;">
              <img src="https://koswap.co/logo.png" alt="KO SWAP" style="height: 32px; display: block;" />
            </div>
            <p style="font-size: 16px; line-height: 1.6; color: #1C1B19; margin-bottom: 24px;">
              ${formattedMessage}
            </p>
          </div>
          <div style="max-width: 560px; margin: 32px auto 0; text-align: center; color: #6B6A66; font-size: 12px; line-height: 1.6;">
            &copy; ${new Date().getFullYear()} KO SWAP. All rights reserved.<br>
            <a href="https://koswap.co" style="color: #2A4BFF; text-decoration: none;">koswap.co</a>
          </div>
          </div>
        </body>
        </html>
      `
    })

    // Update status in DB
    await Waitlist.findOneAndUpdate({ email }, { replied: true })

    return { success: true }
  } catch (error) {
    console.error('Error sending reply:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send email.'
    })
  }
})

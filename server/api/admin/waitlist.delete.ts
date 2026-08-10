import { connectToDatabase } from '../../utils/db'
import { Waitlist } from '../../models/Waitlist'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { password, email } = body
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword || password !== adminPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required.'
    })
  }

  await connectToDatabase()

  try {
    await Waitlist.findOneAndDelete({ email })
    return { success: true }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error deleting user from waitlist.'
    })
  }
})

import { connectToDatabase } from '../../utils/db'
import { Waitlist } from '../../models/Waitlist'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const password = query.password as string
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword || password !== adminPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  await connectToDatabase()

  try {
    const users = await Waitlist.find().sort({ createdAt: -1 })
    return { users }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching waitlist users.'
    })
  }
})

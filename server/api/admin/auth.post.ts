export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const password = body?.password

  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Admin password not configured in environment variables.'
    })
  }

  if (password === adminPassword) {
    return { success: true }
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid password.'
    })
  }
})

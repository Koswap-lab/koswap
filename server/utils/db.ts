import mongoose from 'mongoose'

let isConnected = false

export const connectToDatabase = async () => {
  if (isConnected) {
    return
  }

  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI is not defined in the environment variables')
    return
  }

  try {
    const db = await mongoose.connect(uri)
    isConnected = db.connections[0].readyState === 1
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

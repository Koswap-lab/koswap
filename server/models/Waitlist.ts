import mongoose from 'mongoose'

const waitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replied: {
    type: Boolean,
    default: false,
  }
})

// If the model is already registered, use it, otherwise register it.
export const Waitlist = mongoose.models.Waitlist || mongoose.model('Waitlist', waitlistSchema)

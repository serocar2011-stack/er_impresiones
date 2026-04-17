import dotenv from 'dotenv'
import path from 'path'

const result = dotenv.config()
console.log('Dotenv result:', result)
console.log('Current working directory:', process.cwd())
console.log('MONGODB_URI from env:', process.env.MONGODB_URI)

// Puerto de express
export const PORT = process.env.PORT || 3001
export const MONGODB_URI = process.env.MONGODB_URI
export const JWT_SECRET = process.env.JWT_SECRET

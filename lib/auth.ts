import bcrypt from 'bcryptjs'
import * as jose from 'jose'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-testing'
const secret = new TextEncoder().encode(JWT_SECRET)

export interface JWTPayload {
  userId: string
  email: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function generateToken(payload: JWTPayload): Promise<string> {
  // jose expects a plain object payload; cast accordingly
  const token = await new jose.SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)

  return token
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, secret)
    // map jose payload to our JWTPayload shape
    const p = payload as Record<string, unknown>
    const userId = typeof p.userId === 'string' ? p.userId : typeof p.user_id === 'string' ? p.user_id : ''
    const email = typeof p.email === 'string' ? p.email : ''
    if (!userId || !email) return null
    return { userId, email }
  } catch (err) {
    return null
  }
}

export async function getUserFromToken(token: string) {
  const payload = await verifyToken(token)
  if (!payload) return null

  return prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, name: true, isActive: true }
  })
}
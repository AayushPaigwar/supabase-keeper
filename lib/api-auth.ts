import { NextRequest } from 'next/server'
import { prisma } from './prisma'

export async function getUserFromRequest(request: NextRequest) {
  const userId = request.headers.get('x-user-id')
  
  if (!userId) {
    return null
  }

  // Verify user exists and is active in database
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, isActive: true }
  })

  if (!user || !user.isActive) {
    return null
  }

  return user
}

import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const configs = await prisma.supabaseConfig.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ configs })
  } catch (error) {
    console.error('List configs error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
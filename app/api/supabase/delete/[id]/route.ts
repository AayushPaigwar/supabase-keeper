import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const config = await prisma.supabaseConfig.findFirst({
      where: { id, userId }
    })

    if (!config) {
      return NextResponse.json({ error: 'Config not found' }, { status: 404 })
    }

    await prisma.supabaseConfig.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete config error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
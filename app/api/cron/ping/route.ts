import { pingSupabaseConfigs } from '@/lib/supabasePing'
import { NextRequest, NextResponse } from 'next/server'

// Default schedule time (24h) — can be overridden with SCHEDULE_TIME env var (format HH:MM)
const DEFAULT_SCHEDULE = process.env.SCHEDULE_TIME || '19:33'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const force = url.searchParams.get('force') === 'true'

    if (!force) {
      const schedule = (process.env.SCHEDULE_TIME || DEFAULT_SCHEDULE).trim()
      const [schedHour, schedMin] = schedule.split(':').map(Number)

      const now = new Date()
      const currentHour = now.getHours()
      const currentMin = now.getMinutes()

      // Only run when current server time matches schedule
      if (currentHour !== schedHour || currentMin !== schedMin) {
        console.log(`Cron ping skipped — current time ${String(currentHour).padStart(2,'0')}:${String(currentMin).padStart(2,'0')} does not match schedule ${schedule}`)
        return NextResponse.json({ success: false, reason: 'Not scheduled time', currentTime: `${String(currentHour).padStart(2,'0')}:${String(currentMin).padStart(2,'0')}`, schedule }, { status: 204 })
      }
    } else {
      console.log('Cron ping forced by query param')
    }

    const logs = await pingSupabaseConfigs(force)
    // Print logs to the server console so deploy logs also capture them
    for (const l of logs) {
      if (l.ok) {
        console.log(`user: ${l.userEmail}, status: ${l.status}, project: ${l.projectName}, url: ${l.supabaseUrl}`)
      } else {
        console.log(`user: ${l.userEmail}, status: ${l.status ?? 'N/A'}, project: ${l.projectName}, url: ${l.supabaseUrl}, error: ${l.error ?? ''}`)
      }
    }

    return NextResponse.json({ success: true, logs })
  } catch (error) {
    console.error('Cron ping error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
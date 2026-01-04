import { prisma } from './prisma'

type PingLog = {
  userId: string
  userEmail: string
  configId: string
  projectName: string
  supabaseUrl: string
  status: number | null
  ok: boolean
  error?: string
}

export async function pingSupabaseConfigs(force = false): Promise<PingLog[]> {
  // Load users with their active supabase configs
  const users = await prisma.user.findMany({
    where: {},
    include: {
      supabaseConfigs: {
        where: { isActive: true }
      }
    }
  })

  const now = new Date()
  const PING_INTERVAL_HOURS = 24
  const logs: PingLog[] = []

  for (const user of users) {
      for (const config of user.supabaseConfigs) {
      try {
          const shouldPing = force || !config.lastPingedAt || (now.getTime() - new Date(config.lastPingedAt).getTime()) >= (PING_INTERVAL_HOURS * 60 * 60 * 1000)
          if (!shouldPing) {
            // skip but still push a log entry marking skipped
            logs.push({
              userId: user.id,
              userEmail: user.email,
              configId: config.id,
              projectName: config.projectName,
              supabaseUrl: config.supabaseUrl,
              status: null,
              ok: false,
              error: 'skipped - not due yet'
            })
            continue
          }

          // Check the user-provided read-only table `supabase_keeper` specifically
          const checkUrl = `${config.supabaseUrl.replace(/\/$/, '')}/rest/v1/supabase_keeper?select=id&limit=1`
          const res = await fetch(checkUrl, {
          headers: {
            'apikey': config.anonKey,
            'Authorization': `Bearer ${config.anonKey}`
          }
        })

        if (res.ok) {
          await prisma.supabaseConfig.update({ where: { id: config.id }, data: { lastPingedAt: now } })
          logs.push({
            userId: user.id,
            userEmail: user.email,
            configId: config.id,
            projectName: config.projectName,
            supabaseUrl: config.supabaseUrl,
            status: res.status,
            ok: true
          })
        } else {
          logs.push({
            userId: user.id,
            userEmail: user.email,
            configId: config.id,
            projectName: config.projectName,
            supabaseUrl: config.supabaseUrl,
            status: res.status,
            ok: false,
            error: `status ${res.status}`
          })
        }
      } catch (err: any) {
        logs.push({
          userId: user.id,
          userEmail: user.email,
          configId: config.id,
          projectName: config.projectName,
          supabaseUrl: config.supabaseUrl,
          status: null,
          ok: false,
          error: String(err?.message || err)
        })
      }
    }
  }

  // Return detailed logs for the caller to output or persist
  return logs
}
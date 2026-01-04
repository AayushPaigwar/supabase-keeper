const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto')

const prisma = new PrismaClient()

// Safety: do not run seeding in production unless explicitly allowed
if (process.env.NODE_ENV === 'production' && !process.env.FORCE_SEED) {
    console.log('Skipping seed in production. Set FORCE_SEED=1 to override.')
    process.exit(0)
}

async function verifySupabaseConnections() {
    try {
        // Get all active users from database
        const users = await prisma.user.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'asc' },
            include: {
                supabaseConfigs: true
            }
        })

        if (users.length === 0) {
            console.log('❌ No active users found in database.')
            return
        }

        console.log(`🔍 Verifying Supabase connections for ${users.length} user(s)...\n`)

        let totalConfigs = 0
        let successfulConnections = 0

        for (const user of users) {
            console.log(`👤 User: ${user.email} (${user.supabaseConfigs.length} config(s))`)

            if (user.supabaseConfigs.length === 0) {
                console.log(`   ℹ️  No Supabase configs found for this user\n`)
                continue
            }

            for (const config of user.supabaseConfigs) {
                totalConfigs++

                try {
                    // Make REST request to supabase_keeper table
                    const response = await fetch(`${config.supabaseUrl}/rest/v1/supabase_keeper?select=id&limit=1`, {
                        headers: {
                            'apikey': config.anonKey,
                            'Authorization': `Bearer ${config.anonKey}`
                        }
                    })

                    if (response.ok) {
                        console.log(`   ✅ ${config.projectName}: Connection successful (${config.supabaseUrl})`)
                        successfulConnections++
                    } else {
                        console.log(`   ❌ ${config.projectName}: HTTP ${response.status} - ${response.statusText} (${config.supabaseUrl})`)
                    }
                } catch (error) {
                    console.log(`   ❌ ${config.projectName}: Connection failed - ${error.message} (${config.supabaseUrl})`)
                }
            }

            console.log('') // Empty line between users
        }

        console.log(`📊 Summary: ${successfulConnections}/${totalConfigs} connections successful`)

        if (successfulConnections === totalConfigs && totalConfigs > 0) {
            console.log('🎉 All Supabase connections are working!')
        } else if (successfulConnections > 0) {
            console.log('⚠️  Some connections failed. Check your Supabase configurations.')
        } else {
            console.log('❌ No successful connections. Check your Supabase configurations.')
        }

    } catch (err) {
        console.error('❌ Verification error:', err)
        process.exitCode = 1
    } finally {
        await prisma.$disconnect()
    }
}

verifySupabaseConnections()

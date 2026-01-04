import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

async function testSupabaseConnection(supabaseUrl: string, anonKey: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Test connection by making a simple request to Supabase REST API
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200 || response.status === 401) {
      return { success: true }
    }
    return { success: false, error: `Unexpected status: ${response.status}` }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return { success: false, error: msg || 'Connection failed' }
  }
}

async function testSchemaExecution(supabaseUrl: string, serviceRoleKey: string, schema: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Execute the schema using Supabase's PostgREST query endpoint
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: schema })
    })

    if (response.status === 200 || response.status === 201) {
      return { success: true }
    }

    // Try alternative endpoint for SQL execution
    const altResponse = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    })

    return { 
      success: altResponse.status === 200 || altResponse.status === 201,
      error: altResponse.status !== 200 && altResponse.status !== 201 ? `Status: ${altResponse.status}` : undefined
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return { success: false, error: msg || 'Schema execution failed' }
  }
}

async function testTableExists(supabaseUrl: string, anonKey: string): Promise<{ success: boolean; error?: string }> {
  try {
    const base = supabaseUrl.replace(/\/$/, '')
    // Check the read-only table `supabase_keeper`
    const url = `${base}/rest/v1/supabase_keeper?select=id,name&limit=1`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      return { success: true }
    }

    return { success: false, error: `Status: ${response.status}` }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return { success: false, error: msg || 'Table check failed' }
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { project_name, supabase_url, anon_key, schema_sql } = await request.json()

    if (!project_name || !supabase_url || !anon_key) {
      return NextResponse.json({ error: 'Missing required fields: Name, URL, and Anon Key' }, { status: 400 })
    }

    // Step 1: Test Supabase connection with anon key
    const connectionTest = await testSupabaseConnection(supabase_url, anon_key)
    if (!connectionTest.success) {
      return NextResponse.json({ error: `Unable to connect: ${connectionTest.error}` }, { status: 400 })
    }

    // Step 2: Verify that the user has created the required read-only table `supabase_keeper`
    const tableTest = await testTableExists(supabase_url, anon_key)
    if (!tableTest.success) {
      return NextResponse.json({ error: `Table check failed: ${tableTest.error}. Please run the provided CREATE/INSERT SQL first.` }, { status: 400 })
    }

    const config = await prisma.supabaseConfig.create({
      data: {
        userId,
        projectName: project_name,
        supabaseUrl: supabase_url,
        anonKey: anon_key,
        schemaSql: schema_sql || ''
      }
    })

    return NextResponse.json({ success: true, config })
  } catch (error) {
    console.error('Add config error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
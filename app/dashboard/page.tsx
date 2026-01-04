'use client'

import { Activity, Clock, FileCode, Key, Link as LinkIcon, LogOut, Plus, Trash2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface SupabaseConfig {
  id: string
  projectName: string
  supabaseUrl: string
  anonKey: string
  schemaSql: string
  lastPingedAt: string | null
  isActive: boolean
  createdAt: string
}

export default function DashboardPage() {
  const [configs, setConfigs] = useState<SupabaseConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const sampleSchema = `CREATE TABLE supabase_keeper (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO supabase_keeper (name) VALUES ('keep my supabase active');`

  const router = useRouter()

  const [formData, setFormData] = useState({
    project_name: '',
    supabase_url: '',
    anon_key: '',
    schema_sql: sampleSchema
  })
  const [copied, setCopied] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
  const [toast, setToast] = useState('')
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  useEffect(() => {
    fetchConfigs()
  }, [])

  const fetchConfigs = async () => {
    try {
      const response = await fetch('/api/supabase/list')
      if (response.ok) {
        const data = await response.json()
        setConfigs(data.configs)
      } else if (response.status === 401) {
        router.push('/login')
      }
    } catch (error) {
      console.error('Failed to fetch configs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddLoading(true)
    
    try {
      const response = await fetch('/api/supabase/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setShowAddForm(false)
        setFormData({ project_name: '', supabase_url: '', anon_key: '', schema_sql: sampleSchema })
        fetchConfigs()
      } else {
        setToast(data.error || 'Failed to add project')
      }
    } catch (error) {
      console.error('Failed to add config:', error)
      setToast('Network error. Please try again.')
    } finally {
      setAddLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this config?')) return

    try {
      const response = await fetch(`/api/supabase/delete/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchConfigs()
      }
    } catch (error) {
      console.error('Failed to delete config:', error)
    }
  }

  const handleLogout = async () => {
    setShowLogoutDialog(true)
  }

  const confirmLogout = async () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    router.push('/login')
  }

  const cancelLogout = () => {
    setShowLogoutDialog(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#016239] rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading your projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#016239] rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-xs text-gray-500">{configs.length} {configs.length === 1 ? 'project' : 'projects'} active</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#016239] rounded-lg hover:bg-[#014d2d] transition-colors"
              >
                {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {showAddForm ? 'Cancel' : 'Add Project'}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Supabase Project</h2>
            <form onSubmit={handleAdd} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="My Awesome Project"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#016239] text-gray-900 transition-colors"
                  value={formData.project_name}
                  onChange={(e) => setFormData({...formData, project_name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Supabase URL</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    required
                    placeholder="https://xxxxx.supabase.co"
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#016239] text-gray-900 transition-colors"
                    value={formData.supabase_url}
                    onChange={(e) => setFormData({...formData, supabase_url: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Anon Key</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#016239] text-gray-900 transition-colors font-mono text-sm"
                    value={formData.anon_key}
                    onChange={(e) => setFormData({...formData, anon_key: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <FileCode className="inline w-4 h-4 mr-1" />
                  Sample Table Schema (SQL)
                </label>
                <div className="relative">
                  <textarea
                    readOnly
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#016239] text-gray-900 bg-gray-50 font-mono text-sm"
                    value={formData.schema_sql}
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(formData.schema_sql)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      } catch (e) {
                        console.error('Copy failed', e)
                      }
                    }}
                    className="absolute right-3 top-3 rounded-lg bg-[#016239] hover:bg-[#014d2d] px-4 py-2 text-sm font-medium text-white transition-colors"
                  >
                    {copied ? '✓ Copied!' : 'Copy SQL'}
                  </button>
                </div>
                <div className="mt-3 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
                  <p className="text-sm text-amber-900">
                    <span className="font-semibold">⚠️ Important:</span> Execute this schema in your Supabase SQL Editor BEFORE adding the project. We will verify it returns a 200 status.
                  </p>
                </div>
              </div>
              <button
                type="submit"
                disabled={addLoading}
                className="w-full py-3 px-4 bg-[#016239] text-white font-medium rounded-xl hover:bg-[#014d2d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addLoading ? 'Testing Connection & Schema...' : 'Add Project'}
              </button>
            </form>
          </div>
         )}
        <div className="space-y-4">
          {configs.map((config) => (
            <div key={config.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#016239] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{config.projectName}</h3>
                      <p className="text-sm text-gray-500 font-mono">{config.supabaseUrl}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(config.id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Clock className="w-5 h-5 text-[#016239]" />
                <div>
                  <p className="text-xs font-medium text-gray-500">Last Pinged</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {config.lastPingedAt ? new Date(config.lastPingedAt).toLocaleString() : 'Never'}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-sm text-green-800">
                  <span className="font-semibold">✓ Active:</span> Automatically pinged every 24 hours
                </p>
              </div>
            </div>
          ))}

          {configs.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center">
              <FileCode className="w-10 h-10 text-[#016239] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">No Supabase projects yet</h3>
              <p className="text-sm text-gray-500 mt-2">Add your first Supabase project to enable scheduled pings.</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#016239] text-white rounded-lg hover:bg-[#014d2d]"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Project
                </button>
              </div>
            </div>
        )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 max-w-md">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-400 flex items-center justify-center mt-0.5">
              <span className="text-sm font-bold">!</span>
            </div>
            <p className="flex-1 text-sm">{toast}</p>
            <button
              onClick={() => setToast('')}
              className="flex-shrink-0 text-white hover:text-red-200 text-xl leading-none"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <LogOut className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Confirm Logout</h3>
                  <p className="text-sm text-gray-500 mt-1">Are you sure you want to logout?</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={cancelLogout}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 py-3 px-4 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
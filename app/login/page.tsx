'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Activity, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const message = urlParams.get('message')
      if (message) {
        setSuccess(message)
      }
    }
  }, [])

  const handleEmailContinue = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setStep(2)
      setError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        window.location.href = '/dashboard'
      } else {
        const data = await response.json()
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#016239] rounded-2xl mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to manage your Supabase projects</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
            step >= 1 ? 'bg-[#016239] text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            1
          </div>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
            step >= 2 ? 'bg-[#016239] text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            2
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleEmailContinue} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoFocus
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#016239] text-gray-900 transition-colors"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#016239] text-white font-medium rounded-xl hover:bg-[#014d2d] transition-colors"
              >
                Continue
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div>
                <label htmlFor="email-display" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600">
                  {email}
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoFocus
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#016239] text-gray-900 transition-colors"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-[#016239] text-white font-medium rounded-xl hover:bg-[#014d2d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          )}
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            New to Supabase Keeper?{' '}
            <Link href="/signup" className="font-medium text-[#016239] hover:text-[#014d2d]">
              Create an account →
            </Link>
          </p>
          <Link href="/" className="mt-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

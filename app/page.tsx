'use client'

import Link from 'next/link'
import { Activity, Shield, LayoutDashboard } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#016239] rounded-lg sm:rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">Supabase Keeper</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <a href="https://github.com/AayushPaigwar/supabase-keeper" target="_blank" rel="noopener noreferrer">
                <div className="hidden sm:inline-block px-3 py-1 bg-gray-50 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Star
                  </span>
                </div>
              </a>
              <div className="flex gap-2 sm:gap-3">
                <Link
                  href="/login"
                  className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 sm:px-6 py-2 text-sm font-medium text-white bg-[#016239] rounded-lg hover:bg-[#014d2d] transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-[#016239]/10 text-[#016239] font-semibold text-sm rounded-full">
              Keep Your Projects Alive, Effortlessly
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Never Lose Your <span className="text-[#016239]">Free Tier</span>
            <br />Supabase Projects
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto px-4">
            Automatically ping your Supabase projects every 24 hours to keep them
            alive and prevent pausing due to inactivity. <strong>100% Open Source, Free Forever.</strong>
          </p>
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-sm font-medium text-green-700">
              <Shield className="w-4 h-4" />
              <span>All data encrypted & secure</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link
              href="/signup"
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-white bg-[#016239] rounded-lg hover:bg-[#014d2d] transition-colors inline-flex items-center justify-center gap-2"
            >
              Get Started Free →
            </Link>
            <button className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Supabase Keeper?</h2>
            <p className="text-gray-600 px-4">Keep your Supabase free tier projects active without manual intervention</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#016239] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Automated Pings</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Automatically ping your Supabase projects every 24 hours to keep them
                active and prevent service pausing.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#016239] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Data is Encrypted</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                All your data is encrypted end-to-end with industry-standard security. JWT authentication, secure credential storage, and zero data access. Your Supabase keys are encrypted and never stored in plain text.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#016239] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4">
                <LayoutDashboard className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Easy Dashboard</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Manage multiple Supabase projects from a simple dashboard. Add,
                monitor, and remove projects with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 px-4">Get started in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#016239] text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Sign Up</h3>
              <p className="text-gray-600 text-sm sm:text-base">Create your free account in seconds</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#016239] text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Add Projects</h3>
              <p className="text-gray-600 text-sm sm:text-base">Connect your Supabase project URLs and keys</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#016239] text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Relax</h3>
              <p className="text-gray-600 text-sm sm:text-base">We'll keep your projects alive automatically</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#016239] rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Keep Your Projects Alive?</h2>
            <p className="text-base sm:text-lg mb-8 text-green-100 px-4">
              Join developers who never worry about inactive Supabase projects
            </p>
            <Link
              href="/signup"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-[#016239] bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Free →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#016239] rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">Supabase Keeper</span>
              </div>
              <p className="text-gray-600 text-sm">
                Keep your Supabase projects alive and healthy with automated monitoring.
                100% open source and free forever.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="https://github.com/AayushPaigwar/supabase-keeper" className="hover:text-[#016239] transition-colors">GitHub</a></li>
                <li><a href="https://supabase.com" className="hover:text-[#016239] transition-colors">Supabase</a></li>
                <li><a href="https://nextjs.org" className="hover:text-[#016239] transition-colors">Next.js</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">About</h3>
              <p className="text-gray-600 text-sm mb-4">
                Built with ❤️ by <a href="https://github.com/AayushPaigwar" className="text-[#016239] hover:underline font-medium">Aayush Paigwar</a>
              </p>
              <div className="flex gap-3 sm:gap-4">
                <a href="https://github.com/AayushPaigwar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#016239] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/aayush-paigwar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#016239] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/Aayush27_11" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#016239] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-600 text-sm">
              © 2025 Supabase Keeper. Made with ❤️ for developers by <a href="https://github.com/AayushPaigwar" className="text-[#016239] hover:underline font-medium">Aayush Paigwar</a>.
              <br />
              <span className="text-xs text-gray-500">100% Open Source & Free Forever</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

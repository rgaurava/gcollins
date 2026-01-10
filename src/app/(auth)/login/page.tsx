'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@gcollinsandsons.com')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Demo login - just redirect to dashboard
    if (email === 'admin@gcollinsandsons.com' && password === 'password') {
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
    } else {
      setError('Invalid email or password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f7f5]">
      {/* Navigation */}
      <nav className="bg-[#435060] text-white">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm tracking-widest uppercase hover:text-[#9f8762] transition-colors">
              &larr; Back to Home
            </Link>
            <div className="text-sm tracking-widest uppercase">
              Staff Login
            </div>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex min-h-[calc(100vh-52px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-10">
            <img
              src="/gcs/images/gcollins-logo.png"
              alt="G. Collins & Sons"
              className="mx-auto h-24 w-auto mb-6"
            />
            <h1 className="font-serif text-2xl text-[#435060] tracking-wide">
              Smart Platform
            </h1>
            <p className="text-[#666] text-sm mt-2">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-100">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[#435060]">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-slate-200 focus:border-[#9f8762] focus:ring-[#9f8762]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-[#435060]">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-slate-200 focus:border-[#9f8762] focus:ring-[#9f8762]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#435060] hover:bg-[#2d3a47] text-white py-6 text-sm tracking-widest uppercase"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Notice */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="bg-[#f8f7f5] p-4 rounded text-center">
                <p className="text-xs text-[#666] uppercase tracking-widest mb-2">Demo Credentials</p>
                <p className="text-sm text-[#435060]">
                  <span className="font-medium">Email:</span> admin@gcollinsandsons.com
                </p>
                <p className="text-sm text-[#435060]">
                  <span className="font-medium">Password:</span> password
                </p>
                <p className="text-xs text-[#9f8762] mt-3">
                  Credentials are pre-filled. Just click Sign In.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-[#666]">
            <p>G. Collins &amp; Sons &middot; Fine Jewellers Since 1985</p>
          </div>
        </div>
      </div>
    </div>
  )
}

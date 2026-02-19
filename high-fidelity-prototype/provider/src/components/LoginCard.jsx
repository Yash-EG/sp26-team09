import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginCard({ onClose, onSwitch }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)] w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-5 text-white/60 hover:text-white text-lg">✕</button>

        <h1 className="text-white font-bold text-3xl tracking-widest uppercase mb-2 text-center">Log In</h1>
        <p className="text-white/70 text-sm text-center mb-6">Welcome back to the scene</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white/80 text-sm font-bold mb-2 block">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400/40 placeholder-white/40"
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <label className="text-white/80 text-sm font-bold mb-2 block">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400/40 placeholder-white/40"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-all mt-6"
          >
            Log In
          </button>
        </form>

        <p className="text-white/70 text-sm text-center mt-6">
          Don't have an account?{' '}
          <button type="button" onClick={onSwitch} className="text-purple-400 hover:text-purple-300 font-bold">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}

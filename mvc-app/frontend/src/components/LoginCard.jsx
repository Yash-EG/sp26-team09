import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBandByEmail, getCustomerByEmail } from '../api'

export default function LoginCard({ onClose, onSwitch }) {
  const navigate = useNavigate()
  const [role, setRole] = useState('Band / Artist')
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (role === 'Band / Artist') {
        const band = await getBandByEmail(formData.email)
        if (band.passwordHash !== formData.password) {
          setError('Incorrect password.')
          return
        }
        localStorage.setItem('bandId', band.userId)
        localStorage.setItem('bandName', band.name)
        navigate('/dashboard')
      } else {
        const customer = await getCustomerByEmail(formData.email)
        if (customer.passwordHash !== formData.password) {
          setError('Incorrect password.')
          return
        }
        localStorage.setItem('customerId', customer.userId)
        localStorage.setItem('customerName', customer.name)
        navigate('/feed')
      }
    } catch {
      setError(`No ${role === 'Band / Artist' ? 'band' : 'customer'} account found with that email.`)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 dark:focus:border-purple-400/40 placeholder-gray-400 dark:placeholder-white/40'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative backdrop-blur-xl bg-white/80 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)] w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-5 text-gray-400 dark:text-white/60 hover:text-gray-900 dark:hover:text-white text-lg">✕</button>

        <h1 className="text-gray-900 dark:text-white font-bold text-3xl tracking-widest uppercase mb-2 text-center">Log In</h1>
        <p className="text-gray-500 dark:text-white/70 text-sm text-center mb-6">Welcome back to the scene</p>

        <div className="flex gap-3 mb-6">
          {['Band / Artist', 'Customer'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => { setRole(r); setError(null) }}
              className={`flex-1 py-2.5 rounded-full text-xs tracking-widest uppercase border transition-all ${
                role === r
                  ? 'bg-purple-600/60 border-purple-400/40 text-white'
                  : 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-700 dark:text-white/80 text-sm font-bold mb-2 block">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={inputClass}
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-white/80 text-sm font-bold mb-2 block">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className={inputClass}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="text-gray-500 dark:text-white/70 text-sm text-center mt-6">
          Don't have an account?{' '}
          <button type="button" onClick={onSwitch} className="text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 font-bold">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}

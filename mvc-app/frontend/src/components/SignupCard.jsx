import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBand, createCustomer } from '../api'
import CustomSelect from './CustomSelect'

export default function SignupCard({ onClose, onSwitch }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    bandName: '',
    genre: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!formData.role) {
      setError('Please select a role.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      if (formData.role === 'Band / Artist') {
        const band = await createBand({
          email: formData.email,
          passwordHash: formData.password,
          role: 'BAND',
          status: 'ACTIVE',
          name: formData.bandName,
          genre: formData.genre || null,
          contactName: formData.name || null,
        })
        localStorage.setItem('bandId', band.userId)
        localStorage.setItem('bandName', band.name)
        navigate('/dashboard')
      } else {
        const customer = await createCustomer({
          email: formData.email,
          passwordHash: formData.password,
          role: 'CUSTOMER',
          status: 'ACTIVE',
          name: formData.name,
        })
        localStorage.setItem('customerId', customer.userId)
        localStorage.setItem('customerName', customer.name)
        navigate('/feed')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 dark:focus:border-purple-400/40 placeholder-gray-400 dark:placeholder-white/40'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative backdrop-blur-xl bg-white/80 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)] w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-5 text-gray-400 dark:text-white/60 hover:text-gray-900 dark:hover:text-white text-lg">✕</button>

        <h1 className="text-gray-900 dark:text-white font-bold text-3xl tracking-widest uppercase mb-2 text-center">Sign Up</h1>
        <p className="text-gray-500 dark:text-white/70 text-sm text-center mb-6">Join the scene</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role selection */}
          <div>
            <label className="text-gray-700 dark:text-white/80 text-sm font-bold mb-3 block">I am a...</label>
            <div className="flex gap-3">
              {['Band / Artist', 'Customer'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setFormData({ ...formData, role })}
                  className={`flex-1 py-3 rounded-full text-xs tracking-widest uppercase border transition-all ${
                    formData.role === role
                      ? 'bg-purple-600/60 border-purple-400/40 text-white'
                      : 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-gray-700 dark:text-white/80 text-sm font-bold mb-2 block">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-white/80 text-sm font-bold mb-2 block">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
              placeholder="john@example.com"
              required
            />
          </div>

          {/* Band-specific fields */}
          {formData.role === 'Band / Artist' && (
            <>
              <div>
                <label className="text-gray-700 dark:text-white/80 text-sm font-bold mb-2 block">Band / Artist Name</label>
                <input
                  type="text"
                  value={formData.bandName}
                  onChange={(e) => setFormData({ ...formData, bandName: e.target.value })}
                  className={inputClass}
                  placeholder="The Midnight Echo"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 dark:text-white/80 text-sm font-bold mb-2 block">Genre</label>
                <CustomSelect
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  placeholder="Select a genre"
                  options={[
                    { value: 'rock',       label: 'Rock' },
                    { value: 'jazz',       label: 'Jazz' },
                    { value: 'hip-hop',    label: 'Hip-Hop' },
                    { value: 'r&b',        label: 'R&B' },
                    { value: 'country',    label: 'Country' },
                    { value: 'electronic', label: 'Electronic' },
                    { value: 'pop',        label: 'Pop' },
                    { value: 'other',      label: 'Other' },
                  ]}
                  className={inputClass}
                />
              </div>
            </>
          )}

          <div>
            <label className="text-gray-700 dark:text-white/80 text-sm font-bold mb-2 block">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={inputClass}
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-white/80 text-sm font-bold mb-2 block">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={inputClass}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-gray-500 dark:text-white/70 text-sm text-center mt-6">
          Already have an account?{' '}
          <button type="button" onClick={onSwitch} className="text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 font-bold">
            Log In
          </button>
        </p>
      </div>
    </div>
  )
}

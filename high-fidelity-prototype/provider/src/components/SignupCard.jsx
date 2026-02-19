import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  const inputClass = 'w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400/40 placeholder-white/40'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)] w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-5 text-white/60 hover:text-white text-lg">✕</button>

        <h1 className="text-white font-bold text-3xl tracking-widest uppercase mb-2 text-center">Sign Up</h1>
        <p className="text-white/70 text-sm text-center mb-6">Join the scene</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role selection */}
          <div>
            <label className="text-white/80 text-sm font-bold mb-3 block">I am a...</label>
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
            <label className="text-white/80 text-sm font-bold mb-2 block">Full Name</label>
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
            <label className="text-white/80 text-sm font-bold mb-2 block">Email</label>
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
                <label className="text-white/80 text-sm font-bold mb-2 block">Band / Artist Name</label>
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
                <label className="text-white/80 text-sm font-bold mb-2 block">Genre</label>
                <select
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  className={`${inputClass} appearance-none`}
                  required
                >
                  <option value="" disabled className="bg-gray-900">Select a genre</option>
                  <option value="rock" className="bg-gray-900">Rock</option>
                  <option value="jazz" className="bg-gray-900">Jazz</option>
                  <option value="hip-hop" className="bg-gray-900">Hip-Hop</option>
                  <option value="r&b" className="bg-gray-900">R&B</option>
                  <option value="country" className="bg-gray-900">Country</option>
                  <option value="electronic" className="bg-gray-900">Electronic</option>
                  <option value="pop" className="bg-gray-900">Pop</option>
                  <option value="other" className="bg-gray-900">Other</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="text-white/80 text-sm font-bold mb-2 block">Password</label>
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
            <label className="text-white/80 text-sm font-bold mb-2 block">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={inputClass}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-all mt-6"
          >
            Create Account
          </button>
        </form>

        <p className="text-white/70 text-sm text-center mt-6">
          Already have an account?{' '}
          <button type="button" onClick={onSwitch} className="text-purple-400 hover:text-purple-300 font-bold">
            Log In
          </button>
        </p>
      </div>
    </div>
  )
}

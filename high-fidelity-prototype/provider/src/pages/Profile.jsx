import { useState, useRef } from 'react'
import CloudLayer from '../components/CloudLayer'
import Navbar from '../components/Navbar'

const genres = [
  'Rock', 'Jazz', 'Hip-Hop', 'R&B', 'Country',
  'Electronic', 'Pop', 'Metal', 'Folk', 'Punk',
  'Indie', 'Blues', 'Classical', 'Other',
]

const inputClass =
  'w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400/40 placeholder-white/40 transition-colors'

const labelClass = 'text-white/80 text-sm font-bold mb-2 block tracking-wide'

function Section({ title, children }) {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
      <h2 className="text-white font-bold text-sm tracking-widest uppercase mb-5 pb-3 border-b border-white/10">
        {title}
      </h2>
      {children}
    </div>
  )
}

export default function Profile() {
  const fileInputRef = useRef(null)

  const [saved, setSaved] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(null)

  const [profile, setProfile] = useState({
    bandName: 'The Midnight Echo',
    contactName: 'Alex Rivera',
    email: 'alex@midnightecho.com',
    phone: '',
    location: 'Greensboro, NC',
    genre: 'Rock',
    subgenre: '',
    bio: 'We are a four-piece rock band based in Greensboro, NC. Drawing influences from classic and alternative rock, we deliver high-energy live performances.',
    website: '',
    instagram: '',
    spotify: '',
    soundcloud: '',
    setLength: '45',
    membersCount: '4',
    equipment: '',
    rate: '',
  })

  function handleChange(field) {
    return (e) => setProfile((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setAvatarPreview(url)
  }

  function handleSave(e) {
    e.preventDefault()
    // TODO: persist to backend
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="relative min-h-screen" style={{ background: '#08080f' }}>

      {/* Background layer */}
      <CloudLayer />

      {/* Content */}
      <div className="relative z-20">
        <Navbar />

        <div className="max-w-3xl mx-auto px-4 pt-28 pb-28">

          {/* ── Profile Header Card ── */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.12)] relative overflow-hidden">

            {/* Glow accent */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

              {/* Avatar upload */}
              <div className="relative flex-shrink-0">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-28 h-28 rounded-full bg-purple-600/20 border-2 border-purple-400/40 flex items-center justify-center cursor-pointer hover:bg-purple-600/30 transition-colors overflow-hidden group"
                >
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Band avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-purple-400 group-hover:text-purple-300 transition-colors">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-xs tracking-wider uppercase">Photo</span>
                    </div>
                  )}
                </div>
                {/* Small edit badge */}
                {avatarPreview && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center border-2 border-[#08080f] hover:bg-purple-500 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 0l.172.172a2 2 0 010 2.828L12 16H9v-3z" />
                    </svg>
                  </button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>

              {/* Band name + badge */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-white font-black text-3xl tracking-widest uppercase leading-tight">
                  {profile.bandName || 'Your Band'}
                </h1>
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                  <span className="bg-purple-600/40 border border-purple-400/30 text-purple-300 text-xs tracking-widest uppercase px-3 py-1 rounded-full">
                    {profile.genre}
                  </span>
                  <span className="text-white/40 text-sm">{profile.location}</span>
                </div>
                <p className="text-white/50 text-sm mt-3 leading-relaxed line-clamp-2">
                  {profile.bio || 'No bio yet — add one below.'}
                </p>
              </div>
            </div>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSave} className="space-y-6">

            {/* Basic Info */}
            <Section title="Basic Info">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Band / Artist Name</label>
                  <input
                    type="text"
                    value={profile.bandName}
                    onChange={handleChange('bandName')}
                    className={inputClass}
                    placeholder="The Midnight Echo"
                  />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={handleChange('location')}
                    className={inputClass}
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className={labelClass}>Genre</label>
                  <select
                    value={profile.genre}
                    onChange={handleChange('genre')}
                    className={`${inputClass} appearance-none`}
                  >
                    {genres.map((g) => (
                      <option key={g} value={g} className="bg-gray-900">{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Sub-genre / Style</label>
                  <input
                    type="text"
                    value={profile.subgenre}
                    onChange={handleChange('subgenre')}
                    className={inputClass}
                    placeholder="e.g. Indie Rock, Alt Country"
                  />
                </div>
                <div>
                  <label className={labelClass}>Number of Members</label>
                  <input
                    type="number"
                    min="1"
                    value={profile.membersCount}
                    onChange={handleChange('membersCount')}
                    className={inputClass}
                    placeholder="4"
                  />
                </div>
                <div>
                  <label className={labelClass}>Typical Set Length (mins)</label>
                  <input
                    type="number"
                    min="1"
                    value={profile.setLength}
                    onChange={handleChange('setLength')}
                    className={inputClass}
                    placeholder="45"
                  />
                </div>
              </div>
            </Section>

            {/* Bio */}
            <Section title="About / Bio">
              <label className={labelClass}>Tell venues about your act</label>
              <textarea
                rows={5}
                value={profile.bio}
                onChange={handleChange('bio')}
                className={`${inputClass} resize-none`}
                placeholder="Describe your sound, vibe, and what makes your live show special..."
              />
            </Section>

            {/* Contact & Booking */}
            <Section title="Contact & Booking">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Contact Name</label>
                  <input
                    type="text"
                    value={profile.contactName}
                    onChange={handleChange('contactName')}
                    className={inputClass}
                    placeholder="Your name or manager"
                  />
                </div>
                <div>
                  <label className={labelClass}>Booking Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={handleChange('email')}
                    className={inputClass}
                    placeholder="booking@yourband.com"
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone (optional)</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={handleChange('phone')}
                    className={inputClass}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className={labelClass}>Typical Rate / Night</label>
                  <input
                    type="text"
                    value={profile.rate}
                    onChange={handleChange('rate')}
                    className={inputClass}
                    placeholder="e.g. $500, Negotiable"
                  />
                </div>
              </div>
            </Section>

            {/* Equipment */}
            <Section title="Equipment & Tech Rider">
              <label className={labelClass}>What do you bring / need from the venue?</label>
              <textarea
                rows={4}
                value={profile.equipment}
                onChange={handleChange('equipment')}
                className={`${inputClass} resize-none`}
                placeholder="e.g. We bring our own backline. Need PA with front-of-house engineer, 4 monitor mixes, 2 DI boxes..."
              />
            </Section>

            {/* Social Links */}
            <Section title="Links & Social">
              <div className="space-y-4">
                {[
                  { field: 'website',   label: 'Website',   placeholder: 'https://yourband.com',           icon: 'M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 17.93V18a1 1 0 00-1-1H8a3 3 0 01-3-3v-1l-1.07-.56A8 8 0 0111 4.07V5a1 1 0 001 1h1a2 2 0 012 2v1a2 2 0 01-2 2h-1v2a1 1 0 001 1h2.93A8.003 8.003 0 0113 19.93z' },
                  { field: 'instagram', label: 'Instagram', placeholder: '@yourbandname',                  icon: 'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10A5 5 0 0012 7zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.5a1 1 0 110 2 1 1 0 010-2z' },
                  { field: 'spotify',   label: 'Spotify',   placeholder: 'Spotify artist link',            icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.65 14.65c-.2.2-.51.2-.71 0-1.96-1.2-4.43-1.47-7.34-.81-.28.07-.56-.1-.63-.38-.07-.28.1-.56.38-.63 3.18-.72 5.91-.41 8.1.93.2.2.2.51 0 .71zm1.23-2.75c-.25.25-.65.25-.9 0-2.24-1.38-5.66-1.78-8.31-.97-.33.1-.67-.09-.77-.42-.1-.33.09-.67.42-.77 3.02-.92 6.78-.47 9.35 1.1.25.25.25.65.01.9l.2.16zm.1-2.87c-.29.29-.75.29-1.04 0-2.61-1.55-6.92-1.69-9.41-.94-.38.12-.79-.1-.9-.49-.12-.38.1-.79.49-.9 2.86-.87 7.62-.7 10.6 1.08.29.29.29.75 0 1.04z' },
                  { field: 'soundcloud',label: 'SoundCloud',placeholder: 'SoundCloud profile link',        icon: 'M12 12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-8 4c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm3 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z' },
                ].map(({ field, label, placeholder, icon }) => (
                  <div key={field}>
                    <label className={labelClass}>{label}</label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/70" fill="currentColor" viewBox="0 0 24 24">
                        <path d={icon} />
                      </svg>
                      <input
                        type="text"
                        value={profile[field]}
                        onChange={handleChange(field)}
                        className={`${inputClass} pl-10`}
                        placeholder={placeholder}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Save Button */}
            <div className="flex items-center justify-end gap-4 pt-2">
              {saved && (
                <span className="text-green-400 text-sm tracking-widest uppercase flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Saved
                </span>
              )}
              <button
                type="submit"
                className="bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-8 py-3 rounded-full transition-all"
              >
                Save Profile
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

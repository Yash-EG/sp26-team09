import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CloudLayer from '../components/CloudLayer'
import Navbar from '../components/Navbar'
import CustomSelect from '../components/CustomSelect'
import { getBandById, updateBand, deleteBand, getCustomerById, updateCustomer, deleteCustomer, getAllGenres, updateCustomerGenres, getFollowedBands, unfollowBand, getAllShows } from '../api'

// ─── Provider (Band) Profile ─────────────────────────────────────────────────

const genres = [
  'Rock', 'Jazz', 'Hip-Hop', 'R&B', 'Country',
  'Electronic', 'Pop', 'Metal', 'Folk', 'Punk',
  'Indie', 'Blues', 'Classical', 'Other',
]

const inputClass =
  'w-full bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 dark:focus:border-purple-400/40 placeholder-gray-400 dark:placeholder-white/40 transition-colors'

const labelClass = 'text-gray-700 dark:text-white/80 text-sm font-bold mb-2 block tracking-wide'

function Section({ title, children }) {
  return (
    <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
      <h2 className="text-gray-900 dark:text-white font-bold text-sm tracking-widest uppercase mb-5 pb-3 border-b border-black/[0.06] dark:border-white/10">
        {title}
      </h2>
      {children}
    </div>
  )
}

function ProviderProfile() {
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(null)

  const [profile, setProfile] = useState({
    bandName: '', contactName: '', email: '', phone: '',
    genre: 'Rock', subgenre: '', bio: '', website: '',
    instagram: '', spotify: '', soundcloud: '',
    setLength: '', membersCount: '', equipment: '', rate: '',
  })

  useEffect(() => {
    const id = localStorage.getItem('bandId')
    if (!id) return
    getBandById(id).then((band) => {
      setProfile({
        bandName:     band.name          ?? '',
        contactName:  band.contactName   ?? '',
        email:        band.email         ?? '',
        phone:        band.phone         ?? '',
        genre:        band.genre         ?? 'Rock',
        subgenre:     band.subgenre      ?? '',
        bio:          band.bio           ?? '',
        website:      band.website       ?? '',
        instagram:    band.instagram     ?? '',
        spotify:      band.spotify       ?? '',
        soundcloud:   band.soundcloud    ?? '',
        setLength:    band.setLength     != null ? String(band.setLength)    : '',
        membersCount: band.membersCount  != null ? String(band.membersCount) : '',
        equipment:    band.equipment     ?? '',
        rate:         band.rate          != null ? String(band.rate)         : '',
      })
    }).catch(() => {})
  }, [])

  function handleChange(field) {
    return (e) => setProfile((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setAvatarPreview(URL.createObjectURL(file))
  }

  async function handleSave(e) {
    e.preventDefault()
    const id = localStorage.getItem('bandId')
    if (!id) { setError('Not logged in.'); return }
    setLoading(true)
    setError(null)
    try {
      await updateBand(id, {
        email:        profile.email        || null,
        name:         profile.bandName     || null,
        genre:        profile.genre        || null,
        subgenre:     profile.subgenre     || null,
        bio:          profile.bio          || null,
        contactName:  profile.contactName  || null,
        phone:        profile.phone        || null,
        setLength:    profile.setLength    ? parseInt(profile.setLength)                       : null,
        membersCount: profile.membersCount ? parseInt(profile.membersCount)                    : null,
        equipment:    profile.equipment    || null,
        rate:         profile.rate         ? parseFloat(profile.rate.replace(/[^0-9.]/g, '')) : null,
        website:      profile.website      || null,
        instagram:    profile.instagram    || null,
        spotify:      profile.spotify      || null,
        soundcloud:   profile.soundcloud   || null,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteAccount() {
    const id = localStorage.getItem('bandId')
    if (!id) return
    try {
      await deleteBand(id)
      localStorage.removeItem('bandId')
      localStorage.removeItem('bandName')
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <CloudLayer />
      <div className="relative z-20">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 pt-28 pb-28">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-8 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.12)] relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-xs tracking-wider uppercase">Photo</span>
                    </div>
                  )}
                </div>
                {avatarPreview && (
                  <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center border-2 border-[#08080f] hover:bg-purple-500 transition-colors">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 0l.172.172a2 2 0 010 2.828L12 16H9v-3z" />
                    </svg>
                  </button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-gray-900 dark:text-white font-black text-3xl tracking-widest uppercase leading-tight">{profile.bandName || 'Your Band'}</h1>
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                  <span className="bg-purple-600/40 border border-purple-400/30 text-purple-300 text-xs tracking-widest uppercase px-3 py-1 rounded-full">{profile.genre}</span>
                </div>
                <p className="text-gray-500 dark:text-white/50 text-sm mt-3 leading-relaxed line-clamp-2">{profile.bio || 'No bio yet — add one below.'}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <Section title="Basic Info">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>Band / Artist Name</label><input type="text" value={profile.bandName} onChange={handleChange('bandName')} className={inputClass} placeholder="The Midnight Echo" /></div>
                <div><label className={labelClass}>Location</label><input type="text" value={profile.location} onChange={handleChange('location')} className={inputClass} placeholder="City, State" /></div>
                <div><label className={labelClass}>Genre</label><CustomSelect value={profile.genre} onChange={handleChange('genre')} options={genres} className={inputClass} /></div>
                <div><label className={labelClass}>Sub-genre / Style</label><input type="text" value={profile.subgenre} onChange={handleChange('subgenre')} className={inputClass} placeholder="e.g. Indie Rock" /></div>
                <div><label className={labelClass}>Number of Members</label><input type="number" min="1" value={profile.membersCount} onChange={handleChange('membersCount')} className={inputClass} placeholder="4" /></div>
                <div><label className={labelClass}>Typical Set Length (mins)</label><input type="number" min="1" value={profile.setLength} onChange={handleChange('setLength')} className={inputClass} placeholder="45" /></div>
              </div>
            </Section>

            <Section title="About / Bio">
              <label className={labelClass}>Tell venues about your act</label>
              <textarea rows={5} value={profile.bio} onChange={handleChange('bio')} className={`${inputClass} resize-none`} placeholder="Describe your sound, vibe, and what makes your live show special..." />
            </Section>

            <Section title="Contact & Booking">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>Contact Name</label><input type="text" value={profile.contactName} onChange={handleChange('contactName')} className={inputClass} placeholder="Your name or manager" /></div>
                <div><label className={labelClass}>Booking Email</label><input type="email" value={profile.email} onChange={handleChange('email')} className={inputClass} placeholder="booking@yourband.com" /></div>
                <div><label className={labelClass}>Phone (optional)</label><input type="tel" value={profile.phone} onChange={handleChange('phone')} className={inputClass} placeholder="+1 (555) 000-0000" /></div>
                <div><label className={labelClass}>Typical Rate / Night</label><input type="text" value={profile.rate} onChange={handleChange('rate')} className={inputClass} placeholder="e.g. $500, Negotiable" /></div>
              </div>
            </Section>

            <Section title="Equipment & Tech Rider">
              <label className={labelClass}>What do you bring / need from the venue?</label>
              <textarea rows={4} value={profile.equipment} onChange={handleChange('equipment')} className={`${inputClass} resize-none`} placeholder="e.g. We bring our own backline. Need PA with front-of-house engineer..." />
            </Section>

            <Section title="Links & Social">
              <div className="space-y-4">
                {[
                  { field: 'website',    label: 'Website',    placeholder: 'https://yourband.com' },
                  { field: 'instagram',  label: 'Instagram',  placeholder: '@yourbandname' },
                  { field: 'spotify',    label: 'Spotify',    placeholder: 'Spotify artist link' },
                  { field: 'soundcloud', label: 'SoundCloud', placeholder: 'SoundCloud profile link' },
                ].map(({ field, label, placeholder }) => (
                  <div key={field}>
                    <label className={labelClass}>{label}</label>
                    <input type="text" value={profile[field]} onChange={handleChange(field)} className={inputClass} placeholder={placeholder} />
                  </div>
                ))}
              </div>
            </Section>

            <div className="flex flex-col items-end gap-3 pt-2">
              {error && <p className="text-red-500 text-sm tracking-wide">{error}</p>}
              <div className="flex items-center gap-4">
                {saved && <span className="text-green-400 text-sm tracking-widest uppercase">Saved</span>}
                <button type="submit" disabled={loading} className="bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-8 py-3 rounded-full transition-all disabled:opacity-50">
                  {loading ? 'Saving…' : 'Save Profile'}
                </button>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-red-950/20 border border-red-400/20 rounded-3xl p-6">
              <h2 className="text-red-400 font-bold text-sm tracking-widest uppercase mb-3">Danger Zone</h2>
              {!confirmDelete ? (
                <button type="button" onClick={() => setConfirmDelete(true)} className="bg-red-600/20 hover:bg-red-600/30 border border-red-400/30 text-red-400 text-sm tracking-widest uppercase px-6 py-2.5 rounded-full transition-all">
                  Delete Account
                </button>
              ) : (
                <div className="flex items-center gap-4 flex-wrap">
                  <p className="text-white/60 text-sm">This will permanently delete your account and all shows.</p>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setConfirmDelete(false)} className="text-white/50 hover:text-white text-sm tracking-widest uppercase transition-colors px-4 py-2">Cancel</button>
                    <button type="button" onClick={handleDeleteAccount} className="bg-red-600/60 hover:bg-red-600 border border-red-400/40 text-white text-sm tracking-widest uppercase px-6 py-2.5 rounded-full transition-all">Yes, Delete</button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// ─── Customer Profile ─────────────────────────────────────────────────────────

function CustomerProfile() {
  const customerId = localStorage.getItem('customerId')
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({ name: '', location: '', bio: '', profileImage: null })
  const [customer, setCustomer] = useState(null)
  const [allGenres, setAllGenres] = useState([])
  const [selectedGenreIds, setSelectedGenreIds] = useState([])
  const [followedBands, setFollowedBands] = useState([])
  const [recommendedShows, setRecommendedShows] = useState([])
  const [message, setMessage] = useState('')

  if (!customerId) {
    return <div className="text-white p-8">Customer is not logged in.</div>
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerData = await getCustomerById(customerId)
        setCustomer(customerData)
        setProfileData({
          name: customerData.name || '',
          location: customerData.location || '',
          bio: customerData.bio || '',
          profileImage: customerData.profilePictureUrl || null,
        })
        setSelectedGenreIds((customerData.preferredGenres || []).map((g) => g.genreId))

        const genresData = await getAllGenres()
        setAllGenres(genresData)

        const bandsData = await getFollowedBands(customerId)
        setFollowedBands(bandsData)

        const preferredNames = new Set((customerData.preferredGenres || []).map((g) => g.name))
        if (preferredNames.size > 0) {
          const allShows = await getAllShows()
          const today = new Date(); today.setHours(0, 0, 0, 0)
          const recs = allShows
            .filter((s) => preferredNames.has(s.genre) && new Date(s.date + 'T00:00:00') >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 6)
          setRecommendedShows(recs)
        }
      } catch (err) {
        console.error(err)
        setMessage('Failed to load profile data.')
      }
    }
    fetchData()
  }, [])

  const handleGenreToggle = (genreId) => {
    setSelectedGenreIds((prev) =>
      prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
    )
  }

  const handleRemoveBand = async (id) => {
    try {
      await unfollowBand(customerId, id)
      setFollowedBands(followedBands.filter((b) => b.userId !== id))
    } catch (err) {
      console.error(err)
      setMessage('Failed to unfollow band.')
    }
  }

  const handleSaveProfile = async () => {
    try {
      const profileResponse = await updateCustomer(customerId, {
        ...customer,
        name: profileData.name,
        location: profileData.location,
        bio: profileData.bio,
        profilePictureUrl: profileData.profileImage,
      })

      const fullyUpdated = await updateCustomerGenres(customerId, selectedGenreIds)

      setCustomer(fullyUpdated)
      setProfileData({
        name: fullyUpdated.name || '',
        location: fullyUpdated.location || '',
        bio: fullyUpdated.bio || '',
        profileImage: fullyUpdated.profilePictureUrl || null,
      })
      setSelectedGenreIds((fullyUpdated.preferredGenres || []).map((g) => g.genreId))
      setIsEditing(false)
      setMessage('Profile updated successfully.')
    } catch (err) {
      console.error(err)
      setMessage('Failed to update profile.')
    }
  }

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <CloudLayer />

      <div className="relative z-20">
        <Navbar />

        <div className="max-w-3xl mx-auto px-4 pt-28 pb-28">
          {/* Profile Header */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-8 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.12)] relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-start gap-6">
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 rounded-full border-4 border-purple-400/40 bg-gradient-to-br from-purple-100 dark:from-purple-900/40 to-blue-100 dark:to-blue-900/40 flex items-center justify-center overflow-hidden">
                  {profileData.profileImage ? (
                    <img src={profileData.profileImage} alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                  ) : (
                    <span className="text-gray-900 dark:text-white text-4xl font-bold">{profileData.name?.[0] || '?'}</span>
                  )}
                </div>
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <input type="text" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white font-bold text-2xl mb-2 px-3 py-1.5 rounded-lg focus:outline-none focus:border-purple-400" />
                ) : (
                  <h1 className="text-gray-900 dark:text-white font-black text-3xl tracking-wide mb-1">{profileData.name}</h1>
                )}
                {isEditing ? (
                  <>
                    <input type="text" value={profileData.location} onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      className="w-full bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white/70 text-sm mb-2 px-3 py-1.5 rounded-lg focus:outline-none focus:border-purple-400" placeholder="Location" />
                    <input type="text" value={profileData.profileImage || ''} onChange={(e) => setProfileData({ ...profileData, profileImage: e.target.value })}
                      className="w-full bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white/70 text-sm mb-3 px-3 py-1.5 rounded-lg focus:outline-none focus:border-purple-400" placeholder="Profile Image URL" />
                  </>
                ) : (
                  <p className="text-gray-500 dark:text-white/50 text-sm mb-4">Music Enthusiast • {profileData.location}</p>
                )}
                {isEditing ? (
                  <div className="flex gap-2">
                    <button onClick={handleSaveProfile}
                      className="bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-2 rounded-full transition-all">
                      Save
                    </button>
                    <button onClick={() => { setProfileData({ name: customer.name || '', location: customer.location || '', bio: customer.bio || '', profileImage: customer.profilePictureUrl || null }); setSelectedGenreIds((customer?.preferredGenres || []).map((g) => g.genreId)); setIsEditing(false) }}
                      className="bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 backdrop-blur-sm border border-black/[0.08] dark:border-white/20 text-gray-700 dark:text-white text-sm tracking-widest uppercase px-6 py-2 rounded-full transition-all">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setIsEditing(true)}
                    className="bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-2 rounded-full transition-all">
                    Edit Profile
                  </button>
                )}
                {message && <p className="text-gray-500 dark:text-white/60 text-sm mt-2">{message}</p>}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-6 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
            <h2 className="text-gray-900 dark:text-white font-bold text-sm tracking-widest uppercase mb-5 pb-3 border-b border-black/[0.06] dark:border-white/10">Bio</h2>
            {isEditing ? (
              <textarea value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                className="w-full bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white/80 text-sm leading-relaxed px-3 py-2 rounded-lg h-32 resize-none focus:outline-none focus:border-purple-400" />
            ) : (
              <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">{profileData.bio || 'No bio yet.'}</p>
            )}
          </div>

          {/* Preferred Genres */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-6 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
            <h2 className="text-gray-900 dark:text-white font-bold text-sm tracking-widest uppercase mb-5 pb-3 border-b border-black/[0.06] dark:border-white/10">Preferred Genres</h2>
            {isEditing ? (
              <div className="flex flex-wrap gap-3">
                {allGenres.map((genre) => {
                  const isSelected = selectedGenreIds.includes(genre.genreId)
                  return (
                    <label key={genre.genreId} className={`px-4 py-2 rounded-full border text-sm cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-600/60 border-purple-400/40 text-white'
                        : 'bg-black/5 dark:bg-white/10 border-black/[0.08] dark:border-white/20 text-gray-700 dark:text-white/80 hover:border-purple-400/40'
                    }`}>
                      <input type="checkbox" checked={isSelected} onChange={() => handleGenreToggle(genre.genreId)} className="hidden" />
                      {genre.name}
                    </label>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {(customer?.preferredGenres || []).length > 0 ? (
                  customer.preferredGenres.map((genre) => (
                    <span key={genre.genreId} className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 text-gray-700 dark:text-white/80 text-sm">{genre.name}</span>
                  ))
                ) : (
                  <p className="text-gray-400 dark:text-white/50 text-sm">No preferred genres selected.</p>
                )}
              </div>
            )}
          </div>

          {/* Followed Bands */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-6 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
            <h2 className="text-gray-900 dark:text-white font-bold text-sm tracking-widest uppercase mb-5 pb-3 border-b border-black/[0.06] dark:border-white/10">Followed Bands</h2>
            <div className="grid grid-cols-2 gap-4">
              {followedBands.length === 0 ? (
                <p className="text-gray-400 dark:text-white/50 text-sm col-span-2">Not following any bands yet.</p>
              ) : followedBands.map((band) => (
                <div key={band.userId} className="bg-black/5 dark:bg-white/5 border border-black/[0.06] dark:border-white/10 rounded-2xl p-4 hover:bg-black/[0.07] dark:hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-4">
                    <button onClick={() => navigate(`/band/${band.userId}`)} className="w-14 h-14 rounded-full overflow-hidden border-2 border-purple-400/40 flex-shrink-0 bg-purple-600/20 flex items-center justify-center hover:border-purple-400/70 transition-colors">
                      <span className="text-gray-900 dark:text-white text-xl font-bold">{band.name?.[0]}</span>
                    </button>
                    <button onClick={() => navigate(`/band/${band.userId}`)} className="flex-1 min-w-0 text-left hover:opacity-80 transition-opacity">
                      <h3 className="text-gray-900 dark:text-white font-bold text-sm truncate">{band.name}</h3>
                      <p className="text-purple-500 dark:text-purple-400 text-xs uppercase tracking-wide">{band.genre}</p>
                    </button>
                    <button onClick={() => handleRemoveBand(band.userId)}
                      className="bg-white/5 dark:bg-white/5 hover:bg-red-600/20 border border-black/[0.08] dark:border-white/10 hover:border-red-400/30 text-gray-500 dark:text-white/50 hover:text-red-400 text-xs tracking-widest uppercase px-3 py-1 rounded-full transition-all flex-shrink-0">
                      Unfollow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Shows */}
          {recommendedShows.length > 0 && (
            <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
              <h2 className="text-gray-900 dark:text-white font-bold text-sm tracking-widest uppercase mb-1 pb-3 border-b border-black/[0.06] dark:border-white/10">
                Recommended for You
              </h2>
              <p className="text-gray-400 dark:text-white/40 text-xs tracking-wide mb-5">Based on your preferred genres</p>
              <div className="space-y-3">
                {recommendedShows.map((show) => (
                  <div key={show.showId} className="flex items-center gap-4 bg-black/5 dark:bg-white/5 border border-black/[0.06] dark:border-white/10 rounded-2xl p-4 hover:bg-black/[0.07] dark:hover:bg-white/10 transition-all">
                    {show.image && (
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={show.image} alt={show.band?.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-gray-900 dark:text-white font-bold text-sm truncate">{show.band?.name}</span>
                        <span className="bg-purple-600/30 border border-purple-400/30 text-purple-300 text-xs tracking-widest uppercase px-2 py-0.5 rounded-full flex-shrink-0">{show.genre}</span>
                      </div>
                      <p className="text-gray-500 dark:text-white/50 text-xs truncate">{show.location} • {show.date}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/show/${show.showId}`)}
                      className="bg-purple-600/40 hover:bg-purple-600/70 border border-purple-400/30 text-purple-200 text-xs tracking-widest uppercase px-4 py-1.5 rounded-full transition-all flex-shrink-0"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Default export — role-based ─────────────────────────────────────────────

export default function Profile() {
  const isCustomer = !!localStorage.getItem('customerId')
  return isCustomer ? <CustomerProfile /> : <ProviderProfile />
}

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CloudLayer from '../components/CloudLayer'
import Navbar from '../components/Navbar'
import { getBandById, getShowsByBand, getFollowedBands, followBand, unfollowBand } from '../api'

function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  })
}

function formatTime(timeStr) {
  if (!timeStr) return ''
  const [h, m] = timeStr.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`
}

export default function BandPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const customerId = localStorage.getItem('customerId')

  const [band, setBand] = useState(null)
  const [shows, setShows] = useState([])
  const [isFollowing, setIsFollowing] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [bandData, showsData] = await Promise.all([
          getBandById(id),
          getShowsByBand(id),
        ])
        setBand(bandData)

        const today = new Date(); today.setHours(0, 0, 0, 0)
        const upcoming = showsData
          .filter((s) => new Date(s.date + 'T00:00:00') >= today && s.showStatus !== 'CANCELLED')
          .sort((a, b) => new Date(a.date) - new Date(b.date))
        setShows(upcoming)

        if (customerId) {
          const followed = await getFollowedBands(customerId)
          setIsFollowing(followed.some((b) => String(b.userId) === String(id)))
        }
      } catch (err) {
        setError(err.message)
      }
    }
    load()
  }, [id, customerId])

  const handleFollow = async () => {
    if (!customerId) return
    setFollowLoading(true)
    try {
      if (isFollowing) {
        await unfollowBand(customerId, id)
      } else {
        await followBand(customerId, id)
      }
      setIsFollowing((v) => !v)
    } catch (err) {
      console.error(err)
    } finally {
      setFollowLoading(false)
    }
  }

  if (error) return (
    <div className="relative min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <CloudLayer /><Navbar />
      <div className="pt-40 text-center text-red-400 text-sm tracking-widest uppercase">{error}</div>
    </div>
  )

  if (!band) return (
    <div className="relative min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <CloudLayer /><Navbar />
      <div className="pt-40 text-center text-gray-400 dark:text-white/30 text-sm tracking-widest uppercase">Loading…</div>
    </div>
  )

  const socials = [
    { label: 'Website',    href: band.website,    icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
    { label: 'Instagram',  href: band.instagram && (band.instagram.startsWith('http') ? band.instagram : `https://instagram.com/${band.instagram.replace('@', '')}`), icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M6.5 6.5a11 11 0 010 11M17.5 6.5a11 11 0 010 11' },
    { label: 'Spotify',    href: band.spotify,    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3' },
    { label: 'SoundCloud', href: band.soundcloud, icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3' },
  ].filter((s) => s.href)

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <CloudLayer />

      <div className="relative z-20">
        <Navbar />

        <div className="max-w-3xl mx-auto px-4 pt-28 pb-28">

          {/* Header card */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-8 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.12)] relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-purple-600/20 border-2 border-purple-400/40 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-4xl font-black">{band.name?.[0]}</span>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-gray-900 dark:text-white font-black text-3xl tracking-widest uppercase leading-tight mb-2">
                  {band.name}
                </h1>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                  <span className="bg-purple-600/40 border border-purple-400/30 text-purple-300 text-xs tracking-widest uppercase px-3 py-1 rounded-full">
                    {band.genre}
                  </span>
                  {band.subgenre && (
                    <span className="bg-white/10 border border-white/20 text-gray-500 dark:text-white/50 text-xs tracking-widest uppercase px-3 py-1 rounded-full">
                      {band.subgenre}
                    </span>
                  )}
                </div>

                {customerId && (
                  <button
                    onClick={handleFollow}
                    disabled={followLoading}
                    className={`text-sm tracking-widest uppercase px-6 py-2 rounded-full border transition-all disabled:opacity-50 ${
                      isFollowing
                        ? 'bg-purple-600/60 hover:bg-purple-600 border-purple-400/40 text-white'
                        : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border-black/[0.08] dark:border-white/20 text-gray-700 dark:text-white'
                    }`}
                  >
                    {isFollowing ? '✓ Following' : '+ Follow'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          {band.bio && (
            <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-6 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
              <h2 className="text-gray-900 dark:text-white font-bold text-sm tracking-widest uppercase mb-4 pb-3 border-b border-black/[0.06] dark:border-white/10">About</h2>
              <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">{band.bio}</p>
            </div>
          )}

          {/* Details grid */}
          {(band.membersCount || band.setLength || band.rate || band.equipment) && (
            <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-6 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
              <h2 className="text-gray-900 dark:text-white font-bold text-sm tracking-widest uppercase mb-4 pb-3 border-b border-black/[0.06] dark:border-white/10">Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {band.membersCount && (
                  <div className="bg-black/5 dark:bg-white/5 rounded-xl px-3 py-2.5">
                    <span className="text-gray-400 dark:text-white/40 text-xs tracking-widest uppercase block mb-1">Members</span>
                    <span className="text-gray-900 dark:text-white text-sm font-semibold">{band.membersCount}</span>
                  </div>
                )}
                {band.setLength && (
                  <div className="bg-black/5 dark:bg-white/5 rounded-xl px-3 py-2.5">
                    <span className="text-gray-400 dark:text-white/40 text-xs tracking-widest uppercase block mb-1">Set Length</span>
                    <span className="text-gray-900 dark:text-white text-sm font-semibold">{band.setLength} min</span>
                  </div>
                )}
                {band.rate && (
                  <div className="bg-black/5 dark:bg-white/5 rounded-xl px-3 py-2.5">
                    <span className="text-gray-400 dark:text-white/40 text-xs tracking-widest uppercase block mb-1">Rate</span>
                    <span className="text-gray-900 dark:text-white text-sm font-semibold">${band.rate}</span>
                  </div>
                )}
                {band.equipment && (
                  <div className="bg-black/5 dark:bg-white/5 rounded-xl px-3 py-2.5 sm:col-span-2">
                    <span className="text-gray-400 dark:text-white/40 text-xs tracking-widest uppercase block mb-1">Equipment</span>
                    <span className="text-gray-900 dark:text-white text-sm font-semibold leading-snug">{band.equipment}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Social links */}
          {socials.length > 0 && (
            <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-6 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
              <h2 className="text-gray-900 dark:text-white font-bold text-sm tracking-widest uppercase mb-4 pb-3 border-b border-black/[0.06] dark:border-white/10">Links</h2>
              <div className="flex flex-wrap gap-3">
                {socials.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black/5 dark:bg-white/5 hover:bg-purple-600/20 border border-black/[0.08] dark:border-white/10 hover:border-purple-400/30 text-gray-700 dark:text-white/70 hover:text-purple-400 text-xs tracking-widest uppercase px-4 py-2 rounded-full transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
                    </svg>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming shows */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
            <h2 className="text-gray-900 dark:text-white font-bold text-sm tracking-widest uppercase mb-4 pb-3 border-b border-black/[0.06] dark:border-white/10">
              Upcoming Shows
            </h2>
            {shows.length === 0 ? (
              <p className="text-gray-400 dark:text-white/40 text-sm tracking-widest uppercase">No upcoming shows.</p>
            ) : (
              <div className="space-y-3">
                {shows.map((show) => (
                  <div
                    key={show.showId}
                    className="flex items-center gap-4 bg-black/5 dark:bg-white/5 border border-black/[0.06] dark:border-white/10 rounded-2xl p-4 hover:bg-black/[0.07] dark:hover:bg-white/10 transition-all"
                  >
                    {show.image && (
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={show.image} alt={show.location} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-gray-900 dark:text-white font-bold text-sm truncate">{show.location}</span>
                        <span className="bg-purple-600/30 border border-purple-400/30 text-purple-300 text-xs tracking-widest uppercase px-2 py-0.5 rounded-full flex-shrink-0">{show.genre}</span>
                      </div>
                      <p className="text-gray-500 dark:text-white/50 text-xs">
                        {formatDate(show.date)}{show.showTime ? ` • ${formatTime(show.showTime)}` : ''}
                        {show.ticketPrice != null ? ` • $${show.ticketPrice}` : ''}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/show/${show.showId}`)}
                      className="bg-purple-600/40 hover:bg-purple-600/70 border border-purple-400/30 text-purple-200 text-xs tracking-widest uppercase px-4 py-1.5 rounded-full transition-all flex-shrink-0"
                    >
                      Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

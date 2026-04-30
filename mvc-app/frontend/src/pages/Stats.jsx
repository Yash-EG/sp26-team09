import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CloudLayer from '../components/CloudLayer'
import Navbar from '../components/Navbar'
import { getShowsByBand } from '../api'

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function daysUntil(dateStr) {
  const diff = new Date(dateStr + 'T00:00:00') - new Date().setHours(0, 0, 0, 0)
  return Math.ceil(diff / 86400000)
}

function StatCard({ label, value, sub }) {
  return (
    <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
      <div className="text-gray-400 dark:text-white/40 text-xs tracking-widest uppercase mb-2">{label}</div>
      <div className="text-gray-900 dark:text-white font-black text-3xl">{value}</div>
      {sub && <div className="text-gray-400 dark:text-white/40 text-xs mt-1">{sub}</div>}
    </div>
  )
}

export default function Stats() {
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)

  const bandName = localStorage.getItem('bandName') ?? 'Your Band'

  useEffect(() => {
    const id = localStorage.getItem('bandId')
    if (!id) { setLoading(false); return }
    getShowsByBand(id)
      .then(setShows)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const today = new Date(); today.setHours(0, 0, 0, 0)
  const upcoming = shows.filter(s => new Date(s.date + 'T00:00:00') >= today)
  const past     = shows.filter(s => new Date(s.date + 'T00:00:00') <  today)
  const nextShow = upcoming.sort((a, b) => new Date(a.date) - new Date(b.date))[0] ?? null

  const prices = shows.map(s => s.ticketPrice).filter(p => p != null && p > 0)
  const avgPrice = prices.length
    ? (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)
    : null

  const genreCounts = shows.reduce((acc, s) => {
    if (s.genre) acc[s.genre] = (acc[s.genre] ?? 0) + 1
    return acc
  }, {})
  const genresSorted = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])
  const topGenre = genresSorted[0]?.[0] ?? '—'

  const venueCount = new Set(shows.map(s => s.location).filter(Boolean)).size

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <CloudLayer />

      <div className="relative z-20">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 pt-28 pb-28 space-y-6">

          {/* Header */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.12)]">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
            <p className="text-purple-500 dark:text-purple-400 text-xs tracking-widest uppercase font-bold mb-1">Audience Statistics</p>
            <h1 className="text-gray-900 dark:text-white font-black text-3xl tracking-widest uppercase">{bandName}</h1>
            <p className="text-gray-400 dark:text-white/40 text-sm mt-2">Stats derived from your posted shows</p>
          </div>

          {/* Stat cards */}
          {loading ? (
            <div className="text-white/30 text-sm tracking-widest uppercase text-center py-16">Loading…</div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard label="Total Shows"    value={shows.length}    />
                <StatCard label="Upcoming"        value={upcoming.length} />
                <StatCard label="Past Shows"      value={past.length}     />
                <StatCard label="Venues Played"   value={venueCount}      />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <StatCard
                  label="Avg Ticket Price"
                  value={avgPrice ? `$${avgPrice}` : 'N/A'}
                  sub={avgPrice ? `across ${prices.length} paid show${prices.length !== 1 ? 's' : ''}` : 'No paid shows yet'}
                />
                <StatCard
                  label="Top Genre"
                  value={topGenre}
                  sub={genresSorted[0] ? `${genresSorted[0][1]} show${genresSorted[0][1] !== 1 ? 's' : ''}` : null}
                />
                <StatCard
                  label="Free Shows"
                  value={shows.filter(s => s.ticketPrice === 0 || s.ticketPrice == null).length}
                  sub="no ticket price set"
                />
              </div>

              {/* Next upcoming show */}
              <div className="backdrop-blur-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-400/40 rounded-3xl p-6 shadow-[0_0_50px_rgba(168,85,247,0.18)]">
                <p className="text-purple-500 dark:text-purple-400 text-xs tracking-widest uppercase font-bold mb-4">Next Upcoming Show</p>
                {nextShow ? (
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-gray-900 dark:text-white font-black text-xl tracking-widest uppercase">{nextShow.location}</h2>
                      <p className="text-gray-500 dark:text-white/50 text-sm mt-1">{formatDate(nextShow.date)}</p>
                      {nextShow.genre && (
                        <span className="inline-block mt-2 bg-purple-600/40 border border-purple-400/30 text-purple-300 text-xs tracking-widest uppercase px-3 py-1 rounded-full">
                          {nextShow.genre}
                        </span>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-gray-900 dark:text-white font-black text-4xl leading-none">{daysUntil(nextShow.date)}</div>
                      <div className="text-gray-400 dark:text-white/40 text-xs tracking-widest uppercase mt-1">days away</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-400 dark:text-white/40 text-sm mb-3">No upcoming shows</p>
                    <Link to="/feed" className="text-purple-400 hover:text-purple-300 text-xs tracking-widest uppercase transition-colors">
                      Post a Concert →
                    </Link>
                  </div>
                )}
              </div>

              {/* Genre breakdown */}
              {genresSorted.length > 0 && (
                <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
                  <h3 className="text-gray-900 dark:text-white font-bold text-sm tracking-widest uppercase mb-4 pb-3 border-b border-black/[0.06] dark:border-white/10">
                    Genre Breakdown
                  </h3>
                  <div className="space-y-3">
                    {genresSorted.map(([genre, count]) => (
                      <div key={genre} className="flex items-center gap-3">
                        <div className="w-24 text-gray-500 dark:text-white/60 text-sm">{genre}</div>
                        <div className="flex-1 bg-black/5 dark:bg-white/5 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-purple-500/70 h-2 rounded-full"
                            style={{ width: `${(count / shows.length) * 100}%` }}
                          />
                        </div>
                        <div className="text-gray-400 dark:text-white/40 text-xs w-8 text-right">{count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All shows list */}
              {shows.length > 0 && (
                <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
                  <h3 className="text-gray-900 dark:text-white font-bold text-sm tracking-widest uppercase mb-4 pb-3 border-b border-black/[0.06] dark:border-white/10">
                    All Shows
                  </h3>
                  <div className="space-y-2">
                    {[...shows].sort((a, b) => new Date(b.date) - new Date(a.date)).map(show => {
                      const isUpcoming = new Date(show.date + 'T00:00:00') >= today
                      return (
                        <div key={show.showId} className="flex items-center justify-between gap-4 py-2 border-b border-black/[0.04] dark:border-white/5 last:border-0">
                          <div>
                            <div className="text-gray-900 dark:text-white text-sm font-semibold">{show.location ?? '—'}</div>
                            <div className="text-gray-400 dark:text-white/40 text-xs">{formatDate(show.date)}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            {show.genre && (
                              <span className="text-purple-500 dark:text-purple-300 text-xs tracking-widest uppercase">{show.genre}</span>
                            )}
                            <span className={`text-xs tracking-widest uppercase px-2 py-0.5 rounded-full border ${
                              isUpcoming
                                ? 'bg-green-500/10 border-green-400/30 text-green-400'
                                : 'bg-white/5 border-white/10 text-white/30'
                            }`}>
                              {isUpcoming ? 'Upcoming' : 'Past'}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

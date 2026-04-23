import { useState, useRef, useEffect } from 'react'
import CloudLayer from '../components/CloudLayer'
import Navbar from '../components/Navbar'
import { getAllShows, createShow, updateShow, deleteShow } from '../api'

const inputClass =
  'w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400/40 placeholder-white/40 transition-colors'

const labelClass = 'text-white/80 text-sm font-bold mb-2 block tracking-wide'

const genres = [
  'Rock', 'Jazz', 'Hip-Hop', 'R&B', 'Country',
  'Electronic', 'Pop', 'Metal', 'Folk', 'Punk',
  'Indie', 'Blues', 'Classical', 'Other',
]

function showToPost(show) {
  return {
    id:             show.showId,
    bandId:         show.band?.userId                                    ?? null,
    bandName:       show.band?.name                                      ?? 'Unknown Band',
    genre:          show.genre                                           ?? '',
    venue:          show.location                                        ?? '',
    address:        show.venueAddress                                    ?? '',
    date:           show.date                                            ?? '',
    doorsTime:      show.doorsTime  ? show.doorsTime.substring(0, 5)    : '',
    time:           show.showTime   ? show.showTime.substring(0, 5)     : '',
    ticketPrice:    show.ticketPrice != null ? `$${show.ticketPrice}`   : 'TBA',
    ageRestriction: show.ageRestriction                                  ?? '',
    lineup:         show.lineup                                          ?? '',
    description:    show.description                                     ?? '',
    imageUrl:       show.image                                           ?? '',
    ticketUrl:      show.ticketUrl                                       ?? '',
    posterUrl:      show.image                                           ?? null,
    postedAt:       new Date().toISOString(),
    likes:          0,
    interested:     0,
  }
}

function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days}d ago`
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function formatTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`
}

function ConcertCard({ post, onDelete, onEdit, isOwn }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`backdrop-blur-xl border rounded-3xl overflow-hidden relative ${
      isOwn
        ? 'bg-purple-950/30 border-purple-400/50 shadow-[0_0_50px_rgba(168,85,247,0.20)]'
        : 'bg-white/10 border-white/20 shadow-[0_0_40px_rgba(168,85,247,0.08)]'
    }`}>
      <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none z-0 ${
        isOwn ? 'bg-purple-600/30' : 'bg-purple-600/15'
      }`} />

      {post.posterUrl && (
        <div className="w-full h-52 overflow-hidden">
          <img src={post.posterUrl} alt="Concert poster" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-black text-lg tracking-widest uppercase leading-tight">
                {post.bandName}
              </h3>
              {isOwn && (
                <span className="bg-purple-500/30 border border-purple-400/60 text-purple-300 text-xs tracking-widest uppercase px-2 py-0.5 rounded-full">
                  Your Show
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-purple-600/40 border border-purple-400/30 text-purple-300 text-xs tracking-widest uppercase px-3 py-0.5 rounded-full">
                {post.genre}
              </span>
              <span className="text-white/30 text-xs">{timeAgo(post.postedAt)}</span>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            {
              icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
              label: 'Venue',
              value: post.venue,
              sub: post.address || null,
            },
            {
              icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
              label: 'Date',
              value: formatDate(post.date),
            },
            {
              icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
              label: 'Time',
              value: formatTime(post.time),
            },
            {
              icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z',
              label: 'Tickets',
              value: post.ticketPrice,
            },
          ].map(({ icon, label, value, sub }) => (
            <div key={label} className="bg-white/5 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-3.5 h-3.5 text-purple-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
                </svg>
                <span className="text-white/40 text-xs tracking-widest uppercase">{label}</span>
              </div>
              <span className="text-white text-sm font-semibold">{value}</span>
              {sub && <p className="text-white/40 text-xs mt-0.5 leading-snug">{sub}</p>}
            </div>
          ))}
        </div>

        {post.description && (
          <p className="text-white/60 text-sm leading-relaxed mt-1">{post.description}</p>
        )}

        {/* Expanded details */}
        {expanded && (
          <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {post.doorsTime && (
                <div className="bg-white/5 rounded-xl px-3 py-2.5">
                  <div className="text-white/40 text-xs tracking-widest uppercase mb-1">Doors</div>
                  <div className="text-white text-sm font-semibold">{formatTime(post.doorsTime)}</div>
                </div>
              )}
              {post.ageRestriction && (
                <div className="bg-white/5 rounded-xl px-3 py-2.5">
                  <div className="text-white/40 text-xs tracking-widest uppercase mb-1">Age</div>
                  <div className="text-white text-sm font-semibold">{post.ageRestriction}</div>
                </div>
              )}
              {post.address && (
                <div className="bg-white/5 rounded-xl px-3 py-2.5">
                  <div className="text-white/40 text-xs tracking-widest uppercase mb-1">Address</div>
                  <div className="text-white text-sm font-semibold leading-snug">{post.address}</div>
                </div>
              )}
            </div>

            {post.lineup && (
              <div className="bg-white/5 rounded-xl px-3 py-2.5">
                <div className="text-white/40 text-xs tracking-widest uppercase mb-1">Lineup</div>
                <div className="text-white text-sm font-semibold">{post.lineup}</div>
              </div>
            )}

            {post.ticketUrl && (
              <a
                href={post.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/30 text-purple-300 text-xs tracking-widest uppercase px-4 py-2.5 rounded-full transition-all w-fit"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                Get Tickets
              </a>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-white/40 hover:text-purple-400 text-xs tracking-widest uppercase transition-colors"
          >
            {expanded ? 'Show Less' : 'Show More'}
            <svg className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            {(onEdit || onDelete) && (
              <>
                {onEdit && (
                  <button onClick={() => onEdit(post)} className="text-white/30 hover:text-purple-400 transition-colors" aria-label="Edit">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 0l.172.172a2 2 0 010 2.828L12 16H9v-3z" />
                    </svg>
                  </button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(post.id)} className="text-white/30 hover:text-red-400 transition-colors" aria-label="Delete">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function PostForm({ onSubmit, onCancel, initialData }) {
  const isEditing = !!initialData

  const [form, setForm] = useState({
    venue:          initialData?.venue          ?? '',
    address:        initialData?.address        ?? '',
    date:           initialData?.date           ?? '',
    doorsTime:      initialData?.doorsTime      ?? '',
    time:           initialData?.time           ?? '',
    ticketPrice:    initialData?.ticketPrice    ?? '',
    genre:          initialData?.genre          ?? 'Rock',
    ageRestriction: initialData?.ageRestriction ?? '',
    lineup:         initialData?.lineup         ?? '',
    description:    initialData?.description    ?? '',
    imageUrl:       initialData?.imageUrl       ?? '',
    ticketUrl:      initialData?.ticketUrl      ?? '',
  })

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.venue || !form.date || !form.time) return
    onSubmit(form)
  }

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-purple-400/30 rounded-3xl p-6 shadow-[0_0_60px_rgba(168,85,247,0.15)] relative overflow-hidden mb-6">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <h2 className="text-white font-bold text-sm tracking-widest uppercase mb-5 pb-3 border-b border-white/10">
        {isEditing ? 'Edit Concert' : 'Post a Concert'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Venue */}
          <div>
            <label className={labelClass}>Venue Name</label>
            <input type="text" value={form.venue} onChange={handleChange('venue')}
              className={inputClass} placeholder="e.g. Flat Iron, Carolina Theatre" required />
          </div>

          <div>
            <label className={labelClass}>Venue Address</label>
            <input type="text" value={form.address} onChange={handleChange('address')}
              className={inputClass} placeholder="e.g. 221 S Elm St, Greensboro, NC" />
          </div>

          {/* Date & Times */}
          <div>
            <label className={labelClass}>Date</label>
            <input type="date" value={form.date} onChange={handleChange('date')}
              className={`${inputClass} [color-scheme:dark]`} required />
          </div>

          <div>
            <label className={labelClass}>Doors Time</label>
            <input type="time" value={form.doorsTime} onChange={handleChange('doorsTime')}
              className={`${inputClass} [color-scheme:dark]`} />
          </div>

          <div>
            <label className={labelClass}>Show Time</label>
            <input type="time" value={form.time} onChange={handleChange('time')}
              className={`${inputClass} [color-scheme:dark]`} required />
          </div>

          {/* Ticket Price & Genre */}
          <div>
            <label className={labelClass}>Ticket Price</label>
            <input type="text" value={form.ticketPrice} onChange={handleChange('ticketPrice')}
              className={inputClass} placeholder="e.g. 15, 0 for Free" />
          </div>

          <div>
            <label className={labelClass}>Genre</label>
            <select value={form.genre} onChange={handleChange('genre')}
              className={`${inputClass} appearance-none`}>
              {genres.map((g) => (
                <option key={g} value={g} className="bg-gray-900">{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Age Restriction</label>
            <select value={form.ageRestriction} onChange={handleChange('ageRestriction')}
              className={`${inputClass} appearance-none`}>
              <option value="" className="bg-gray-900">None</option>
              <option value="All Ages" className="bg-gray-900">All Ages</option>
              <option value="18+" className="bg-gray-900">18+</option>
              <option value="21+" className="bg-gray-900">21+</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className={labelClass}>Poster / Image URL (optional)</label>
            <input type="text" value={form.imageUrl} onChange={handleChange('imageUrl')}
              className={inputClass} placeholder="https://..." />
          </div>

          <div>
            <label className={labelClass}>Ticket URL (optional)</label>
            <input type="text" value={form.ticketUrl} onChange={handleChange('ticketUrl')}
              className={inputClass} placeholder="https://..." />
          </div>

          {/* Lineup */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Lineup (optional)</label>
            <input type="text" value={form.lineup} onChange={handleChange('lineup')}
              className={inputClass} placeholder="e.g. Band A, Band B, Opening Act" />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Description (optional)</label>
            <textarea rows={3} value={form.description} onChange={handleChange('description')}
              className={`${inputClass} resize-none`}
              placeholder="What should fans and venues know about this show?" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="text-white/50 hover:text-white text-sm tracking-widest uppercase transition-colors px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-8 py-3 rounded-full transition-all"
          >
            {isEditing ? 'Save Changes' : 'Post Concert'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [posted, setPosted] = useState(false)
  const [saved, setSaved] = useState(false)
  const [genreFilter, setGenreFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  const MY_BAND_ID = parseInt(localStorage.getItem('bandId') ?? '10')

  useEffect(() => {
    getAllShows()
      .then((shows) => setPosts(shows.map(showToPost)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const filteredPosts = posts.filter((post) => {
    if (genreFilter !== 'all' && post.genre !== genreFilter) return false
    if (dateFilter === 'my-shows') return post.bandId === MY_BAND_ID
    const postDate = new Date(post.date + 'T00:00:00')
    if (dateFilter === 'upcoming') return postDate >= today
    if (dateFilter === 'this-week') {
      const limit = new Date(today); limit.setDate(limit.getDate() + 7)
      return postDate >= today && postDate <= limit
    }
    if (dateFilter === 'this-month') {
      const limit = new Date(today); limit.setDate(limit.getDate() + 30)
      return postDate >= today && postDate <= limit
    }
    return true
  })

  function buildShowPayload(form) {
    const price = parseFloat(form.ticketPrice?.replace(/[^0-9.]/g, ''))
    return {
      band:           { userId: MY_BAND_ID },
      location:       form.venue                           || null,
      venueAddress:   form.address                         || null,
      date:           form.date                            || null,
      doorsTime:      form.doorsTime  ? `${form.doorsTime}:00`  : null,
      showTime:       form.time       ? `${form.time}:00`       : null,
      ticketPrice:    isNaN(price)    ? null                    : price,
      genre:          form.genre                           || null,
      ageRestriction: form.ageRestriction                  || null,
      lineup:         form.lineup                          || null,
      description:    form.description                     || null,
      image:          form.imageUrl                        || null,
      ticketUrl:      form.ticketUrl                       || null,
      showStatus:     'UPCOMING',
    }
  }

  async function handlePost(form) {
    setSubmitting(true)
    setError(null)
    try {
      const created = await createShow(buildShowPayload(form))
      created.band = { ...created.band, name: localStorage.getItem('bandName') }
      setPosts((prev) => [showToPost(created), ...prev])
      setShowForm(false)
      setPosted(true)
      setTimeout(() => setPosted(false), 2500)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  function handleEdit(post) {
    setEditingPost(post)
    setShowForm(false)
  }

  async function handleSaveEdit(form) {
    setSubmitting(true)
    setError(null)
    try {
      const updated = await updateShow(editingPost.id, buildShowPayload(form))
      setPosts((prev) => prev.map((p) => p.id === editingPost.id ? showToPost(updated) : p))
      setEditingPost(null)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteShow(id)
      setPosts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const isFormOpen = showForm || !!editingPost

  return (
    <div className="relative min-h-screen" style={{ background: '#08080f' }}>
      <CloudLayer />

      <div className="relative z-20">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 pt-28 pb-28">
          <div className="flex gap-8">

            {/* ── Left sidebar (desktop only) ── */}
            <aside className="w-64 flex-shrink-0 sticky top-28 self-start hidden lg:block">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6">
                <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-4">Filters</h3>

                <div className="mb-4">
                  <label className="text-white/60 text-xs uppercase tracking-widest mb-2 block">Genre</label>
                  <select
                    value={genreFilter}
                    onChange={(e) => setGenreFilter(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-purple-400/40 [color-scheme:dark]"
                  >
                    <option value="all">All Genres</option>
                    {genres.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-white/60 text-xs uppercase tracking-widest mb-2 block">When</label>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-purple-400/40 [color-scheme:dark]"
                  >
                    <option value="all">All Shows</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="this-week">This Week</option>
                    <option value="this-month">This Month</option>
                    <option value="my-shows">My Shows</option>
                  </select>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Your Stats</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Shows Posted</span>
                      <span className="text-white font-bold">
                        {posts.filter((p) => p.bandId === MY_BAND_ID).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Total Interested</span>
                      <span className="text-white font-bold">
                        {posts
                          .filter((p) => p.bandId === MY_BAND_ID)
                          .reduce((sum, p) => sum + (p.interested || 0), 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Main feed ── */}
            <main className="flex-1 min-w-0">

              {/* Page header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-white font-black text-2xl tracking-widest uppercase">Concert Feed</h1>
                  <p className="text-white/40 text-sm mt-1">Announce your upcoming shows</p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  {error && (
                    <span className="text-red-400 text-sm tracking-wide">{error}</span>
                  )}
                  {(posted || saved) && (
                    <span className="text-green-400 text-sm tracking-widest uppercase flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {saved ? 'Saved' : 'Posted'}
                    </span>
                  )}
                  {!isFormOpen && (
                    <button
                      onClick={() => setShowForm(true)}
                      disabled={submitting}
                      className="bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Post Concert
                    </button>
                  )}
                </div>
              </div>

              {/* New post form */}
              {showForm && (
                <PostForm onSubmit={handlePost} onCancel={() => setShowForm(false)} />
              )}

              {/* Edit form */}
              {editingPost && (
                <PostForm
                  initialData={editingPost}
                  onSubmit={handleSaveEdit}
                  onCancel={() => setEditingPost(null)}
                />
              )}

              {/* Mobile-only pill filters */}
              <div className="flex items-center gap-3 mb-6 lg:hidden">
                <select
                  value={genreFilter}
                  onChange={(e) => setGenreFilter(e.target.value)}
                  className="bg-white/10 border border-white/20 text-white text-sm px-4 py-2 rounded-full focus:outline-none focus:border-purple-400/40 [color-scheme:dark]"
                >
                  <option value="all">All Genres</option>
                  {genres.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="bg-white/10 border border-white/20 text-white text-sm px-4 py-2 rounded-full focus:outline-none focus:border-purple-400/40 [color-scheme:dark]"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="this-week">This Week</option>
                  <option value="this-month">This Month</option>
                </select>
              </div>

              {/* Feed list */}
              {loading ? (
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-16 text-center">
                  <p className="text-white/30 text-sm tracking-widest uppercase">Loading shows…</p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-16 text-center">
                  <svg className="w-12 h-12 text-white/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <p className="text-white/30 text-sm tracking-widest uppercase">
                    {posts.length === 0 ? 'No concerts posted yet' : 'No concerts match these filters'}
                  </p>
                  {posts.length === 0 && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="mt-4 text-purple-400 hover:text-purple-300 text-sm tracking-widest uppercase transition-colors"
                    >
                      Post your first show
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <ConcertCard
                      key={post.id}
                      post={post}
                      isOwn={post.bandId === MY_BAND_ID}
                      onEdit={post.bandId === MY_BAND_ID ? handleEdit : null}
                      onDelete={post.bandId === MY_BAND_ID ? handleDelete : null}
                    />
                  ))}
                </div>
              )}

            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

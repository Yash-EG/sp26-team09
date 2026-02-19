import { useState, useRef } from 'react'
import CloudLayer from '../components/CloudLayer'
import Navbar from '../components/Navbar'
import band1Img from '../assets/band1.jpeg'
import band2Img from '../assets/band2.jpeg'
import band3Img from '../assets/band3.webp'

const inputClass =
  'w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400/40 placeholder-white/40 transition-colors'

const labelClass = 'text-white/80 text-sm font-bold mb-2 block tracking-wide'

const genres = [
  'Rock', 'Jazz', 'Hip-Hop', 'R&B', 'Country',
  'Electronic', 'Pop', 'Metal', 'Folk', 'Punk',
  'Indie', 'Blues', 'Classical', 'Other',
]

const MOCK_POSTS = [
  {
    id: 1,
    bandName: 'The Midnight Echo',
    genre: 'Rock',
    venue: 'Flat Iron',
    address: '221 S Elm St, Greensboro, NC 27401',
    date: '2026-03-14',
    time: '20:00',
    ticketPrice: '$15',
    description: 'High-energy rock set to kick off St. Patrick\'s Day weekend. Expect 90 minutes of original material and some classic covers.',
    postedAt: '2026-02-18T10:30:00',
    likes: 42,
    interested: 87,
    posterUrl: band1Img,
  },
  {
    id: 2,
    bandName: 'Velvet Static',
    genre: 'Indie',
    venue: 'Carolina Theatre',
    address: '310 S Greene St, Greensboro, NC 27401',
    date: '2026-03-21',
    time: '19:30',
    ticketPrice: '$20',
    description: 'Album release show for our debut LP "Signal & Noise". Full production with lights and a very special guest opener.',
    postedAt: '2026-02-17T15:00:00',
    likes: 42,
    interested: 87,
    posterUrl: band2Img,
  },
  {
    id: 3,
    bandName: 'Desert Lung',
    genre: 'Electronic',
    venue: 'Hangar 1819',
    address: '1819 Yanceyville St, Greensboro, NC 27405',
    date: '2026-04-05',
    time: '22:00',
    ticketPrice: 'Free',
    description: 'Late-night ambient/electronic set. Come decompress with us.',
    postedAt: '2026-02-15T09:15:00',
    likes: 42,
    interested: 87,
    posterUrl: band3Img,
  },
]

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

          {(onEdit || onDelete) && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {onEdit && (
                <button
                  onClick={() => onEdit(post)}
                  className="text-white/30 hover:text-purple-400 transition-colors"
                  aria-label="Edit post"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 0l.172.172a2 2 0 010 2.828L12 16H9v-3z" />
                  </svg>
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(post.id)}
                  className="text-white/30 hover:text-red-400 transition-colors"
                  aria-label="Delete post"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          )}
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
          <p className="text-white/60 text-sm leading-relaxed">{post.description}</p>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-white/50 hover:text-purple-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-xs tracking-widest uppercase">{post.likes || 0}</span>
            </button>

            <div className="flex items-center gap-1.5 text-white/50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs tracking-widest uppercase">{post.interested || 0} interested</span>
            </div>
          </div>

          <button className="text-white/30 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function PostForm({ onSubmit, onCancel, initialData }) {
  const isEditing = !!initialData
  const posterInputRef = useRef(null)

  const [form, setForm] = useState({
    venue:       initialData?.venue       ?? '',
    address:     initialData?.address     ?? '',
    date:        initialData?.date        ?? '',
    time:        initialData?.time        ?? '',
    ticketPrice: initialData?.ticketPrice ?? '',
    genre:       initialData?.genre       ?? 'Rock',
    description: initialData?.description ?? '',
    posterUrl:   initialData?.posterUrl   ?? null,
  })

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handlePosterChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setForm((prev) => ({ ...prev, posterUrl: URL.createObjectURL(file) }))
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

          {/* Poster upload */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Concert Poster (optional)</label>
            <div
              onClick={() => posterInputRef.current?.click()}
              className="w-full h-40 rounded-xl border border-dashed border-white/20 bg-white/5 hover:bg-white/10 hover:border-purple-400/40 cursor-pointer transition-all flex items-center justify-center overflow-hidden"
            >
              {form.posterUrl ? (
                <img src={form.posterUrl} alt="Poster preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-white/30 hover:text-white/50 transition-colors pointer-events-none">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs tracking-widest uppercase">Click to upload poster</span>
                </div>
              )}
            </div>
            {form.posterUrl && (
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, posterUrl: null }))}
                className="mt-2 text-white/30 hover:text-red-400 text-xs tracking-widest uppercase transition-colors"
              >
                Remove poster
              </button>
            )}
            <input
              ref={posterInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePosterChange}
            />
          </div>

          <div>
            <label className={labelClass}>Venue Name</label>
            <input
              type="text"
              value={form.venue}
              onChange={handleChange('venue')}
              className={inputClass}
              placeholder="e.g. Flat Iron, Carolina Theatre"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Venue Address</label>
            <input
              type="text"
              value={form.address}
              onChange={handleChange('address')}
              className={inputClass}
              placeholder="e.g. 221 S Elm St, Greensboro, NC"
            />
          </div>

          <div>
            <label className={labelClass}>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={handleChange('date')}
              className={`${inputClass} [color-scheme:dark]`}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Start Time</label>
            <input
              type="time"
              value={form.time}
              onChange={handleChange('time')}
              className={`${inputClass} [color-scheme:dark]`}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Ticket Price</label>
            <input
              type="text"
              value={form.ticketPrice}
              onChange={handleChange('ticketPrice')}
              className={inputClass}
              placeholder="e.g. $15, Free, Donation"
            />
          </div>

          <div>
            <label className={labelClass}>Genre</label>
            <select
              value={form.genre}
              onChange={handleChange('genre')}
              className={`${inputClass} appearance-none`}
            >
              {genres.map((g) => (
                <option key={g} value={g} className="bg-gray-900">{g}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Description (optional)</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={handleChange('description')}
              className={`${inputClass} resize-none`}
              placeholder="What should fans and venues know about this show?"
            />
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
  const [posts, setPosts] = useState(MOCK_POSTS)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [posted, setPosted] = useState(false)
  const [saved, setSaved] = useState(false)
  const [genreFilter, setGenreFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('upcoming')

  const MY_BAND = 'The Midnight Echo' // TODO: pull from auth context

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const filteredPosts = posts.filter((post) => {
    if (genreFilter !== 'all' && post.genre !== genreFilter) return false
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

  function handlePost(form) {
    const newPost = {
      id: Date.now(),
      bandName: MY_BAND,
      genre: form.genre,
      venue: form.venue,
      address: form.address || '',
      date: form.date,
      time: form.time,
      ticketPrice: form.ticketPrice || 'TBA',
      description: form.description,
      posterUrl: form.posterUrl || null,
      postedAt: new Date().toISOString(),
      likes: 0,
      interested: 0,
    }
    setPosts((prev) => [newPost, ...prev])
    setShowForm(false)
    setPosted(true)
    setTimeout(() => setPosted(false), 2500)
  }

  function handleEdit(post) {
    setEditingPost(post)
    setShowForm(false)
  }

  function handleSaveEdit(form) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === editingPost.id
          ? { ...p, ...form, ticketPrice: form.ticketPrice || 'TBA' }
          : p
      )
    )
    setEditingPost(null)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleDelete(id) {
    setPosts((prev) => prev.filter((p) => p.id !== id))
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
                    <option value="upcoming">Upcoming</option>
                    <option value="this-week">This Week</option>
                    <option value="this-month">This Month</option>
                  </select>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Your Stats</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Shows Posted</span>
                      <span className="text-white font-bold">
                        {posts.filter((p) => p.bandName === MY_BAND).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Total Interested</span>
                      <span className="text-white font-bold">
                        {posts
                          .filter((p) => p.bandName === MY_BAND)
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
                      className="bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-all flex items-center gap-2"
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
              {filteredPosts.length === 0 ? (
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
                      isOwn={post.bandName === MY_BAND}
                      onEdit={post.bandName === MY_BAND ? handleEdit : null}
                      onDelete={post.bandName === MY_BAND ? handleDelete : null}
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

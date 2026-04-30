import { useState, useEffect } from 'react'
import CloudLayer from '../components/CloudLayer'
import Navbar from '../components/Navbar'
import { getAllPosts, createPost, deletePost } from '../api'

function timeAgo(isoString) {
  if (!isoString) return ''
  const diff = Date.now() - new Date(isoString).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins < 1)   return 'Just now'
  if (mins < 60)  return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days === 1) return 'Yesterday'
  return `${days}d ago`
}

function PostCard({ post, isOwn, onDelete }) {
  return (
    <div className={`backdrop-blur-xl border rounded-3xl overflow-hidden ${
      isOwn
        ? 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-400/40'
        : 'bg-white/70 dark:bg-white/10 border-black/[0.08] dark:border-white/20'
    }`}>
      {post.imageUrl && (
        <div className="w-full aspect-square overflow-hidden">
          <img src={post.imageUrl} alt="Post" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-gray-900 dark:text-white font-black text-sm tracking-widest uppercase">
              {post.band?.name ?? 'Unknown Band'}
            </p>
            <p className="text-gray-400 dark:text-white/30 text-xs mt-0.5 tracking-widest uppercase">
              {timeAgo(post.createdAt)}
            </p>
          </div>
          {isOwn && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="bg-purple-500/30 border border-purple-400/60 text-purple-400 text-xs tracking-widest uppercase px-2 py-0.5 rounded-full">
                Your Post
              </span>
              <button
                onClick={() => onDelete(post.postId)}
                className="text-gray-300 dark:text-white/30 hover:text-red-400 transition-colors"
                aria-label="Delete post"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {post.caption && (
          <p className="text-gray-700 dark:text-white/70 text-sm leading-relaxed">{post.caption}</p>
        )}
      </div>
    </div>
  )
}

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [posted, setPosted] = useState(false)
  const [form, setForm] = useState({ caption: '', imageUrl: '' })

  const MY_BAND_ID = parseInt(localStorage.getItem('bandId') ?? '0')
  const bandName   = localStorage.getItem('bandName') ?? 'Your Band'

  useEffect(() => {
    getAllPosts()
      .then(data => setPosts([...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handlePost(e) {
    e.preventDefault()
    if (!form.caption && !form.imageUrl) return
    setSubmitting(true)
    setError(null)
    try {
      const created = await createPost({
        band: { userId: MY_BAND_ID },
        caption: form.caption || null,
        imageUrl: form.imageUrl || null,
      })
      created.band = { ...created.band, name: bandName }
      setPosts(prev => [created, ...prev])
      setForm({ caption: '', imageUrl: '' })
      setShowForm(false)
      setPosted(true)
      setTimeout(() => setPosted(false), 2500)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    try {
      await deletePost(id)
      setPosts(prev => prev.filter(p => p.postId !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const inputClass = 'w-full bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 dark:focus:border-purple-400/40 placeholder-gray-400 dark:placeholder-white/40 transition-colors'

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <CloudLayer />

      <div className="relative z-20">
        <Navbar />

        <div className="max-w-2xl mx-auto px-4 pt-28 pb-28">

          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-gray-900 dark:text-white font-black text-2xl tracking-widest uppercase">Posts</h1>
              <p className="text-gray-400 dark:text-white/40 text-sm mt-1">Share moments with your audience</p>
            </div>
            <div className="flex items-center gap-4">
              {error && <span className="text-red-500 text-sm">{error}</span>}
              {posted && (
                <span className="text-green-500 dark:text-green-400 text-sm tracking-widest uppercase flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Posted
                </span>
              )}
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-purple-600/60 hover:bg-purple-600 border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New Post
                </button>
              )}
            </div>
          </div>

          {/* Post form */}
          {showForm && (
            <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-purple-300/50 dark:border-purple-400/30 rounded-3xl p-6 mb-6 shadow-[0_0_60px_rgba(168,85,247,0.15)]">
              <h2 className="text-gray-900 dark:text-white font-bold text-sm tracking-widest uppercase mb-5 pb-3 border-b border-black/[0.06] dark:border-white/10">
                New Post
              </h2>
              <form onSubmit={handlePost} className="space-y-4">
                <div>
                  <label className="text-gray-700 dark:text-white/80 text-sm font-bold mb-2 block">Image URL (optional)</label>
                  <input
                    type="text"
                    value={form.imageUrl}
                    onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                    className={inputClass}
                    placeholder="https://..."
                  />
                </div>
                {form.imageUrl && (
                  <div className="w-full aspect-square rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5">
                    <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                  </div>
                )}
                <div>
                  <label className="text-gray-700 dark:text-white/80 text-sm font-bold mb-2 block">Caption</label>
                  <textarea
                    rows={4}
                    value={form.caption}
                    onChange={e => setForm(f => ({ ...f, caption: e.target.value }))}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell your audience about the show, the vibe, anything..."
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setForm({ caption: '', imageUrl: '' }) }}
                    className="text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white text-sm tracking-widest uppercase transition-colors px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || (!form.caption && !form.imageUrl)}
                    className="bg-purple-600/60 hover:bg-purple-600 border border-purple-400/40 text-white text-sm tracking-widest uppercase px-8 py-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Posting…' : 'Post'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Feed */}
          {loading ? (
            <div className="bg-black/5 dark:bg-white/5 border border-black/[0.06] dark:border-white/10 rounded-3xl p-16 text-center">
              <p className="text-gray-400 dark:text-white/30 text-sm tracking-widest uppercase">Loading posts…</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-black/5 dark:bg-white/5 border border-black/[0.06] dark:border-white/10 rounded-3xl p-16 text-center">
              <p className="text-gray-400 dark:text-white/30 text-sm tracking-widest uppercase mb-3">No posts yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="text-purple-500 dark:text-purple-400 hover:text-purple-600 text-sm tracking-widest uppercase transition-colors"
              >
                Share your first moment →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map(post => (
                <PostCard
                  key={post.postId}
                  post={post}
                  isOwn={post.band?.userId === MY_BAND_ID}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

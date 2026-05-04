import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CloudLayer from '../components/CloudLayer'
import Navbar from '../components/Navbar'
import { getAllPosts, createPost, deletePost, getFollowedBands, likePost, unlikePost, getPostComments, addPostComment } from '../api'

function timeAgo(isoString) {
  if (!isoString) return ''
  const diff  = Date.now() - new Date(isoString).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins  < 1)  return 'Just now'
  if (mins  < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days  === 1) return 'Yesterday'
  return `${days}d ago`
}

// ─── Provider (Band) Posts ────────────────────────────────────────────────────

function ProviderPostCard({ post, isOwn, onDelete }) {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments]         = useState([])
  const [commentsLoaded, setCommentsLoaded] = useState(false)

  async function loadComments() {
    if (commentsLoaded) return
    try {
      const data = await getPostComments(post.postId)
      setComments(data)
      setCommentsLoaded(true)
    } catch { /* silent */ }
  }

  function handleToggleComments() {
    if (!showComments) loadComments()
    setShowComments(v => !v)
  }

  return (
    <div className={`backdrop-blur-xl border rounded-3xl overflow-hidden ${
      isOwn
        ? 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-400/40'
        : 'bg-white/70 dark:bg-white/10 border-black/[0.08] dark:border-white/20'
    }`}>
      {post.imageUrl && post.imageUrl !== 'null' && (
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
          <p className="text-gray-700 dark:text-white/70 text-sm leading-relaxed mb-4">{post.caption}</p>
        )}

        {/* Engagement bar — likes + comments */}
        <div className="flex items-center gap-5 pt-3 border-t border-black/[0.06] dark:border-white/10">
          <div className="flex items-center gap-1.5 text-gray-400 dark:text-white/30">
            <span className="text-base leading-none">♥</span>
            <span className="text-xs font-semibold tabular-nums">{post.likeCount ?? 0}</span>
          </div>
          <button
            onClick={handleToggleComments}
            className="flex items-center gap-1.5 text-gray-400 dark:text-white/30 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs font-semibold tabular-nums">
              {commentsLoaded ? comments.length : ''}
            </span>
          </button>
        </div>

        {/* Comments — read-only for band */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-black/[0.06] dark:border-white/10">
            {commentsLoaded && comments.length === 0 && (
              <p className="text-gray-400 dark:text-white/30 text-xs tracking-widest uppercase">No comments yet</p>
            )}
            {!commentsLoaded && (
              <p className="text-gray-400 dark:text-white/30 text-xs tracking-widest uppercase">Loading…</p>
            )}
            {comments.length > 0 && (
              <div className="space-y-3">
                {comments.map(c => (
                  <div key={c.id} className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-purple-600/20 border border-purple-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{c.authorName?.[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-gray-900 dark:text-white text-xs font-bold tracking-wide">{c.authorName}</span>
                        <span className="text-gray-400 dark:text-white/30 text-xs">{timeAgo(c.createdAt)}</span>
                      </div>
                      <p className="text-gray-700 dark:text-white/70 text-sm leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ProviderPosts() {
  const [posts, setPosts]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [posted, setPosted]     = useState(false)
  const [form, setForm]         = useState({ caption: '', imageUrl: '' })

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
        caption:  form.caption  || null,
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

          {loading ? (
            <div className="bg-black/5 dark:bg-white/5 border border-black/[0.06] dark:border-white/10 rounded-3xl p-16 text-center">
              <p className="text-gray-400 dark:text-white/30 text-sm tracking-widest uppercase">Loading posts…</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-black/5 dark:bg-white/5 border border-black/[0.06] dark:border-white/10 rounded-3xl p-16 text-center">
              <p className="text-gray-400 dark:text-white/30 text-sm tracking-widests uppercase mb-3">No posts yet</p>
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
                <ProviderPostCard
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

// ─── Customer (Following) Posts ───────────────────────────────────────────────

const COMMENT_LIMIT = 280

function CustomerPostCard({ post, isFollowing, liked, likeCount, onLike }) {
  const navigate = useNavigate()
  const customerId   = localStorage.getItem('customerId')
  const customerName = localStorage.getItem('customerName') ?? 'Anonymous'

  const [showComments, setShowComments] = useState(false)
  const [comments, setComments]         = useState([])
  const [commentsLoaded, setCommentsLoaded] = useState(false)
  const [draft, setDraft]               = useState('')
  const [submitting, setSubmitting]     = useState(false)

  async function loadComments() {
    if (commentsLoaded) return
    try {
      const data = await getPostComments(post.postId)
      setComments(data)
      setCommentsLoaded(true)
    } catch { /* silent */ }
  }

  function handleToggleComments() {
    if (!showComments) loadComments()
    setShowComments(v => !v)
  }

  async function handleSubmitComment(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text || text.length > COMMENT_LIMIT) return
    setSubmitting(true)
    try {
      const created = await addPostComment(post.postId, customerId ? parseInt(customerId) : null, customerName, text)
      setComments(prev => [...prev, created])
      setDraft('')
    } catch { /* silent */ } finally {
      setSubmitting(false)
    }
  }

  const charsLeft = COMMENT_LIMIT - draft.length
  const overLimit = charsLeft < 0

  return (
    <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.08)]">
      {post.imageUrl && post.imageUrl !== 'null' && (
        <div className="w-full aspect-square overflow-hidden">
          <img src={post.imageUrl} alt="Post" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-5">
        {/* Band header */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate(`/band/${post.band?.userId}`)}
            className="w-9 h-9 rounded-full bg-purple-600/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 hover:border-purple-400/70 transition-colors"
          >
            <span className="text-white text-sm font-bold">{post.band?.name?.[0]}</span>
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate(`/band/${post.band?.userId}`)}
                className="text-gray-900 dark:text-white font-black text-sm tracking-widest uppercase hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
              >
                {post.band?.name ?? 'Unknown Band'}
              </button>
              {isFollowing && (
                <span className="bg-purple-600/30 border border-purple-400/30 text-purple-300 text-xs tracking-widest uppercase px-2 py-0.5 rounded-full">
                  Following
                </span>
              )}
            </div>
            <p className="text-gray-400 dark:text-white/30 text-xs tracking-widest uppercase">
              {timeAgo(post.createdAt)}
            </p>
          </div>
        </div>

        {post.caption && (
          <p className="text-gray-700 dark:text-white/70 text-sm leading-relaxed mb-4">{post.caption}</p>
        )}

        {/* Like + Comment bar */}
        <div className="flex items-center gap-5 pt-3 border-t border-black/[0.06] dark:border-white/10">
          <button
            onClick={() => onLike(post.postId)}
            className={`flex items-center gap-1.5 transition-colors ${
              liked ? 'text-red-400 hover:text-red-300' : 'text-gray-400 dark:text-white/30 hover:text-red-400'
            }`}
          >
            <span className="text-base leading-none">{liked ? '♥' : '♡'}</span>
            <span className="text-xs font-semibold tabular-nums">{likeCount}</span>
          </button>

          <button
            onClick={handleToggleComments}
            className="flex items-center gap-1.5 text-gray-400 dark:text-white/30 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs font-semibold tabular-nums">
              {commentsLoaded ? comments.length : ''}
            </span>
          </button>
        </div>

        {/* Comments section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-black/[0.06] dark:border-white/10">
            {/* Existing comments */}
            {comments.length > 0 && (
              <div className="space-y-3 mb-4">
                {comments.map(c => (
                  <div key={c.id} className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-purple-600/20 border border-purple-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{c.authorName?.[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-gray-900 dark:text-white text-xs font-bold tracking-wide">{c.authorName}</span>
                        <span className="text-gray-400 dark:text-white/30 text-xs">{timeAgo(c.createdAt)}</span>
                      </div>
                      <p className="text-gray-700 dark:text-white/70 text-sm leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {comments.length === 0 && commentsLoaded && (
              <p className="text-gray-400 dark:text-white/30 text-xs tracking-widest uppercase mb-4">No comments yet</p>
            )}

            {/* New comment input */}
            {customerId && (
              <form onSubmit={handleSubmitComment} className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <textarea
                    rows={2}
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    placeholder="Add a comment…"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/[0.08] dark:border-white/10 focus:border-purple-400/50 text-gray-900 dark:text-white text-sm px-3 py-2 rounded-xl resize-none focus:outline-none transition-colors placeholder-gray-400 dark:placeholder-white/30"
                  />
                  <span className={`absolute bottom-2 right-2 text-xs tabular-nums ${
                    overLimit ? 'text-red-400' : charsLeft <= 40 ? 'text-yellow-400' : 'text-gray-400 dark:text-white/30'
                  }`}>
                    {charsLeft}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={submitting || !draft.trim() || overLimit}
                  className="bg-purple-600/60 hover:bg-purple-600 border border-purple-400/40 text-white text-xs tracking-widest uppercase px-4 py-2 rounded-full transition-all disabled:opacity-40 flex-shrink-0"
                >
                  Post
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function CustomerPosts() {
  const navigate = useNavigate()
  const customerId = localStorage.getItem('customerId')

  const [allPosts, setAllPosts]       = useState([])
  const [followedIds, setFollowedIds] = useState(new Set())
  const [followedBands, setFollowedBands] = useState([])
  const [loading, setLoading]         = useState(true)
  const [followingOnly, setFollowingOnly] = useState(false)
  const [bandFilter, setBandFilter]   = useState('all')

  // liked post IDs — persisted in localStorage per customer
  const likedKey = `likedPosts_${customerId}`
  const [likedIds, setLikedIds] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(likedKey) || '[]')) }
    catch { return new Set() }
  })
  // local like count overrides keyed by postId
  const [likeCounts, setLikeCounts] = useState({})

  async function toggleLike(postId) {
    const isLiked = likedIds.has(postId)
    // optimistic UI update
    setLikedIds(prev => {
      const next = new Set(prev)
      isLiked ? next.delete(postId) : next.add(postId)
      localStorage.setItem(likedKey, JSON.stringify([...next]))
      return next
    })
    setLikeCounts(prev => ({
      ...prev,
      [postId]: (prev[postId] ?? allPosts.find(p => p.postId === postId)?.likeCount ?? 0) + (isLiked ? -1 : 1),
    }))
    try {
      const updated = isLiked ? await unlikePost(postId) : await likePost(postId)
      setLikeCounts(prev => ({ ...prev, [postId]: updated.likeCount }))
    } catch {
      // revert optimistic update on failure
      setLikedIds(prev => {
        const next = new Set(prev)
        isLiked ? next.add(postId) : next.delete(postId)
        localStorage.setItem(likedKey, JSON.stringify([...next]))
        return next
      })
      setLikeCounts(prev => ({
        ...prev,
        [postId]: (prev[postId] ?? 0) + (isLiked ? 1 : -1),
      }))
    }
  }

  useEffect(() => {
    const load = async () => {
      try {
        const [posts, bands] = await Promise.all([
          getAllPosts(),
          customerId ? getFollowedBands(customerId).catch(() => []) : Promise.resolve([]),
        ])
        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setAllPosts(posts)
        setFollowedBands(bands)
        setFollowedIds(new Set(bands.map(b => b.userId)))
      } catch {
        // silently fail — show empty state
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [customerId])

  // apply filters
  let visible = allPosts
  if (followingOnly) visible = visible.filter(p => followedIds.has(p.band?.userId))
  if (bandFilter !== 'all') visible = visible.filter(p => String(p.band?.userId) === String(bandFilter))

  const followingPosts = allPosts.filter(p => followedIds.has(p.band?.userId))

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <CloudLayer />
      <div className="relative z-20">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 pt-28 pb-28">

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-gray-900 dark:text-white font-black text-2xl tracking-widest uppercase">Updates</h1>
              <p className="text-gray-400 dark:text-white/40 text-sm mt-1">
                {followingOnly ? 'Posts from bands you follow' : 'All band posts'}
              </p>
            </div>
            {/* Following Only toggle */}
            <button
              onClick={() => { setFollowingOnly(v => !v); setBandFilter('all') }}
              className={`flex-shrink-0 text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-all ${
                followingOnly
                  ? 'bg-purple-600/60 border-purple-400/40 text-white'
                  : 'bg-black/5 dark:bg-white/5 border-black/[0.08] dark:border-white/10 text-gray-600 dark:text-white/60 hover:border-purple-400/30'
              }`}
            >
              {followingOnly ? '✓ Following' : 'Following'}
              {followedIds.size > 0 && (
                <span className="ml-1.5 opacity-60">({followingPosts.length})</span>
              )}
            </button>
          </div>

          {loading ? (
            <div className="bg-black/5 dark:bg-white/5 border border-black/[0.06] dark:border-white/10 rounded-3xl p-16 text-center">
              <p className="text-gray-400 dark:text-white/30 text-sm tracking-widest uppercase">Loading…</p>
            </div>
          ) : (
            <>
              {/* Band filter pills — only shown when Following mode is active */}
              {followingOnly && followedBands.length > 1 && (
                <div className="flex gap-2 mb-6 flex-wrap">
                  <button
                    onClick={() => setBandFilter('all')}
                    className={`text-xs tracking-widest uppercase px-4 py-1.5 rounded-full border transition-all ${
                      bandFilter === 'all'
                        ? 'bg-purple-600/60 border-purple-400/40 text-white'
                        : 'bg-black/5 dark:bg-white/5 border-black/[0.08] dark:border-white/10 text-gray-600 dark:text-white/60 hover:border-purple-400/30'
                    }`}
                  >
                    All
                  </button>
                  {followedBands.map(b => (
                    <button
                      key={b.userId}
                      onClick={() => setBandFilter(b.userId)}
                      className={`text-xs tracking-widest uppercase px-4 py-1.5 rounded-full border transition-all ${
                        String(bandFilter) === String(b.userId)
                          ? 'bg-purple-600/60 border-purple-400/40 text-white'
                          : 'bg-black/5 dark:bg-white/5 border-black/[0.08] dark:border-white/10 text-gray-600 dark:text-white/60 hover:border-purple-400/30'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              )}

              {visible.length === 0 ? (
                <div className="bg-black/5 dark:bg-white/5 border border-black/[0.06] dark:border-white/10 rounded-3xl p-16 text-center">
                  {followingOnly && followedIds.size === 0 ? (
                    <>
                      <p className="text-gray-400 dark:text-white/30 text-sm tracking-widest uppercase mb-3">
                        You're not following any bands yet
                      </p>
                      <button
                        onClick={() => navigate('/feed')}
                        className="text-purple-500 dark:text-purple-400 hover:text-purple-600 text-sm tracking-widest uppercase transition-colors"
                      >
                        Browse the feed to find bands →
                      </button>
                    </>
                  ) : (
                    <p className="text-gray-400 dark:text-white/30 text-sm tracking-widest uppercase">
                      {followingOnly ? "Followed bands haven't posted yet" : 'No posts yet'}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {visible.map(post => (
                    <CustomerPostCard
                      key={post.postId}
                      post={post}
                      isFollowing={followedIds.has(post.band?.userId)}
                      liked={likedIds.has(post.postId)}
                      likeCount={likeCounts[post.postId] ?? post.likeCount ?? 0}
                      onLike={toggleLike}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Default export — role-based ─────────────────────────────────────────────

export default function Posts() {
  const isCustomer = !!localStorage.getItem('customerId')
  return isCustomer ? <CustomerPosts /> : <ProviderPosts />
}

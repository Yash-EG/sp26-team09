import { Link } from 'react-router-dom'
import CloudLayer from '../components/CloudLayer'
import Navbar from '../components/Navbar'
import flatironImg from '../assets/flatiron.jpg'

const MY_SHOWS = [
  {
    id: 1,
    venue: 'Flat Iron',
    date: '2026-03-14',
    time: '20:00',
    ticketPrice: '$15',
    genre: 'Rock',
    interested: 87,
    likes: 42,
    img: flatironImg,
  },
]

const ACTIVITY = [
  { id: 1, text: '87 people marked your Flat Iron show as interested', time: '2h ago', icon: 'users' },
  { id: 2, text: '42 likes on your Flat Iron show posting', time: '3h ago', icon: 'heart' },
  { id: 3, text: 'Your profile was viewed 12 times today', time: '5h ago', icon: 'eye' },
  { id: 4, text: 'New booking request from Carolina Theatre', time: '1d ago', icon: 'calendar' },
]

const QUICK_ACTIONS = [
  {
    label: 'Post Concert',
    description: 'Announce a new show',
    to: '/feed',
    icon: 'M12 4v16m8-8H4',
  },
  {
    label: 'Edit Profile',
    description: 'Update your band info',
    to: '/profile',
    icon: 'M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 0l.172.172a2 2 0 010 2.828L12 16H9v-3z',
  },
  {
    label: 'Bookings',
    description: 'View incoming requests',
    to: '/bookings',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    label: 'Availability',
    description: 'Set your open dates',
    to: '/availability',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
]

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

function formatTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`
}

function daysUntil(dateStr) {
  const diff = new Date(dateStr + 'T00:00:00') - new Date().setHours(0, 0, 0, 0)
  return Math.ceil(diff / 86400000)
}

function ActivityIcon({ type }) {
  const paths = {
    users: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    heart: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    eye: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  }
  return (
    <svg className="w-4 h-4 text-purple-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={paths[type]} />
    </svg>
  )
}

export default function Dashboard() {
  const nextShow = MY_SHOWS[0]
  const days = daysUntil(nextShow.date)

  return (
    <div className="relative min-h-screen" style={{ background: '#08080f' }}>
      <CloudLayer />

      <div className="relative z-20">
        <Navbar />

        <div className="max-w-5xl mx-auto px-4 pt-28 pb-28 space-y-6">

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.12)]">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-purple-600/20 border-2 border-purple-400/40 flex items-center justify-center flex-shrink-0">
                <svg className="w-9 h-9 text-purple-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-white font-black text-3xl tracking-widest uppercase">
                  The Midnight Echo
                </h1>
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                  <span className="bg-purple-600/40 border border-purple-400/30 text-purple-300 text-xs tracking-widest uppercase px-3 py-1 rounded-full">
                    Rock
                  </span>
                  <span className="text-white/40 text-sm">Greensboro, NC</span>
                </div>
              </div>

              <div className="flex gap-6 text-center">
                {[
                  { label: 'Shows', value: MY_SHOWS.length },
                  { label: 'Interested', value: MY_SHOWS.reduce((s, p) => s + p.interested, 0) },
                  { label: 'Likes', value: MY_SHOWS.reduce((s, p) => s + p.likes, 0) },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-white font-black text-2xl">{value}</div>
                    <div className="text-white/40 text-xs tracking-widest uppercase">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-purple-950/30 border border-purple-400/40 rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.18)]">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />

            {nextShow.img && (
              <div className="w-full h-44 overflow-hidden">
                <img src={nextShow.img} alt={nextShow.venue} className="w-full h-full object-cover opacity-60" />
              </div>
            )}

            <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-purple-400 text-xs tracking-widest uppercase font-bold mb-1">Next Show</p>
                <h2 className="text-white font-black text-xl tracking-widest uppercase">{nextShow.venue}</h2>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-white font-black text-3xl leading-none">{days}</div>
                <div className="text-white/40 text-xs tracking-widest uppercase">{days === 1 ? 'day away' : 'days away'}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Date', value: formatDate(nextShow.date) },
                { label: 'Time', value: formatTime(nextShow.time) },
                { label: 'Tickets', value: nextShow.ticketPrice },
                { label: 'Interested', value: `${nextShow.interested} going` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/5 rounded-xl px-3 py-2.5">
                  <div className="text-white/40 text-xs tracking-widest uppercase mb-1">{label}</div>
                  <div className="text-white text-sm font-semibold">{value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <Link
                to="/feed"
                className="bg-purple-600/60 hover:bg-purple-600 border border-purple-400/40 text-white text-xs tracking-widest uppercase px-5 py-2.5 rounded-full transition-all"
              >
                View in Feed
              </Link>
              <Link
                to="/feed"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-xs tracking-widest uppercase px-5 py-2.5 rounded-full transition-all"
              >
                Edit Show
              </Link>
            </div>
            </div>
          </div>

          {/* ── Bottom two-column grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Quick actions */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
              <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-4 pb-3 border-b border-white/10">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {QUICK_ACTIONS.map((action) => (
                  <Link
                    key={action.label}
                    to={action.to}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600/30 transition-colors">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={action.icon} />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold tracking-wide">{action.label}</div>
                      <div className="text-white/40 text-xs">{action.description}</div>
                    </div>
                    <svg className="w-4 h-4 text-white/20 group-hover:text-white/50 ml-auto transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
              <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-4 pb-3 border-b border-white/10">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {ACTIVITY.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-purple-600/15 border border-purple-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ActivityIcon type={item.icon} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/70 text-sm leading-snug">{item.text}</p>
                      <p className="text-white/30 text-xs mt-0.5 tracking-widest uppercase">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

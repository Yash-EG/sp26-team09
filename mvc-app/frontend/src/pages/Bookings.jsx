import { useState } from 'react'
import CloudLayer from '../components/CloudLayer'
import Navbar from '../components/Navbar'
import tangerImg from '../assets/tanger.jpg'
import uncgImg from '../assets/uncg_aud.jpg'
import one13Img from '../assets/one13.jpg'
import whiteoakImg from '../assets/whiteoak.jpg'

const MOCK_REQUESTS = [
  {
    id: 1,
    venue: 'Tanger Center',
    address: '300 N Elm St, Greensboro, NC 27401',
    date: '2026-04-18',
    time: '20:00',
    duration: '90 min',
    offer: '$800',
    message: 'Hey! We love your sound and would love to have The Midnight Echo open for our spring showcase. Full PA and backline provided. Let us know!',
    receivedAt: '2026-02-18T09:00:00',
    status: 'pending',
    venueImg: tangerImg,
  },
  {
    id: 2,
    venue: 'UNCG Auditorium',
    address: '1000 Spring Garden St, Greensboro, NC 27412',
    date: '2026-03-28',
    time: '19:00',
    duration: '60 min',
    offer: '$400',
    message: 'We\'re hosting a student arts night and would love a local band to headline. Stage and sound crew on site. Budget is flexible.',
    receivedAt: '2026-02-17T14:30:00',
    status: 'pending',
    venueImg: uncgImg,
  },
  {
    id: 3,
    venue: 'One Thirteen Brewhouse',
    address: '113 N Elm St, Greensboro, NC 27401',
    date: '2026-03-07',
    time: '21:00',
    duration: '45 min',
    offer: '$250',
    message: 'Looking for a rock act for our Friday night series. Small stage but great crowd. Tips go to the band.',
    receivedAt: '2026-02-10T11:00:00',
    status: 'accepted',
    venueImg: one13Img,
  },
  {
    id: 4,
    venue: 'White Oak Amphitheatre',
    address: '1921 W Gate City Blvd, Greensboro, NC 27403',
    date: '2026-03-01',
    time: '18:00',
    duration: '30 min',
    offer: '$150',
    message: 'Opening slot for a community event. Outdoor stage.',
    receivedAt: '2026-02-05T08:00:00',
    status: 'declined',
    venueImg: whiteoakImg,
  },
]

const STATUS_STYLES = {
  pending:  { dot: 'bg-yellow-400', badge: 'bg-yellow-400/15 border-yellow-400/30 text-yellow-300' },
  accepted: { dot: 'bg-green-400',  badge: 'bg-green-400/15  border-green-400/30  text-green-300'  },
  declined: { dot: 'bg-red-400',    badge: 'bg-red-400/15    border-red-400/30    text-red-300'    },
}

const TABS = ['All', 'Pending', 'Accepted', 'Declined']

function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  })
}

function formatTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`
}

function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days}d ago`
}

function BookingCard({ req, onAccept, onDecline }) {
  const s = STATUS_STYLES[req.status]

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.08)] relative">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {req.venueImg && (
        <div className="w-full h-44 overflow-hidden">
          <img src={req.venueImg} alt={req.venue} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-black text-lg tracking-widest uppercase">{req.venue}</h3>
              <span className={`border text-xs tracking-widest uppercase px-2.5 py-0.5 rounded-full ${s.badge}`}>
                {req.status}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-white/40 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {req.address}
            </div>
          </div>
          <span className="text-white/30 text-xs tracking-widest uppercase flex-shrink-0">
            {timeAgo(req.receivedAt)}
          </span>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            {
              icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
              label: 'Date',
              value: formatDate(req.date),
            },
            {
              icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
              label: 'Time',
              value: formatTime(req.time),
            },
            {
              icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
              label: 'Duration',
              value: req.duration,
            },
            {
              icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
              label: 'Offer',
              value: req.offer,
            },
          ].map(({ icon, label, value }) => (
            <div key={label} className="bg-white/5 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-3.5 h-3.5 text-purple-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
                </svg>
                <span className="text-white/40 text-xs tracking-widest uppercase">{label}</span>
              </div>
              <span className="text-white text-sm font-semibold">{value}</span>
            </div>
          ))}
        </div>

        {/* Message from venue */}
        <div className="bg-white/5 rounded-xl px-4 py-3 mb-4">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Message from venue</p>
          <p className="text-white/70 text-sm leading-relaxed">{req.message}</p>
        </div>

        {/* Action buttons — pending only */}
        {req.status === 'pending' && (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onAccept(req.id)}
              className="flex-1 bg-green-600/40 hover:bg-green-600/70 border border-green-400/40 text-green-300 text-sm tracking-widest uppercase py-2.5 rounded-full transition-all"
            >
              Accept
            </button>
            <button
              onClick={() => onDecline(req.id)}
              className="flex-1 bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-400/30 text-white/50 hover:text-red-300 text-sm tracking-widest uppercase py-2.5 rounded-full transition-all"
            >
              Decline
            </button>
          </div>
        )}

        {req.status === 'accepted' && (
          <div className="flex items-center gap-2 text-green-400 text-sm tracking-widest uppercase">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Booking confirmed
          </div>
        )}
        {req.status === 'declined' && (
          <div className="flex items-center gap-2 text-red-400/60 text-sm tracking-widest uppercase">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Declined
          </div>
        )}
      </div>
    </div>
  )
}

export default function Bookings() {
  const [requests, setRequests] = useState(MOCK_REQUESTS)
  const [activeTab, setActiveTab] = useState('All')

  function handleAccept(id) {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: 'accepted' } : r))
  }

  function handleDecline(id) {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: 'declined' } : r))
  }

  const counts = {
    All: requests.length,
    Pending:  requests.filter((r) => r.status === 'pending').length,
    Accepted: requests.filter((r) => r.status === 'accepted').length,
    Declined: requests.filter((r) => r.status === 'declined').length,
  }

  const visible = activeTab === 'All'
    ? requests
    : requests.filter((r) => r.status === activeTab.toLowerCase())

  return (
    <div className="relative min-h-screen" style={{ background: '#08080f' }}>
      <CloudLayer />

      <div className="relative z-20">
        <Navbar />

        <div className="max-w-3xl mx-auto px-4 pt-28 pb-28">

          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-white font-black text-2xl tracking-widest uppercase">Bookings</h1>
            <p className="text-white/40 text-sm mt-1">Venue requests for The Midnight Echo</p>
          </div>

          <div className="flex gap-3 mb-6 flex-wrap">
            {Object.entries(counts).map(([label, count]) => {
              const colors = {
                All:      'bg-white/10 border-white/20 text-white',
                Pending:  'bg-yellow-400/10 border-yellow-400/20 text-yellow-300',
                Accepted: 'bg-green-400/10  border-green-400/20  text-green-300',
                Declined: 'bg-red-400/10    border-red-400/20    text-red-300',
              }
              return (
                <div key={label} className={`border text-xs tracking-widest uppercase px-4 py-2 rounded-full ${colors[label]}`}>
                  {count} {label}
                </div>
              )
            })}
          </div>

          <div className="flex gap-1 mb-6 bg-white/5 border border-white/10 rounded-2xl p-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-xs tracking-widest uppercase py-2 rounded-xl transition-all ${
                  activeTab === tab
                    ? 'bg-purple-600/60 border border-purple-400/40 text-white'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Request list */}
          {visible.length === 0 ? (
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-16 text-center">
              <svg className="w-12 h-12 text-white/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-white/30 text-sm tracking-widest uppercase">No {activeTab.toLowerCase()} requests</p>
            </div>
          ) : (
            <div className="space-y-4">
              {visible.map((req) => (
                <BookingCard
                  key={req.id}
                  req={req}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

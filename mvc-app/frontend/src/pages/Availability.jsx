import { useState } from 'react'
import CloudLayer from '../components/CloudLayer'
import Navbar from '../components/Navbar'

// 'available' = band can play, 'blocked' = not available, undefined = unset
const INITIAL_MARKED = {
  '2026-02-21': 'available',
  '2026-02-22': 'available',
  '2026-02-28': 'available',
  '2026-03-01': 'available',
  '2026-03-07': 'blocked',   
  '2026-03-14': 'blocked',  
  '2026-03-15': 'available',
  '2026-03-20': 'available',
  '2026-03-21': 'available',
  '2026-03-28': 'blocked',   
  '2026-04-03': 'available',
  '2026-04-04': 'available',
  '2026-04-10': 'available',
  '2026-04-11': 'available',
  '2026-04-17': 'available',
  '2026-04-18': 'blocked', 
}

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

function toKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
}

function formatKey(key) {
  return new Date(key + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}

function isToday(year, month, day) {
  const t = new Date()
  return t.getFullYear() === year && t.getMonth() === month && t.getDate() === day
}

function isPast(year, month, day) {
  const today = new Date()
  today.setHours(0,0,0,0)
  return new Date(year, month, day) < today
}

export default function Availability() {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [marked, setMarked] = useState(INITIAL_MARKED)

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  function toggleDay(key, past) {
    if (past) return
    setMarked(prev => {
      const cur = prev[key]
      if (!cur)            return { ...prev, [key]: 'available' }
      if (cur === 'available') return { ...prev, [key]: 'blocked' }
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const firstDow = new Date(viewYear, viewMonth, 1).getDay()  // 0=Sun
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const todayStr = toKey(today.getFullYear(), today.getMonth(), today.getDate())
  const upcoming = Object.entries(marked)
    .filter(([k, v]) => v === 'available' && k >= todayStr)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(0, 6)

  const blockedCount = Object.values(marked).filter(v => v === 'blocked').length
  const availableCount = Object.values(marked).filter(v => v === 'available').length

  return (
    <div className="relative min-h-screen" style={{ background: '#08080f' }}>
      <CloudLayer />

      <div className="relative z-20">
        <Navbar />

        <div className="max-w-5xl mx-auto px-4 pt-28 pb-28">

          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-white font-black text-2xl tracking-widest uppercase">Availability</h1>
            <p className="text-white/40 text-sm mt-1">Set your open dates so venues know when to book you</p>
          </div>

          {/* Legend + stat pills */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2 bg-green-400/10 border border-green-400/20 text-green-300 text-xs tracking-widest uppercase px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
              {availableCount} Available
            </div>
            <div className="flex items-center gap-2 bg-red-400/10 border border-red-400/20 text-red-300 text-xs tracking-widest uppercase px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
              {blockedCount} Blocked
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/40 text-xs tracking-widest uppercase px-4 py-2 rounded-full">
              Click a date to toggle
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">

            {/* Calendar */}
            <div className="flex-1 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">

              {/* Month nav */}
              <div className="flex items-center justify-between mb-5">
                <button
                  onClick={prevMonth}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-white font-black tracking-widest uppercase text-sm">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </h2>
                <button
                  onClick={nextMonth}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 mb-2">
                {DAY_NAMES.map(d => (
                  <div key={d} className="text-center text-white/30 text-xs tracking-widest uppercase py-1">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {cells.map((day, i) => {
                  if (!day) return <div key={`empty-${i}`} />

                  const key = toKey(viewYear, viewMonth, day)
                  const status = marked[key]
                  const past = isPast(viewYear, viewMonth, day)
                  const today_ = isToday(viewYear, viewMonth, day)

                  let cellClass = 'relative aspect-square flex items-center justify-center rounded-xl text-sm font-semibold transition-all select-none '

                  if (past) {
                    cellClass += 'text-white/15 cursor-default '
                  } else if (status === 'available') {
                    cellClass += 'bg-green-500/25 border border-green-400/50 text-green-300 hover:bg-green-500/40 cursor-pointer '
                  } else if (status === 'blocked') {
                    cellClass += 'bg-red-500/25 border border-red-400/50 text-red-300 hover:bg-red-500/40 cursor-pointer '
                  } else {
                    cellClass += 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20 cursor-pointer '
                  }

                  return (
                    <button
                      key={key}
                      onClick={() => toggleDay(key, past)}
                      className={cellClass}
                      title={past ? '' : status ? `${status} — click to change` : 'Click to mark available'}
                    >
                      {today_ && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-purple-400" />
                      )}
                      {day}
                    </button>
                  )
                })}
              </div>

              <p className="text-white/25 text-xs tracking-widest uppercase text-center mt-5">
                Unset → Available → Blocked → Unset
              </p>
            </div>

            <div className="lg:w-72 flex flex-col gap-4">

              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-5 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
                <h3 className="text-white font-bold text-xs tracking-widest uppercase mb-4 pb-3 border-b border-white/10">
                  Upcoming Available
                </h3>
                {upcoming.length === 0 ? (
                  <p className="text-white/30 text-xs tracking-widest uppercase">No dates set</p>
                ) : (
                  <div className="space-y-2">
                    {upcoming.map(([key]) => (
                      <div key={key} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                        <span className="text-white/70 text-sm">{formatKey(key)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tips card */}
              <div className="backdrop-blur-xl bg-purple-950/30 border border-purple-400/30 rounded-3xl p-5 shadow-[0_0_30px_rgba(168,85,247,0.12)]">
                <h3 className="text-purple-300 font-bold text-xs tracking-widest uppercase mb-3">
                  Tips
                </h3>
                <ul className="space-y-2.5">
                  {[
                    'Mark weekends available to attract more venue requests.',
                    'Blocked dates won\'t appear to venues searching for bookings.',
                    'Keep your calendar current to get more relevant offers.',
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/50 text-xs leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400/60 flex-shrink-0 mt-1" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Save button */}
              <button className="w-full bg-purple-600/60 hover:bg-purple-600 border border-purple-400/40 text-white text-xs tracking-widest uppercase py-3 rounded-full transition-all shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                Save Availability
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

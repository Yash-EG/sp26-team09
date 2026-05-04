import { useState, useRef, useEffect } from 'react'

export default function CustomSelect({ value, onChange, options, className, placeholder }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const normalized = options.map((o) =>
    typeof o === 'string' ? { value: o, label: o } : o
  )
  const selected = normalized.find((o) => o.value === value)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center justify-between gap-2 text-left ${className ?? ''}`}
      >
        <span className={!selected ? 'text-gray-400 dark:text-white/40' : ''}>
          {selected ? selected.label : (placeholder ?? 'Select…')}
        </span>
        <svg
          className={`w-4 h-4 flex-shrink-0 text-gray-400 dark:text-white/40 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-[100] w-full mt-1 bg-[#f0ebe4] dark:bg-[#1a1025] border border-gray-200 dark:border-white/20 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
          {normalized.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange({ target: { value: opt.value } })
                setOpen(false)
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                opt.value === value
                  ? 'bg-purple-600/30 text-purple-700 dark:text-purple-300'
                  : 'text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

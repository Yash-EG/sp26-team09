export default function CloudLayer() {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">

      <div
        className="absolute rounded-full opacity-10 blur-3xl"
        style={{
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, #a855f7, transparent)',
          top: '10%',
          left: '-10%',
          animation: 'drift1 20s ease-in-out infinite alternate',
        }}
      />

      <div
        className="absolute rounded-full opacity-10 blur-3xl"
        style={{
          width: '500px',
          height: '250px',
          background: 'radial-gradient(ellipse, #6366f1, transparent)',
          top: '30%',
          right: '-5%',
          animation: 'drift2 25s ease-in-out infinite alternate',
        }}
      />

      <div
        className="absolute rounded-full opacity-5 blur-3xl"
        style={{
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, #a855f7, transparent)',
          bottom: '10%',
          left: '20%',
          animation: 'drift3 30s ease-in-out infinite alternate',
        }}
      />

    </div>
  )
}

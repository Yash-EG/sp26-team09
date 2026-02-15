import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

export default function MapBackground() {
  const mapContainer = useRef(null)
  const mapRef = useRef(null)
  const isFlyingRef = useRef(false)

  function handleReset() {
    if (!mapRef.current) return
    isFlyingRef.current = true
    mapRef.current.flyTo({
      center: [-79.7920, 36.0726],
      zoom: 15,
      pitch: 70,
      bearing: -30,
      duration: 2000,
      essential: true,
    })
    setTimeout(() => {
      isFlyingRef.current = false
    }, 2000)
  }

  useEffect(() => {
    const map = mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      //style: 'mapbox://styles/mapbox/navigation-night-v1',
      //style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-79.7920, 36.0726], // Greensboro, NC
      zoom: 15,
      pitch: 70,        // tilt for 3D effect
      bearing: -30,     // rotation angle
      antialias: true,
    })

    map.on('load', () => {
      // Hide all symbol layers (labels, icons, shields)
      map.getStyle().layers.forEach((layer) => {
        if (layer.type === 'symbol') {
          map.setLayoutProperty(layer.id, 'visibility', 'none')
        }
      })

      // Re-enable road-label filtered to major roads + tertiary (Spring Garden St)
      if (map.getLayer('road-label')) {
        map.setLayoutProperty('road-label', 'visibility', 'visible')
        map.setFilter('road-label', [
          'match',
          ['get', 'class'],
          ['motorway', 'trunk', 'primary', 'secondary', 'tertiary'],
          true,
          false,
        ])
      }

      const venues = [
        { name: 'Tanger Center', coords: [-79.7874, 36.0695] },
        { name: 'Carolina Theatre', coords: [-79.7921, 36.0731] },
        { name: 'Cone Denim Entertainment Center', coords: [-79.8195, 36.0856] },
        { name: 'Blind Tiger', coords: [-79.7910, 36.0682] },
        { name: 'Greene Street Club', coords: [-79.7897, 36.0701] },
        { name: 'Hops Burger Bar', coords: [-79.7883, 36.0719] },
        { name: 'UNCG Auditorium', coords: [-79.8059, 36.0669] },
        { name: 'UNCG Recital Hall', coords: [-79.80774842884561, 36.072706221478114] },
        { name: 'Greensboro Coliseum', coords: [-79.8257529957848, 36.05955167844715]},
      ]

      venues.forEach((venue) => {
        const popup = new mapboxgl.Popup({ offset: 25, maxWidth: 'none' }).setHTML(`
          <div style="
            width: 220px;
            background: rgba(10, 10, 20, 0.75);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(168, 85, 247, 0.3);
            border-radius: 14px;
            overflow: hidden;
            font-family: sans-serif;
            color: white;
            box-shadow: 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
          ">
            <div style="
              width: 100%;
              height: 120px;
              background: linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              border-bottom: 1px solid rgba(168, 85, 247, 0.2);
            ">
              <span style="color: rgba(168,85,247,0.4); font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">venue photo</span>
            </div>
            <div style="padding: 10px 14px 13px;">
              <p style="font-weight: 600; margin: 0 0 5px 0; font-size: 14px;">${venue.name}</p>
              <p style="color: #a855f7; font-size: 11px; margin: 0; letter-spacing: 1px; text-transform: uppercase;">Available for booking</p>
            </div>
          </div>
        `)

        const el = document.createElement('div')
        el.style.cssText = `
          width: 14px;
          height: 14px;
          background: #a855f7;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 10px #a855f7;
          cursor: pointer;
        `

        el.addEventListener('click', () => {
          isFlyingRef.current = true
          map.flyTo({
            center: venue.coords,
            zoom: 17,
            pitch: 70,
            bearing: map.getBearing(),
            duration: 2000,
            essential: true,
          })
          setTimeout(() => {
            isFlyingRef.current = false
          }, 2000)
        })

        new mapboxgl.Marker(el)
          .setLngLat(venue.coords)
          .setPopup(popup)
          .addTo(map)
      })

      // UNCG campus polygon
      map.addSource('uncg-campus', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [-79.8134266092139, 36.07353377432531],
                    [-79.81366614113146, 36.073284389484726],
                    [-79.81369564499524, 36.07289802767485],
                    [-79.81389939843672, 36.07267233035506],
                    [-79.81455885399464, 36.07244748231244],
                    [-79.81481026166304, 36.07210987646333],
                    [-79.81504678389352, 36.06847493865651],
                    [-79.81537490769891, 36.063271488760705],
                    [-79.81302230980648, 36.06374504952747],
                    [-79.80529108303158, 36.064618213217145],
                    [-79.80540092892461, 36.07322606413909],
                    [-79.81322506319302, 36.07359078999853],
                    [-79.8134266092139, 36.07353377432531],
                  ],
                ],
              },
            },
          ],
        },
      })

      map.addLayer({
        id: 'uncg-fill',
        type: 'fill',
        source: 'uncg-campus',
        paint: {
          'fill-color': '#6366f1',
          'fill-opacity': 0.15,
        },
      })

      map.addLayer({
        id: 'uncg-outline',
        type: 'line',
        source: 'uncg-campus',
        paint: {
          'line-color': '#6366f1',
          'line-width': 2,
          'line-opacity': 0.8,
        },
      })

      // Add 3D buildings
      map.addLayer({
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        paint: {
          'fill-extrusion-color': '#1a1a2e',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': ['get', 'min_height'],
          'fill-extrusion-opacity': 0.9,
        },
      })

      // Auto rotate — pauses while flying to a venue
      const rotate = () => {
        if (!isFlyingRef.current) {
          map.setBearing(map.getBearing() + 0.02)
        }
        requestAnimationFrame(rotate)
      }
      rotate()
    })

    // Disable user interaction so it stays as a background
    map.scrollZoom.disable()
    map.dragPan.disable()
    map.dragRotate.disable()

    return () => map.remove()
  }, [])

  return (
    <>
      <div ref={mapContainer} className="fixed inset-0 w-full h-full z-0" />

      {/* Reset button */}
      <button
        onClick={handleReset}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 bg-black/60 backdrop-blur-md border border-purple-500/40 text-purple-300 text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:bg-purple-600/30 hover:text-white transition-all duration-300"
      >
        ↩ Reset View
      </button>
    </>
  )
  
}

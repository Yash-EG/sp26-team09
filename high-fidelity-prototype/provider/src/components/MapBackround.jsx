import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

export default function MapBackground() {
  const mapContainer = useRef(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-79.7920, 36.0726], // Greensboro, NC
      zoom: 14,
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

      // UNCG marker
      const el = document.createElement('div')
      el.style.cssText = `
        width: 14px;
        height: 14px;
        background: #6366f1;
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 0 10px #6366f1, 0 0 20px #6366f188;
      `
      new mapboxgl.Marker({ element: el })
        .setLngLat([-79.8180, 36.0682])
        .setPopup(new mapboxgl.Popup({ offset: 16 }).setText('UNCG'))
        .addTo(map)

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

      // Auto rotate the map
      const rotate = () => {
        map.setBearing(map.getBearing() + 0.02)
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
    <div
      ref={mapContainer}
      className="fixed inset-0 w-full h-full z-0"
    />
  )
}
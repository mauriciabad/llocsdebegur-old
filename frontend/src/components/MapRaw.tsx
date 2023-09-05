'use client'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import type Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import classNames from 'classnames'
import { Icon } from 'leaflet'
import IconMapPin from '/public/icon-map-pin.svg'

type Location = {
  latitude: number
  longitude: number
}

function toLatLang(location: Location): Leaflet.LatLngLiteral
function toLatLang(
  location: Location | undefined
): Leaflet.LatLngLiteral | undefined
function toLatLang(
  location: Location | undefined
): Leaflet.LatLngLiteral | undefined {
  if (!location) return undefined
  return { lat: location.latitude, lng: location.longitude }
}

const DEFAULT_LOCATION = {
  latitude: 41.958627,
  longitude: 3.213765,
} as const satisfies Location

export default function Map({
  location,
  className,
  markers,
}: {
  location?: Location
  className?: string
  markers?: {
    location: Location
    text?: string
  }[]
}) {
  return (
    <div>
      <MapContainer
        center={toLatLang(location ?? DEFAULT_LOCATION)}
        zoom={13}
        scrollWheelZoom={false}
        className={classNames(className, 'z-0 h-64 w-full')}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers?.map(({ text, location: { latitude, longitude } }) => (
          <Marker
            key={`${latitude}-${longitude}`}
            position={{
              lat: latitude,
              lng: longitude,
            }}
            icon={
              new Icon({
                iconUrl: IconMapPin.src,
                iconAnchor: [94 * 0.4 * 0.5, 128 * 0.4 * 1],
                iconSize: [94 * 0.4, 128 * 0.4],
              })
            }
          >
            {text && <Popup>{text}</Popup>}
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

'use client'

import classNames from 'classnames'
import type Leaflet from 'leaflet'
import L, { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet'
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
  location = DEFAULT_LOCATION,
  className,
  markers,
  fullControl,
  zoom = 13,
}: {
  location?: Location
  className?: string
  zoom?: number
  fullControl?: boolean
  markers?: {
    location: Location
    text?: string
  }[]
}) {
  return (
    <MapContainer
      center={toLatLang(location)}
      zoom={zoom}
      scrollWheelZoom={fullControl}
      dragging={fullControl || !L.Browser.mobile}
      className={classNames(className, 'z-0 h-64 w-full')}
      worldCopyJump={false}
    >
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
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Classic (ICGC)">
          <TileLayer
            maxZoom={20}
            attribution="ICGC"
            url="https://geoserveis.icgc.cat/icc_mapesmultibase/noutm/wmts/topo/GRID3857/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Classic (MTN)">
          <TileLayer
            maxZoom={20}
            attribution="<a href='http://www.ign.es/'>IDEE</a>"
            url="https://ign.es/wmts/mapa-raster?service=WMTS&request=GetTile&version=1.0.0&Format=image/jpeg&layer=MTN&style=default&style=default&tilematrixset=GoogleMapsCompatible&TileMatrix={z}&TileRow={y}&TileCol={x}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Standard (IGN)">
          <TileLayer
            maxZoom={20}
            attribution="<a href='http://www.ign.es/'>IDEE</a>"
            url="https://www.ign.es/wmts/ign-base?service=WMTS&request=GetTile&version=1.0.0&Format=image/png&layer=IGNBaseTodo&style=default&tilematrixset=GoogleMapsCompatible&TileMatrix={z}&TileRow={y}&TileCol={x}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Standard (ICGC)">
          <TileLayer
            maxZoom={19}
            attribution="ICGC"
            url="https://geoserveis.icgc.cat/servei/catalunya/contextmaps/wmts/contextmaps-mapa-estandard/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Standard (OSM)">
          <TileLayer
            maxZoom={21}
            attribution="OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satelite (IGN)">
          <TileLayer
            maxZoom={20}
            attribution="<a href='http://www.ign.es/'>IGN</a>"
            url="https://www.ign.es/wmts/pnoa-ma?service=WMTS&request=GetTile&version=1.0.0&Format=image/png&layer=OI.OrthoimageCoverage&style=default&tilematrixset=GoogleMapsCompatible&TileMatrix={z}&TileRow={y}&TileCol={x}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satelite (ICGC 1)">
          <TileLayer
            maxZoom={19}
            attribution="ICGC"
            url="https://geoserveis.icgc.cat/servei/catalunya/contextmaps/wmts/contextmaps-orto-estandard/MON3857NW/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satelite (ICGC 2)">
          <TileLayer
            maxZoom={20}
            attribution="ICGC"
            url="https://geoserveis.icgc.cat/icc_mapesmultibase/noutm/wmts/orto/GRID3857/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satelite (Esri)">
          <TileLayer
            maxZoom={20}
            attribution='&copy; <a href="http://www.esri.com/">Esri</a>'
            url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
    </MapContainer>
  )
}

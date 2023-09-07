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
  ZoomControl,
} from 'react-leaflet'
import IconMapPin from '/public/icon-map-pin.svg'
import { useEffect, useState } from 'react'
import 'leaflet.locatecontrol'
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'
import { renderToStaticMarkup } from 'react-dom/server'
import { divIcon } from 'leaflet'
import { PlaceTypeSlug } from '@/lib/gql'
import PlaceMarker from './map/PlaceMarker'

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
  zoom = 14,
}: {
  location?: Location
  className?: string
  zoom?: number
  fullControl?: boolean
  markers?: {
    location: Location
    text?: string
    markerType?: PlaceTypeSlug
  }[]
}) {
  const [map, setMap] = useState<Leaflet.Map | null>(null)

  useEffect(() => {
    if (map) {
      const resizeObserver = new ResizeObserver(() => map.invalidateSize())

      const container = map.getContainer()
      resizeObserver.observe(container)

      return () => {
        resizeObserver.unobserve(container)
      }
    }
  }, [map])

  useEffect(() => {
    if (map) {
      L.control
        .locate({
          flyTo: true,
          showPopup: false,
          position: 'bottomright',
        })
        .addTo(map)
    }
  }, [map])

  return (
    <MapContainer
      center={toLatLang(location)}
      zoom={zoom}
      zoomControl={false}
      scrollWheelZoom={fullControl}
      dragging={fullControl || !L.Browser.mobile}
      className={classNames(className, 'z-0 h-64 w-full')}
      ref={setMap}
    >
      {markers?.map(
        ({ text, location: { latitude, longitude }, markerType }) => (
          <Marker
            key={`${latitude}-${longitude}`}
            position={{
              lat: latitude,
              lng: longitude,
            }}
            icon={
              markerType
                ? divIcon({
                    html: renderToStaticMarkup(
                      <PlaceMarker type={markerType} />
                    ),
                    iconSize: [0, 0],
                  })
                : new Icon({
                    iconUrl: IconMapPin.src,
                    iconAnchor: [94 * 0.3 * 0.5, 128 * 0.3 * 1],
                    iconSize: [94 * 0.3, 128 * 0.3],
                  })
            }
          >
            {text && <Popup>{text}</Popup>}
          </Marker>
        )
      )}

      <ZoomControl position="bottomright" />

      <LayersControl position="bottomleft">
        <LayersControl.BaseLayer name="Classic (ICGC)">
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
        <LayersControl.BaseLayer checked name="Satelite (IGN)">
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

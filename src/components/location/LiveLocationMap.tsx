import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LiveLocationMapProps {
  latitude: number;
  longitude: number;
  accuracy?: number | null;
  customerName?: string;
}

const customerIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: #33a0ff;
      border: 4px solid white;
      box-shadow: 0 4px 14px rgba(0,0,0,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    ">
      <div style="
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: white;
      "></div>

      <div style="
        position: absolute;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        border: 2px solid rgba(51,160,255,0.35);
      "></div>
    </div>
  `,
  iconSize: [42, 42],
  iconAnchor: [21, 21],
  popupAnchor: [0, -24],
});

function MapFollower({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], map.getZoom(), {
      animate: true,
    });
  }, [latitude, longitude, map]);

  return null;
}

export function LiveLocationMap({
  latitude,
  longitude,
  accuracy,
  customerName = 'Customer',
}: LiveLocationMapProps) {
  const position: [number, number] = [latitude, longitude];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink-100 shadow-card">
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        className="h-[360px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapFollower
          latitude={latitude}
          longitude={longitude}
        />

        <Marker
          position={position}
          icon={customerIcon}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{customerName}</p>
              <p className="text-gray-500">
                Live customer location
              </p>

              {accuracy != null && (
                <p className="mt-1 text-xs text-gray-500">
                  Accuracy: ±{Math.round(accuracy)}m
                </p>
              )}
            </div>
          </Popup>
        </Marker>

        {accuracy != null && accuracy > 0 && (
          <Circle
            center={position}
            radius={accuracy}
            pathOptions={{
              color: '#33a0ff',
              fillColor: '#33a0ff',
              fillOpacity: 0.08,
              weight: 1,
            }}
          />
        )}
      </MapContainer>

      <div className="absolute left-4 top-4 z-[1000] flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 shadow-lg backdrop-blur">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
        </span>

        <span className="text-xs font-semibold text-ink-800">
          Live Location
        </span>
      </div>
    </div>
  );
}
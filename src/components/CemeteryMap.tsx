import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Defunto } from '@/data/types';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions.map(p => L.latLng(p[0], p[1])));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 18 });
    }
  }, [positions, map]);
  return null;
}

interface CemeteryMapProps {
  results: Defunto[];
  className?: string;
}

export default function CemeteryMap({ results, className }: CemeteryMapProps) {
  const center: [number, number] = [-20.748882420149734, -48.915706903325955];

  const markers = results
    .filter(d => d.jazigo?.endereco?.latitude && d.jazigo?.endereco?.longitude)
    .map(d => ({
      position: [d.jazigo!.endereco!.latitude!, d.jazigo!.endereco!.longitude!] as [number, number],
      defunto: d,
    }));

  const positions = markers.map(m => m.position);

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={17}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((m, i) => (
          <Marker key={i} position={m.position}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{m.defunto.nome}</p>
                {m.defunto.jazigo?.endereco && (
                  <p className="text-xs mt-1">
                    {m.defunto.jazigo.endereco.rua}, Nº {m.defunto.jazigo.endereco.numero}<br />
                    Quadra {m.defunto.jazigo.endereco.quadra}, {m.defunto.jazigo.endereco.lado}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        {positions.length > 0 && <FitBounds positions={positions} />}
      </MapContainer>
    </div>
  );
}

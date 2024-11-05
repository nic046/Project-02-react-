import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationMarker({ setCoords }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setCoords({ latitude: lat, longitude: lng });
    },
  });
  return null;
}

export default function Map({Coords, setCoords}) {
  return (
    <MapContainer
      center={[Coords.latitude, Coords.longitude]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[Coords.latitude, Coords.longitude]} />
      <LocationMarker setCoords={setCoords} />
    </MapContainer>
  );
}

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";


const customIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

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
      <Marker position={[Coords.latitude, Coords.longitude]}  icon={customIcon} />
      <LocationMarker setCoords={setCoords} />
    </MapContainer>
  );
}

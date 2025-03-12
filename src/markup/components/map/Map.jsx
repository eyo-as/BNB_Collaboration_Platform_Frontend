import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 7.08078694377647, // Latitude
  lng: 38.484824232936795, // Longitude
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyC8884fCtiylQNfd0ziF2jZPJl97QAI7bw",
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15} // Adjust the zoom level
      center={center}
    >
      {/* Add a marker to the map */}
      <Marker position={center} />
    </GoogleMap>
  );
};

export default Map;

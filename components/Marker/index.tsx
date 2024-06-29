import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { LocationMarkerProps, IGetAddressResponse } from "../../types";
import { useRouter } from "next/router";
import { FC, useMemo, useRef } from "react";

const customIcon = new L.Icon({
  iconUrl: "/pin.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const LocationMarker = ({
  userLocation,
  setUserLocation,
  fetchAddress,
}: LocationMarkerProps): JSX.Element | null => {
  const router = useRouter();

  const map = useMapEvents({
    moveend() {
      const center = map.getCenter();
      setUserLocation(center);
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            lat: center.lat.toFixed(6),
            lng: center.lng.toFixed(6),
          },
        },
        undefined,
        { shallow: true }
      );
    },
    movestart() {
      setUserLocation(map.getCenter());
    },
    click(e) {
      const { lat, lng } = e.latlng;
      map.setView(e.latlng);
      setUserLocation(e.latlng);
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, lat, lng },
        },
        undefined,
        { shallow: true }
      );
      fetchAddress(e.latlng.lat, e.latlng.lng);
    },
    locationfound(e) {
      setUserLocation(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return !userLocation ? null : (
    <Marker draggable position={userLocation} icon={customIcon}>
      <Popup>شما اینجا هستید</Popup>
    </Marker>
  );
};

export default LocationMarker;

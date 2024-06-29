"use client";

import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { useEffect, useState } from "react";
import { UserLocation, IGetAddressResponse } from "../../types";
import "leaflet/dist/leaflet.css";
import Skeleton from "../Skeleton";
import LocationMarker from "../Marker";
import { FC } from "react";
import { useRouter } from "next/router";

const Map: FC = () => {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState<UserLocation | null>();
  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`/api/search/${lat}?lng=${lng}`);
      const data: IGetAddressResponse = await response.json();
      console.log("Address:", data.address);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({
            lat: latitude,
            lng: longitude,
          });
          router.push(
            {
              pathname: router.pathname,
              query: { ...router.query, lat: latitude, lng: longitude },
            },
            undefined,
            { shallow: true }
          );
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [router]);
  if (!userLocation) {
    return <Skeleton />;
  } else {
    return (
      <MapContainer
        center={[userLocation!.lat, userLocation!.lng]}
        zoom={13}
        className="w-[500px] h-[500px] rounded-xl"
        zoomControl={false}
      >
        <ZoomControl position="bottomleft" />
        <TileLayer url="https://raster.snappmaps.ir/styles/snapp-style/{z}/{x}/{y}{r}.png" />
        <LocationMarker
          userLocation={userLocation}
          setUserLocation={setUserLocation}
          fetchAddress={fetchAddress}
        />
      </MapContainer>
    );
  }
};

export default Map;

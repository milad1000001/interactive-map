export interface MarkerData {
  lat: number;
  lng: number;
  description: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
}

export interface LocationMarkerProps {
  userLocation: UserLocation | null;
  setUserLocation: (location: UserLocation) => void;
  fetchAddress:(lat: number, lng: number) => void;
}

export interface IGetAddressResponse {
  address: [string, string];
}

'use client';

import { DirectionsRenderer, GoogleMap, MarkerF } from '@react-google-maps/api';

interface MapProps {
  source: google.maps.places.PlaceResult | undefined;
  destination: google.maps.places.PlaceResult | undefined;
  directionResponse: google.maps.DirectionsResult | undefined;
}

export const Map = ({ source, destination, directionResponse } : MapProps) => {
  const center = new google.maps.LatLng(7.068489408423691, 125.61118715620856);

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  return (
    <GoogleMap
      zoom={13}
      center={center}
      mapContainerStyle={containerStyle}
      options={{
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_STYLE_ID,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        rotateControl: false
      }}>
      {directionResponse && <DirectionsRenderer directions={directionResponse} />}
      {source && <MarkerF position={new google.maps.LatLng(source.geometry.location.lat(), source.geometry.location.lng())} />}
      {destination && <MarkerF position={new google.maps.LatLng(destination.geometry.location.lat(), destination.geometry.location.lng())} />}
    </GoogleMap>
  );
};

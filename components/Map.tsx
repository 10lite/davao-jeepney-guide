'use client';

import { DirectionsRenderer, GoogleMap, MarkerF } from '@react-google-maps/api';

interface MapProps {
  source: google.maps.places.PlaceResult | undefined;
  destination: google.maps.places.PlaceResult | undefined;
  directionResponse: google.maps.DirectionsResult | undefined | null;
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
      { !directionResponse && source && <MarkerF position={source.geometry?.location?.toJSON()} />}
      { !directionResponse && destination && <MarkerF position={destination?.geometry?.location?.toJSON()} />}
    </GoogleMap>
  );  
};

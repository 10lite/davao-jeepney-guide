'use client';

import { DirectionsRenderer, GoogleMap, MarkerF } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

interface MapProps {
  source: google.maps.places.PlaceResult | undefined;
  destination: google.maps.places.PlaceResult | undefined;
  directionResponse: google.maps.DirectionsResult | undefined | null;
}

export const Map = ({ source, destination, directionResponse }: MapProps, selectedRoute : number) => {
  const initialCenter = new google.maps.LatLng(7.204899, 125.542159);
  const [center, setCenter] = useState<google.maps.LatLng>(initialCenter);

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  useEffect(() => {
    if (directionResponse) {
      const bounds = new google.maps.LatLngBounds();
      directionResponse.routes[0].legs.forEach((leg) => {
        bounds.extend(leg.start_location);
        bounds.extend(leg.end_location);
      });
      setCenter(bounds.getCenter());
    } else {
      setCenter(initialCenter);
    }
  }, [directionResponse, selectedRoute]);

  return (
    <GoogleMap
      zoom={11}
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
      {!directionResponse && source && <MarkerF position={source.geometry?.location?.toJSON()} />}
      {!directionResponse && destination && <MarkerF position={destination?.geometry?.location?.toJSON()} />}
    </GoogleMap>
  );
};

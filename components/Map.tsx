'use client'

import { 
  GoogleMap,
  useJsApiLoader
} from '@react-google-maps/api'

export const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-maps-id',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!
  });

  if (!isLoaded) return null;
  
  const center = new google.maps.LatLng(7.068489408423691, 125.61118715620856);

  const containerStyle = { 
    width: '100%',
    height: '100%'
  }
  
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
        rotateControl: false,
      }}
    >
    </GoogleMap>
  )
}

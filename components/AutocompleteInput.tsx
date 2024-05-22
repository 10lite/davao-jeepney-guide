'use client';

import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { useRef, useState } from 'react';

const AutocompleteInput = () => {
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!, // Make sure to use the correct environment variable
    id: 'google-maps',
    libraries: ['places']
  });

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log(place);
    } else {
      console.log('Autocomplete is not available');
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={{
          componentRestrictions: { country: 'ph' },
          bounds: new window.google.maps.LatLngBounds(
            new window.google.maps.LatLng(6.4718, 125.0136), // Southwest coordinates of Davao del Sur
            new window.google.maps.LatLng(7.6, 126.1555) // Northeast coordinates of Davao del Sur
          ),
          strictBounds: true
        }}>
        <input type='text' placeholder='Enter a location' ref={inputRef} style={{ width: '300px', height: '40px', padding: '10px' }} />
      </Autocomplete>
    </div>
  );
};

export default AutocompleteInput;

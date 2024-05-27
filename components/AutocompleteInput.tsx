'use client';

import { Autocomplete } from '@react-google-maps/api';
import { useRef, useState } from 'react';
import { Input } from './ui/input';

interface AutocompleteInputProps { 
  isLoaded: boolean;
  loadError: Error | undefined;
  selected: google.maps.places.PlaceResult | undefined;
  setSelected: React.Dispatch<React.SetStateAction<google.maps.places.PlaceResult | undefined>>;
}

const AutocompleteInput = ({ isLoaded, loadError, selected, setSelected }: AutocompleteInputProps) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef(null);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setSelected(place);
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
        <Input type='text' placeholder='Enter a location' ref={inputRef} style={{ width: '100%', height: '40px', padding: '10px' }} />
      </Autocomplete>
    </div>
  );
};

export default AutocompleteInput;

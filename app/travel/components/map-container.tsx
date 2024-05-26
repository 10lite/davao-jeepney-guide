// Components
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CommuteDetails from './commute-details';
import { Map } from '@/components/Map';

interface MapContainerProps {
  isLoaded: boolean;
  source: google.maps.places.PlaceResult | undefined;
  destination: google.maps.places.PlaceResult | undefined;
  directionResponse: google.maps.DirectionsResult | undefined;
}

export default function MapContainer({ isLoaded, source, destination, directionResponse }: MapContainerProps) {
  return (
    <Card className='w-full sm:w-[60%] sm:p-6 border-gray-400'>
      <CardHeader className='sm:pt-0'>
        <CardTitle>
          Traveling from <span className='underline'>{!source ? 'Source' : source?.name}</span> to{' '}
          <span className='underline'>{!destination ? 'Source' : destination?.name}</span>
        </CardTitle>
        <CardDescription>
          <CommuteDetails />
        </CardDescription>
      </CardHeader>
      <CardContent className='p-0 sm:px-6'>
        <div className='h-[20rem] bg-gray-200 rounded-b-lg'>
          <Map 
            source={source}
            destination={destination}
            directionResponse={directionResponse}
          />
        </div>
      </CardContent>
    </Card>
  );
}

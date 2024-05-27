// Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CommuteDetails from './commute-details';
import { Map } from '@/components/Map';

interface MapContainerProps {
  source: google.maps.places.PlaceResult | undefined;
  destination: google.maps.places.PlaceResult | undefined;
  directionResponse: google.maps.DirectionsResult | undefined;
  distanceResponse: google.maps.DistanceMatrixResponse | undefined;
}

export default function MapContainer({ source, destination, directionResponse, distanceResponse }: MapContainerProps) {
  return (
    <Card className='w-full sm:w-[60%] sm:p-6 border-gray-400'>
      <CardHeader className='sm:pt-0'>
        <CardTitle className="flex flex-col gap-1 sm:gap-2 items-center sm:items-start text-xl sm:text-2xl leading-6">
          {source === undefined && destination === undefined
            ? 'Input your route to locate jeepney routes.' 
            : 
            <>
              <header className="flex flex-col sm:flex-row font-normal gap-1 sm:gap-2">
                Traveling from
                <span className='font-semibold underline text-center'>{!source ? 'Source' : source?.name}</span> 
                to
                <span className='font-semibold underline  text-center'>{!destination ? '...' : destination?.name}</span>
              </header>
              <CommuteDetails 
                distance={distanceResponse?.rows[0].elements[0].distance.text}
                duration={distanceResponse?.rows[0].elements[0].duration.text}
              />
            </>
          }
        </CardTitle>
      </CardHeader>
      <CardContent className='p-0 sm:px-6'>
        <div className='h-[20rem] sm:h-[80vh] bg-gray-200 rounded-b-lg'>
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

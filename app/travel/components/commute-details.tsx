// Components
import { Badge } from '@/components/ui/badge';

interface CommuteDetailsProps {
  distance: string | undefined;
  duration: string | undefined;
  stops: number;
  fare: any;
}

export default function CommuteDetails({ distance, duration, stops, fare }: CommuteDetailsProps) {
  return (
    <div className='grid grid-cols-2 sm:flex ml-2 gap-2 mt-2 sm:mt-0'>
      <Badge>{distance}</Badge>
      <Badge>{duration}</Badge>
      <Badge>Regular: P{Math.round(fare.regular)}</Badge>
      <Badge>Discounted: P{Math.round(fare.discounted)}</Badge>
      <Badge>
        {stops} Ride{stops > 1 ? 's' : ''}
      </Badge>
    </div>
  );
}

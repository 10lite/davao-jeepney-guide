// Components
import { Badge } from "@/components/ui/badge"

interface CommuteDetailsProps { 
  distance: string | undefined;
  duration: string | undefined;
  stops: number;
}

export default function CommuteDetails({ distance, duration, stops } : CommuteDetailsProps ) {
  return (
    <div className="flex ml-2 gap-2 mt-2 sm:mt-0">
      <Badge>{ distance }</Badge>
      <Badge>{ duration }</Badge>
      <Badge>~25 PHP</Badge>  
      <Badge>{stops} Ride{stops > 1 ? 's' : ''}</Badge>
    </div>  
  )
}
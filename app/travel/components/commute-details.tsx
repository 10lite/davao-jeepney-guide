// Components
import { Badge } from "@/components/ui/badge"

interface CommuteDetailsProps { 
  distance: string | undefined;
  duration: string | undefined;
}

export default function CommuteDetails({ distance, duration } : CommuteDetailsProps ) {
  return (
    <div className="flex ml-2 gap-2 mt-2 sm:mt-0">
      <Badge>{ distance }</Badge>
      <Badge>{ duration }</Badge>
      <Badge>~25 PHP</Badge>  
      <Badge>2 Rides</Badge>
    </div>  
  )
}
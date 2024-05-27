// Components
import { Badge } from "@/components/ui/badge"

export default function CommuteDetails() {
  return (
    <div className="flex ml-2 gap-2 mt-2 sm:mt-0">
      <Badge>22.22 KM</Badge>
      <Badge>~25 PHP</Badge>  
      <Badge>2 Rides</Badge>
    </div>  
  )
}
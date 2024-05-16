// Components
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CommuteDetails from "./commute-details"

export default function MapContainer() {
  return (
    <Card className="w-full sm:w-[60%] sm:p-6 border-gray-400">
      <CardHeader className="sm:pt-0">
        <CardTitle>
          Traveling from <span className="underline">Source</span> to <span className="underline">Destination</span>
        </CardTitle>
        <CardDescription>
          <CommuteDetails />
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:px-6">
        <div className="h-[20rem] bg-gray-200 rounded-b-lg"></div>
      </CardContent>
    </Card>
  )
}
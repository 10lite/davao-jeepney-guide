// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function MapContainer() {
  return (
    <Card className="w-full sm:w-[60%] sm:p-6 border-gray-400">
      <CardHeader className="sm:pt-0">
        <CardTitle>Traveling from -- to --</CardTitle>
        <CardDescription>--.-- Kilometers | - Jeepney Rides</CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:px-6">
        <div className="h-[20rem] bg-gray-200 rounded-b-lg"></div>
      </CardContent>
    </Card>
  )
}
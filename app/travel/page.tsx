'use client'

// Components
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import MapContainer from "./components/map-container"
import { useState } from "react"
import { useJsApiLoader } from "@react-google-maps/api"
import AutocompleteInput from "@/components/AutocompleteInput"

export default function Travel() {
  const [ source, setSource ] = useState<google.maps.places.PlaceResult | undefined>();
  const [ destination, setDestination ] = useState<google.maps.places.PlaceResult | undefined>();
  const [directionResponse, setDirectionResponse] = useState<google.maps.DirectionsResult | null>();

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-maps',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,
    libraries: ['places']
  })

  if (loadError) return <div>Error</div>

  if (!isLoaded) return <div>Loading...</div>

  const calculateRoute = async () => {
    const directionsService = new google.maps.DirectionsService();

    if( source && destination ) {
      const results = await directionsService.route({ 
        origin: source.name,
        destination: destination.name,
        travelMode: google.maps.TravelMode.TRANSIT,
        provideRouteAlternatives: true,
      })
      setDirectionResponse(results)
      console.log(results)
    }

  }
  
  return (
    <main className="flex min-h-screen flex-col sm:flex-row justify-center items-center gap-4 sm:pt-12 p-6 bg-gray-100">
      <Card className="border-gray-400">
        <CardHeader className="pb-2 sm:pb-6">
          <CardTitle>Where are you commuting to?</CardTitle>
          <CardDescription>Input your source and destination to locate jeepney routes.</CardDescription>
        </CardHeader>
        <CardContent className="pb-4 sm:pb-6">
          <form>
            <div className="grid w-full items-center gap-2 sm:gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="from">From</Label>
                <AutocompleteInput 
                  isLoaded={isLoaded}
                  loadError={loadError}
                  selected={source}
                  setSelected={setSource}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="to">To</Label>
                <AutocompleteInput 
                  isLoaded={isLoaded}
                  loadError={loadError}
                  selected={destination}
                  setSelected={setDestination}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Cancel</Link>
          </Button>
          <Button onClick={() => calculateRoute()}>Search Jeepneys</Button>
        </CardFooter>
      </Card>
      <MapContainer 
        isLoaded={isLoaded}
        source={source}
        destination={destination}
        directionResponse={directionResponse}
      />
    </main>
  )
}
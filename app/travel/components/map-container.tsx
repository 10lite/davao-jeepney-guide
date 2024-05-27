// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommuteDetails from "./commute-details";
import { Map } from "@/components/Map";

interface MapContainerProps {
  source: google.maps.places.PlaceResult | undefined;
  destination: google.maps.places.PlaceResult | undefined;
  directionResponse: google.maps.DirectionsResult | undefined;
  distanceResponse: google.maps.DistanceMatrixResponse | undefined;
  selectedRoute: number | 0;
}

export default function MapContainer({
  source,
  destination,
  directionResponse,
  distanceResponse,
  selectedRoute,
}: MapContainerProps) {
  return (
    <Card className="w-full sm:w-[60%] sm:p-0 border-gray-400">
      <CardHeader>
        <CardTitle className="flex flex-col gap-1 sm:gap-2 items-center sm:items-start text-xl sm:text-2xl leading-6">
          {source === undefined && destination === undefined ? (
            "Input your route to locate jeepney routes"
          ) : (
            <>
              <header className="flex flex-col sm:flex-row font-normal gap-1 sm:gap-2">
                Traveling from
                <span className="font-semibold underline">
                  {!source ? "Source" : source?.name}
                </span>
                to
                <span className="font-semibold underline">
                  {!destination ? "..." : destination?.name}
                </span>
              </header>
              {directionResponse && (
                <CommuteDetails
                  distance={
                    directionResponse?.routes[selectedRoute]?.legs[0]?.distance
                      ?.text
                  }
                  duration={
                    directionResponse?.routes[selectedRoute]?.legs[0]?.duration
                      ?.text
                  }
                  /* Stops = Number of Transit steps */
                  stops={
                    directionResponse?.routes[
                      selectedRoute
                    ]?.legs[0]?.steps.filter(
                      (step) => step.travel_mode === "TRANSIT"
                    ).length || 0
                  }
                />
              )}
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[20rem] sm:h-[80vh] bg-gray-200 rounded-b-lg">
          <Map
            source={source}
            destination={destination}
            directionResponse={directionResponse}
            selectedRoute={selectedRoute}
          />
        </div>
      </CardContent>
    </Card>
  );
}

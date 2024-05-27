"use client";

// Components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import MapContainer from "./components/map-container";
import { useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import AutocompleteInput from "@/components/AutocompleteInput";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import DavaoWeather from "@/components/DavaoWeather";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Travel() {
  const [source, setSource] = useState<google.maps.places.PlaceResult>();
  const [destination, setDestination] =
    useState<google.maps.places.PlaceResult>();
  const [directionResponse, setDirectionResponse] =
    useState<google.maps.DirectionsResult>();
  const [distanceResponse, setDistanceResponse] =
    useState<google.maps.DistanceMatrixResponse>();
  const [selectedRoute, setSelectedRoute] = useState<number>();
  const [fare, setFare] = useState<any[]>([{}]);
  const [instructions, setInstructions] =
    useState<google.maps.DirectionsStep[]>();

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-maps",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,
    libraries: ["places"],
  });

  if (loadError) return <div>Error</div>;

  if (!isLoaded) return <div>Loading...</div>;

  const calculateRoute = async () => {
    const directionsService = new google.maps.DirectionsService();
    const distanceService = new google.maps.DistanceMatrixService();

    if (source && destination) {
      const results = await directionsService.route({
        origin: source.name!,
        destination: destination.name!,
        travelMode: google.maps.TravelMode.TRANSIT,
        provideRouteAlternatives: true,
        optimizeWaypoints: true,
      });
      // Sort routes by duration
      results.routes.sort((a, b) => {
        const durationA = a.legs.reduce(
          (total, leg) => total + leg.duration!.value,
          0
        );
        const durationB = b.legs.reduce(
          (total, leg) => total + leg.duration!.value,
          0
        );
        return durationA - durationB;
      });
      setDirectionResponse(results);
      setSelectedRoute(0);

      results.routes.map((route, index) => {
        const calcFare = { regular: 0, discounted: 0 };
        route.legs.map((leg) => {
          leg.steps.map((step) => {
            if (step.travel_mode === "TRANSIT") {
              const distance = Math.floor(step.distance?.value! / 1000);
              const regularFare = 12;
              const discountedFare = 9.6;
              const regularFareAdd = 1.8;
              const discountedFareAdd = 1.44;

              if (distance <= 4) {
                calcFare.regular = regularFare;
                calcFare.discounted = discountedFare;
              } else {
                calcFare.regular =
                  regularFare + regularFareAdd * (distance - 4);
                calcFare.discounted =
                  discountedFare + discountedFareAdd * (distance - 4);
              }
            }
          });
        });

        // Convert fare values to strings with max 2 decimal points
        const roundedRegular = calcFare.regular.toFixed(2);
        const roundedDiscounted = calcFare.discounted.toFixed(2);

        // Update fare state by creating a new array with the updated fare for the current route
        setFare((prevState) => [
          ...prevState.slice(0, index), // Keep the previous fare objects before the current index
          {
            regular: parseFloat(roundedRegular),
            discounted: parseFloat(roundedDiscounted),
          }, // Add the new fare object for the current route
          ...prevState.slice(index + 1), // Keep the previous fare objects after the current index
        ]);

        // Returning the fare just for logging purposes, you might not need this
        return calcFare;
      });

      const distanceResults = await distanceService.getDistanceMatrix({
        origins: [source.name!],
        destinations: [destination.name!],
        travelMode: google.maps.TravelMode.TRANSIT,
        unitSystem: google.maps.UnitSystem.METRIC,
      });
      setDistanceResponse(distanceResults);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col ${
        directionResponse && "flex-col-reverse"
      } sm:flex-row justify-center items-center gap-12 p-6 bg-gray-100 relative`}
    >
      {!directionResponse ? (
        <div className="flex flex-col space-y-5">
          <Card className="border-gray-400">
            <CardHeader className="pb-2 sm:pb-6">
              <CardTitle>Where are you commuting to?</CardTitle>
              <CardDescription>
                Input your source and destination to locate jeepney routes.
              </CardDescription>
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
          <DavaoWeather className="hidden sm:block" />
        </div>
      ) : (
        <Card className="border-gray-400">
          <CardHeader className="pb-2 sm:pb-6">
            <CardTitle>Available Routes</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 sm:pb-6">
            <Accordion type="single" collapsible className="w-full">
              {directionResponse.routes.map((route, index) => (
                <AccordionItem key={index} value={index.toString()}>
                  <AccordionTrigger>
                    <Card key={index} className="border-gray-400 mb-4">
                      <button
                        onClick={() => {
                          setSelectedRoute(index);
                          setInstructions(route.legs[0].steps);
                        }}
                      >
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-xl">
                            Route {index + 1}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                          <div className="flex flex-col text-sm">
                            <span>
                              Distance: {route.legs[0]?.distance?.text ?? ""}
                            </span>
                            <span>
                              Duration: {route.legs[0]?.duration?.text ?? ""}
                            </span>
                          </div>
                        </CardContent>
                      </button>
                    </Card>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="relative before:absolute before:bg-gray-300 before:w-0.5 before:left-4 before:top-0 before:bottom-0">
                      {instructions?.map((instruction, index) => (
                        <div key={index} className="mb-4 pl-8 relative">
                          {instruction.travel_mode === "WALKING" ? (
                            <div>
                              <div className="absolute left-2 top-0 w-4 h-4 bg-gray-800 rounded-full border border-white"></div>
                              <h3 className="text-md font-semibold">WALK</h3>
                              <p className="text-xs text-gray-500">
                                About {instruction.duration?.text},{" "}
                                {instruction.distance?.text}
                              </p>
                              <div className="my-2">
                                {instruction.steps?.map((step, stepIndex) => (
                                  <div
                                    key={stepIndex}
                                    className="flex items-center mb-2"
                                  >
                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: step.instructions,
                                      }}
                                    ></p>
                                  </div>
                                ))}
                              </div>
                              {index === instructions.length - 1 && (
                                <div>
                                  <div className="border-t border-gray-400 my-4"></div>
                                  <h3 className="text-md font-semibold relative">
                                    <div className="absolute left-[-24px] top-0 w-4 h-4 bg-gray-800 rounded-full border border-white"></div>
                                    {destination?.name}
                                  </h3>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: instruction.instructions,
                                    }}
                                    className="text-xs text-gray-500"
                                  ></p>
                                </div>
                              )}
                              <div className="border-t border-gray-400 my-4"></div>
                            </div>
                          ) : (
                            <div>
                              <div className="absolute left-2 top-0 w-4 h-4 bg-gray-800 rounded-full border border-white"></div>
                              <div className="flex items-center mb-2">
                                <Badge className="mr-2">
                                  {instruction.transit?.line.name}
                                </Badge>
                                <p>{instruction.transit?.headsign}</p>
                              </div>
                              <div className="border-t border-gray-400 my-4"></div>
                              <p className="font-semibold relative">
                                <div className="absolute left-[-24px] top-0 w-4 h-4 bg-gray-800 rounded-full border border-white"></div>
                                {instruction.transit?.arrival_stop.name}
                              </p>
                              <div className="border-t border-gray-400 my-4"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
      <MapContainer
        source={source}
        destination={destination}
        directionResponse={directionResponse}
        distanceResponse={distanceResponse}
        selectedRoute={selectedRoute!}
      />
      {/* <div>
        {instructions?.map((instruction, index) => (
          <div key={index} className="mb-4">
            {instruction.travel_mode === "WALKING" ? (
              <div>
                <h3 className="text-md font-semibold">WALK</h3>
                <p className="text-xs text-gray-500">
                  About {instruction.duration?.text},{" "}
                  {instruction.distance?.text}
                </p>
                <div className="pl-5 my-2">
                  {instruction.steps?.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <p
                        dangerouslySetInnerHTML={{ __html: step.instructions }}
                      ></p>
                    </div>
                  ))}
                </div>
                {index === instructions.length - 1 && (
                  <div>
                    <div className="border-t border-gray-400 my-4"></div>
                    <h3 className="text-md font-semibold">
                      {destination?.name}
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: instruction.instructions,
                      }}
                      className="text-xs text-gray-500"
                    ></p>
                  </div>
                )}
                <div className="border-t border-gray-400 my-4"></div>
              </div>
            ) : (
              <div>
                <div className="flex items-center mb-2">
                  <Badge className="mr-2">
                    {instruction.transit?.line.name}
                  </Badge>
                  <p>{instruction.transit?.headsign}</p>
                </div>
                <div className="border-t border-gray-400 my-4"></div>
                <p className="font-semibold">
                  {instruction.transit?.arrival_stop.name}
                </p>
                <div className="border-t border-gray-400 my-4"></div>
              </div>
            )}
          </div>
        ))}
      </div> */}

      {/* <div className="relative before:absolute before:bg-gray-300 before:w-0.5 before:left-4 before:top-0 before:bottom-0">
        {instructions?.map((instruction, index) => (
          <div key={index} className="mb-4 pl-8 relative">
            {instruction.travel_mode === "WALKING" ? (
              <div>
                <div className="absolute left-2 top-0 w-4 h-4 bg-gray-800 rounded-full border border-white"></div>
                <h3 className="text-md font-semibold">WALK</h3>
                <p className="text-xs text-gray-500">
                  About {instruction.duration?.text},{" "}
                  {instruction.distance?.text}
                </p>
                <div className="my-2">
                  {instruction.steps?.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <p
                        dangerouslySetInnerHTML={{ __html: step.instructions }}
                      ></p>
                    </div>
                  ))}
                </div>
                {index === instructions.length - 1 && (
                  <div>
                    <div className="border-t border-gray-400 my-4"></div>
                    <h3 className="text-md font-semibold relative">
                      <div className="absolute left-[-24px] top-0 w-4 h-4 bg-gray-800 rounded-full border border-white"></div>
                      {destination?.name}
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: instruction.instructions,
                      }}
                      className="text-xs text-gray-500"
                    ></p>
                  </div>
                )}
                <div className="border-t border-gray-400 my-4"></div>
              </div>
            ) : (
              <div>
                <div className="absolute left-2 top-0 w-4 h-4 bg-gray-800 rounded-full border border-white"></div>
                <div className="flex items-center mb-2">
                  <Badge className="mr-2">
                    {instruction.transit?.line.name}
                  </Badge>
                  <p>{instruction.transit?.headsign}</p>
                </div>
                <div className="border-t border-gray-400 my-4"></div>
                <p className="font-semibold relative">
                  <div className="absolute left-[-24px] top-0 w-4 h-4 bg-gray-800 rounded-full border border-white"></div>
                  {instruction.transit?.arrival_stop.name}
                </p>
                <div className="border-t border-gray-400 my-4"></div>
              </div>
            )}
          </div>
        ))}
      </div> */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="absolute bottom-8 right-8 sm:hidden">
            View Weather
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Davao Current Condition</DialogTitle>
          </DialogHeader>
          <div>
            <DavaoWeather />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

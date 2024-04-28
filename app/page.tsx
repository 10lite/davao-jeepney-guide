import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Coins, Navigation, Route } from "lucide-react";

export default function Home() {
  const APP_FEATURES: { title: string, description: string, icon: JSX.Element }[] = [
    {
      title: "Jeepney Routes",
      description: "View the routes of jeepneys in Davao City.",
      icon: <Route size={64} />
    },
    {
      title: "Know Which Jeep to Ride",
      description: "Input your destination and know which jeep to ride.",
      icon: <Navigation size={64} />,
    },
    {
      title: "Fare Estimation",
      description: "Estimate your fare based on your commute's distance.",
      icon: <Coins size={64} />
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 sm:gap-[5rem] sm:pt-[10%]">
      <header className="p-10 flex flex-col gap-4 sm:gap-6 items-center">
        <h1 className="text-4xl sm:text-[4rem] font-bold text-center">Davao Jeepney Guide</h1>
        <p className="text-lg sm:text-3xl text-center leading-5">
          Optimize your commute experience in Davao City!
        </p>
        <Button className="text-lg sm:text-xl px-6 sm:h-[3rem] rounded-2xl sm:w-[30%] mt-8">Get Started</Button>
      </header>
      <section className="w-full flex flex-col gap-6 sm:grid sm:grid-cols-3 justify-center items-center px-6 sm:px-[20%] mb-10 sm:mb-0">
        <h1 className="col-span-3 text-[1.75rem] sm:text-[2.75rem] font-semibold text-center">Features</h1>
        {APP_FEATURES.map((feature, index) => (
          <Card key={index} className="col-span-1 flex flex-col justify-center items-center p-6">
            {feature.icon}
            <CardTitle className="text-xl font-semibold mt-4">{feature.title}</CardTitle>
            <CardContent className="p-0 sm:w-[70%] text-center">{feature.description}</CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}

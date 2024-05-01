// Components
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <header className="p-10 flex flex-col gap-4 sm:gap-6 items-center">
      <h1 className="text-4xl sm:text-[4rem] font-bold text-center">Davao Jeepney Guide</h1>
      <p className="text-lg sm:text-3xl text-center leading-5">
        Optimize your commute experience in Davao City!
      </p>
      <Button className="text-lg sm:text-xl px-6 sm:h-[3rem] rounded-2xl sm:w-[30%] mt-8">Get Started</Button>
    </header>
  )
}
// Components
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <header className="p-10 flex flex-col-reverse sm:flex-row sm:gap-6 items-center justify-between">
      <section className="flex flex-col gap-2 sm:gap-5 items-center sm:items-start">
        <h1 className="text-4xl sm:text-[4rem] font-bold text-center">Davao Jeepney Guide</h1>
        <p className="text-lg sm:text-2xl text-center leading-5">
          Optimize your commute experience in Davao City!
        </p>
        <Button className="text-lg sm:text-xl px-6 sm:h-[3rem] rounded-2xl sm:w-[30%] mt-8" asChild>
          <Link href="/travel">Get Started</Link>
        </Button>
      </section>
      <Image src="/hero.png" alt="Traveler" width={300} height={300} />
    </header>
  )
}
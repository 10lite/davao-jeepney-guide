// Components
import Features from "./components/features";
import Hero from "./components/hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 sm:gap-[5rem] sm:pt-[5%] bg-gray-100">
      <Hero />
      <Features />
    </main>
  );
}

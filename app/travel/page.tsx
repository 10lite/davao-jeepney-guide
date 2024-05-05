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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select"

export default function Travel() {
  const JEEPNEY_STOPS: { value: string, label: string }[] = [
    { value: "mintal", label: "Mintal" },
    { value: "toril", label: "Toril" },
    { value: "sasa", label: "Sasa" },
    { value: "buhangin", label: "Buhangin" },
    { value: "matina", label: "Matina" },
    { value: "bangkal", label: "Bangkal" },
    { value: "panacan", label: "Panacan" },
    { value: "agdao", label: "Agdao" },
    { value: "bajada", label: "Bajada" },
    { value: "lanang", label: "Lanang" },
    { value: "cabantian", label: "Cabantian" },
    { value: "tigatto", label: "Tigatto" },
    { value: "indangan", label: "Indangan" },
    { value: "sirawan", label: "Sirawan" },
    { value: "calinan", label: "Calinan" },
    { value: "talandang", label: "Talandang" },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 sm:gap-[5rem] sm:pt-[10%] p-6">
      <Card>
        <CardHeader>
          <CardTitle>Where are you commuting to?</CardTitle>
          <CardDescription>Input your source and destination to locate jeepney routes.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="from">From</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      {JEEPNEY_STOPS.map((stop) => (
                        <SelectItem key={stop.value} value={stop.value}>
                          {stop.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="to">To</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Destination" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      {JEEPNEY_STOPS.map((stop) => (
                        <SelectItem key={stop.value} value={stop.value}>
                          {stop.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Cancel</Link>
          </Button>
          <Button>Search Jeepneys</Button>
        </CardFooter>
      </Card>
    </main>
  )
}
import { getPoolsAction } from "@/app/actions";
import LotteryDialog from "@/components/LotteryModal";
import Share from "@/components/Share";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default async function Pools() {
  const pools = await getPoolsAction();

  return (
    <div className="flex flex-col overflow-hidden p-2 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Meus Boloes</h1>
        <LotteryDialog text="Novo Bolão" />
      </div>
      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {pools.map((pool) => (
          <Card
            key={pool.identifier}
            className="w-screen overflow-hidden md:w-full"
          >
            <CardHeader>
              <CardTitle>{pool.name}</CardTitle>
              <CardDescription>Mega Sena</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[180px] gap-2">
                {pool.bets.map((bet) => (
                  <div key={bet.id} className="w-full space-y-2 rounded p-2">
                    <p className="font-semibold">{bet.name}</p>
                    <p className="space-x-2 text-sm text-muted-foreground">
                      {bet.numbers.map((n, index) => (
                        <span
                          key={bet.id + index}
                          className="rounded-full bg-primary p-1 text-white"
                        >
                          {n.toString().padStart(2, "0")}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Share />
              <Button>
                <Link href={`/bets/${pool.identifier}`}>Acessar</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

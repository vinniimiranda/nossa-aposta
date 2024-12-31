"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import LotteryDialog from "../../components/LotteryModal";
import Share from "../../components/Share";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";

interface Bet {
  id: number;
  name: string;
  numbers: number[];
  identifier: string;
}

export interface GroupedBets {
  identifier: string;
  bets: Bet[];
}

export default function Bets() {
  const [bets, setBets] = useState<GroupedBets[]>([]);

  useEffect(() => {
    async function fetchBets() {
      const res = await fetch("/api/bets");
      const data = await res.json();

      if (!data) {
        return;
      }
      setBets(data as GroupedBets[]);
    }

    void fetchBets();
  }, []);
  return (
    <div className="flex-1 flex-col p-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Meus Boloes</h1>
        <LotteryDialog text="Novo Bolão" />
      </div>
      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2">
        {bets.map((bet) => (
          <Card key={bet.identifier}>
            <CardHeader>
              <CardTitle>Bolão #{bet.identifier}</CardTitle>
              <CardDescription>Mega Sena</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="grid h-[150px] grid-cols-1 gap-2">
                {bet.bets.map((bet) => (
                  <div key={bet.id} className="w-full space-y-2 rounded p-2">
                    <p className="font-semibold">{bet.name}</p>
                    <p className="space-x-2 text-sm text-muted-foreground">
                      {bet.numbers.map((n, index) => (
                        <span
                          key={bet.id + n + index}
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
                <Link href={`/bets/${bet.identifier}`}>Acessar</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

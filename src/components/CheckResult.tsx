"use client";
import { type Bet, type Pool } from "@/types";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PartyPopper } from "lucide-react";
import { useEffect, useState } from "react";
import { NumberSelector } from "./NumberSelector";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

interface LotteryDialogProps {
  pool: Pool;
}

export default function CheckResult(props: LotteryDialogProps) {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [result, setResult] = useState<{ matches: number; bets: Bet[] }[]>([]);

  const checkResult = () => {
    const matches = props.pool.bets.map((bet) => {
      const matchCount = bet.numbers.filter((num) =>
        numbers.includes(num),
      ).length;
      return { matchCount, bet };
    });

    const groupedResults = matches.reduce(
      (acc, { matchCount, bet }) => {
        if (matchCount >= 4) {
          acc[matchCount] = acc[matchCount] ?? [];
          acc[matchCount].push(bet);
        }
        return acc;
      },
      {} as Record<number, Bet[]>,
    );

    const resultArray = Object.entries(groupedResults).map(([key, bets]) => ({
      matches: Number(key),
      bets,
    }));
    console.log(resultArray);

    setResult(resultArray);
  };

  useEffect(() => {
    return () => {
      setResult([]);
      setNumbers([]);
    };
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 text-white hover:bg-green-600">
          <PartyPopper />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Vamos conferir se você ganhou!</DialogTitle>
        <p>Escolha os números que foram sorteados.</p>
        <NumberSelector
          numbers={numbers}
          setNumbers={setNumbers}
          maxNumbers={6}
          minNumbers={6}
        />
        <Button onClick={checkResult}>Verificar</Button>
        <div className="mt-4 flex flex-col gap-4">
          {result.map(({ matches, bets }) => (
            <div key={matches} className="flex flex-col gap-2">
              <h3 className="text-lg font-bold">
                {matches} números acertados:
              </h3>
              {bets.map((bet, index) => (
                <div key={index} className="flex items-center">
                  <span className="mr-2 font-medium">{bet.name}</span>
                  <div className="flex gap-2">
                    {bet.numbers.map((n) => (
                      <span
                        key={n}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { NumberSelector } from "@/components/NumberSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LucideDices } from "lucide-react";
import { type Usable, use, useCallback, useEffect, useState } from "react";
import CheckResult from "../../../components/CheckResult";
import Share from "../../../components/Share";
import { generateRandomNumbers } from "../../../lib/utils";

interface Bet {
  id: number;
  name: string;
  numbers: number[];
  identifier: string;
}
export default function BetsPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id } = use(params as unknown as Usable<{ id: string }>);
  const [bets, setBets] = useState<Bet[]>([]);
  const [name, setName] = useState("Aposta 1");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [amount, setAmount] = useState(6);

  const randomNumbers = useCallback(() => {
    const randomNumbers = generateRandomNumbers(1, 60, amount);
    setNumbers(randomNumbers);
  }, [amount]);

  const addBet = useCallback(async () => {
    if (name && numbers.length === amount) {
      const bet: Bet = {
        id: Date.now(),
        name: name,
        identifier: id,
        numbers: numbers,
      };
      setBets((prevBets) => [...prevBets, bet]);
      await fetch("/api/bets/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bet),
      });
      setName(`Aposta ${bets.length + 2}`);
      setNumbers([]);
    }
  }, [name, numbers, amount, bets, id]);

  useEffect(() => {
    async function fetchBets() {
      const res = await fetch("/api/bets/" + id);
      const data = await res.json();

      if (!data) {
        return;
      }
      setBets(data as Bet[]);
    }

    void fetchBets();
  }, [id]);
  return (
    <div className="xs:p-0 flex-1 flex-col p-8">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h1 className="flex-1 text-2xl font-bold">
          Cadastro de Apostas (Bolão) #{id}
        </h1>
        <Share />
        <CheckResult bets={bets} />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Nova Aposta</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <Label htmlFor="nome">Nome da Aposta</Label>
              <Input
                id="nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome da sua aposta"
              />
            </div>
            <div>
              <Label htmlFor="quantidade">Quantidade de Números</Label>
              <Select
                value={amount.toString()}
                onValueChange={(value) => setAmount(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a quantidade" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 6).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} números
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Selecione os Números</Label>
              <NumberSelector
                setNumbers={setNumbers}
                numbers={numbers}
                minNumbers={amount}
                maxNumbers={amount}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                className="items-center justify-center"
                onClick={randomNumbers}
              >
                <LucideDices />
                Sortear
              </Button>
              <Button
                type="submit"
                onClick={addBet}
                disabled={numbers.length !== amount}
              >
                Adicionar Aposta
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="">
        <CardHeader>
          <CardTitle>Apostas Cadastradas</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[350px] px-0">
            <div className="grid grid-cols-2 gap-2">
              {bets.map((bet) => (
                <div
                  key={bet.id}
                  className="w-full space-y-2 rounded bg-secondary p-2"
                >
                  <p className="font-semibold">{bet.name}</p>
                  <p className="space-x-1 text-sm text-muted-foreground">
                    {bet.numbers.map((n) => (
                      <span
                        key={bet.id + n}
                        className="rounded-full bg-primary p-1 text-white"
                      >
                        {n.toString().padStart(2, "0")}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

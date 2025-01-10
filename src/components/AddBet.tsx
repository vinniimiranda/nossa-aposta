"use client";

import { NumberSelector } from "@/components/NumberSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateRandomNumbers } from "@/lib/utils";
import type { Pool } from "@/types";
import { LucideDices } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function AddBet({
  id,
  pool,
}: Readonly<{ id: string; pool?: Pool }>) {
  const [name, setName] = useState("Aposta 1");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [amount, setAmount] = useState(6);
  const router = useRouter();

  const randomNumbers = useCallback(() => {
    const randomNumbers = generateRandomNumbers(1, 60, amount);
    setNumbers(randomNumbers);
  }, [amount]);

  const addBet = useCallback(async () => {
    if (name && numbers.length === amount) {
      const bet = {
        name: name,
        identifier: id,
        numbers: numbers,
        poolId: pool?.id ?? 0,
      };
      await fetch("/api/bets/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bet),
      });
      setNumbers([]);
      router.refresh();
    }
  }, [name, numbers, amount, id]);

  return (
    <Card>
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
  );
}

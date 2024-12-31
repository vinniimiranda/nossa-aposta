"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CloverIcon, DollarSignIcon, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { generateUniqueId } from "../lib/utils";

const lotteryTypes = [
  {
    name: "Mega Sena da Virada",
    description: "Sorteio especial de fim de ano com prêmios milionários",
    icon: StarIcon,
  },
  {
    name: "Lotofácil",
    description: "Aposte em 15 números para ganhar",
    icon: CloverIcon,
  },
  {
    name: "Quina",
    description: "Escolha 5 números e concorra a prêmios",
    icon: DollarSignIcon,
  },
];

interface LotteryDialogProps {
  text: string;
}

export default function LotteryDialog({ text }: LotteryDialogProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleCreateLottery = () => {
    const uniqueId = generateUniqueId(8);
    router.push(`/bets/${uniqueId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">{text}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tipos de Apostas</DialogTitle>
          <DialogDescription>
            Escolha um tipo de loteria para fazer sua aposta.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {lotteryTypes.map((lottery, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-colors hover:bg-accent"
              onClick={handleCreateLottery}
            >
              <CardHeader className="flex flex-row items-center gap-4 p-4">
                <lottery.icon className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{lottery.name}</CardTitle>
                  <CardDescription>{lottery.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

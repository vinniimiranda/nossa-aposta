import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { createPool, getLotteryAction } from "../app/actions";
import { SubmitButton } from "./SubmitButton";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface LotteryDialogProps {
  text: string;
}

export default async function LotteryDialog({ text }: LotteryDialogProps) {
  const lotteries = await getLotteryAction();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{text}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Começe seu bolão preenchendo os dados</DialogTitle>
          <DialogDescription>
            Escolha um tipo de loteria para fazer sua aposta.
          </DialogDescription>
        </DialogHeader>

        <form className="flex min-w-64 flex-1 flex-col">
          <div className="flex flex-col gap-3">
            <Label htmlFor="name">Nome</Label>
            <Input
              name="name"
              placeholder="Bolão de fim de ano da familia"
              required
            />
            <Label htmlFor="lottery">Loteria</Label>
            <Select name="lottery">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolha uma loteria" />
              </SelectTrigger>
              <SelectContent popover="auto">
                {lotteries.map((lottery) => (
                  <SelectItem key={lottery.value} value={lottery.value}>
                    <div className="flex w-full flex-1 flex-row items-center justify-between gap-3">
                      <Image
                        src={lottery.icon}
                        alt={lottery.name}
                        width={24}
                        height={24}
                      />
                      {lottery.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label htmlFor="drawDate">Data de Sorteio</Label>
            <Input
              type="datetime-local"
              name="drawDate"
              placeholder="31/12/2025"
              minLength={6}
              required
              className="w-full"
            />
            <SubmitButton formAction={createPool} pendingText="Cadastrando...">
              Cadastrar
            </SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

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
import { useState } from "react";
import { createPool } from "../app/actions";
import { SubmitButton } from "./SubmitButton";
import { Input } from "./ui/input";

interface LotteryDialogProps {
  text: string;
}

export default function LotteryDialog({ text }: LotteryDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <div className="flex flex-col gap-2 [&>input]:mb-3">
            <Label htmlFor="name">Nome</Label>
            <Input
              name="name"
              placeholder="Bolão de fim de ano da familia"
              required
            />
            <Label htmlFor="lottery">Loteria</Label>
            <Input
              type="lottery"
              name="lottery"
              placeholder="Mega Sena"
              minLength={6}
              required
            />
            <Label htmlFor="drawDate">Data de Sorteio</Label>
            <Input
              type="drawDate"
              name="drawDate"
              placeholder="31/12/2025"
              minLength={6}
              required
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

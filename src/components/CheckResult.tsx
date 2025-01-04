import { DialogTrigger } from "@radix-ui/react-dialog";
import { Check } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { NumberSelector } from "./NumberSelector";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

interface Bet {
  id: number;
  name: string;
  numbers: number[];
  identifier: string;
}
interface LotteryDialogProps {
  bets: Bet[];
  setResult: Dispatch<SetStateAction<number[]>>;
}

export default function CheckResult(props: LotteryDialogProps) {
  const [numbers, setNumbers] = useState<number[]>([]);

  const checkResult = () => {
    // const result = props.bets.find((bet) => {
    //   return numbers.every((num) =>
    //     bet.numbers.map(Number).includes(Number(num)),
    //   );
    // });
    // if (result) {

    // }
    props.setResult(numbers);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 text-white hover:bg-green-600">
          <Check />
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
      </DialogContent>
    </Dialog>
  );
}

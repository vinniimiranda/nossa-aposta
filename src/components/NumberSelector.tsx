import { Button } from "@/components/ui/button";

interface NumberSelectorProps {
  numbers: number[];
  setNumbers: React.Dispatch<React.SetStateAction<number[]>>;
  minNumbers: number;
  maxNumbers: number;
}

export function NumberSelector({
  numbers,
  setNumbers,
  minNumbers,
  maxNumbers,
}: NumberSelectorProps) {
  const toggleNumber = (num: number) => {
    setNumbers((prev) => {
      if (prev.includes(num)) {
        return prev.filter((n) => n !== num);
      } else if (prev.length < maxNumbers) {
        return [...prev, num].sort((a, b) => a - b);
      }
      return prev;
    });
  };

  return (
    <div className="grid grid-cols-10 gap-2">
      {Array.from({ length: 60 }, (_, i) => i + 1).map((num) => (
        <Button
          key={num}
          variant={numbers.includes(num) ? "default" : "outline"}
          className="h-10 w-10 p-0"
          onClick={() => toggleNumber(num)}
          disabled={!numbers.includes(num) && numbers.length >= maxNumbers}
        >
          {num.toString().padStart(2, "0")}
        </Button>
      ))}
    </div>
  );
}

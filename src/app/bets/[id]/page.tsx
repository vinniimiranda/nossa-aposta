import { getPoolByIdAction } from "@/app/actions";
import AddBet from "@/components/AddBet";
import Share from "@/components/Share";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import CheckResult from "../../../components/CheckResult";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Bet({ params }: Props) {
  const { id } = await params;
  const pool = await getPoolByIdAction(id);

  return (
    <div className="xs:p-0 flex-1 flex-col p-8">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h1 className="flex-1 text-2xl font-bold">{pool?.name}</h1>
        <Share />
        <CheckResult pool={pool} />
      </div>
      <div className="md:grid-cols-1fr grid gap-6">
        {pool?.isOwner && <AddBet id={id} pool={pool} />}
        <Card className="">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>{pool?.lottery}</CardTitle>
            <span className="text-sm text-muted-foreground">
              Data de Sorteio: {new Date(pool?.drawDate).toLocaleDateString()}
            </span>
          </CardHeader>
          <CardContent>
            <ScrollArea className="px-0">
              <div className="grid grid-cols-2 gap-2">
                {pool?.bets.map((bet) => (
                  <div
                    key={bet.id}
                    className="w-full space-y-2 rounded bg-secondary p-2"
                  >
                    <p className="font-semibold">{bet.name}</p>
                    <p className="space-x-1 text-sm text-muted-foreground">
                      {bet.numbers.map((n) => (
                        <span
                          key={bet.id + n}
                          className="rounded-full bg-muted-foreground p-1 text-white"
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
    </div>
  );
}

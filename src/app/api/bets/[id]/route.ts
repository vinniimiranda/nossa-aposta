import { eq } from "drizzle-orm";
import { db } from "../../../../server/db";
import { bets } from "../../../../server/db/schema";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const result = await db.select().from(bets).where(eq(bets.identifier, id));

  return new Response(
    JSON.stringify(
      result.map((bet) => {
        return {
          id: bet.id,
          name: bet.name,
          numbers: bet.numbers.sort((a, b) => Number(a) - Number(b)),
          identifier: bet.identifier,
        };
      }),
    ),
  );
}

export async function POST(request: Request) {
  const body = await request.json();

  const bet = await db
    .insert(bets)
    .values({
      identifier: body.identifier,
      name: body.name,
      numbers: body.numbers,
      poolId: body.poolId,
    })
    .returning();
  return new Response(JSON.stringify(bet));
}

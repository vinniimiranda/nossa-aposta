import { db } from "../../../../server/db";
import { bets } from "../../../../server/db/schema";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const bets = await db.query.bets.findMany({
    where: (bets, { eq }) => eq(bets.identifier, id),
  });

  return new Response(JSON.stringify(bets));
}

export async function POST(request: Request) {
  const body = await request.json();

  const bet = await db
    .insert(bets)
    .values({
      identifier: body.identifier,
      name: body.name,
      numbers: body.numbers.toString(),
    })
    .returning();
  return new Response(JSON.stringify(bet));
}

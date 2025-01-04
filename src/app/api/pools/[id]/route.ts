import { db } from "@/server/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;

  const result = await db.query.pools.findFirst({
    where: (pools, { eq }) => eq(pools.identifier, id),
    with: {
      bets: true,
    },
  });

  return new Response(JSON.stringify(result));
}

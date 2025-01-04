import { db } from "@/server/db";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const result = await db.query.pools.findMany({
    where: (pools, { eq }) => eq(pools.owner, session?.user.email!),
    with: {
      bets: true,
    },
  });

  return new Response(JSON.stringify(result));
}

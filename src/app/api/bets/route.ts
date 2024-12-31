import { createClient } from "@/utils/supabase/server";
import { sql } from "drizzle-orm";
import { db } from "../../../server/db";

export interface Bet {
  id: number;
  name: string;
  numbers: string[];
  identifier: string;
}

export interface GroupedBet {
  identifier: string;
  bets: Bet[];
}

export async function GET(request: Request) {
  const supabase = await createClient();

  const session = await supabase.auth.getSession();

  const result = await db.execute(
    sql`
      SELECT 
        identifier,
        jsonb_agg(
          jsonb_build_object(
            'id', id,
            'name', name,
            'numbers', string_to_array(numbers, ',')
          )
        ) AS bets
      FROM bets
      GROUP BY identifier
    `,
  );

  return new Response(JSON.stringify(result));
}

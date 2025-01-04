import { Bet } from "./bet";

export interface Pool {
  id: number;
  name: string;
  lottery: string;
  identifier: string;
  owner: string;
  drawDate: string;
  bets: Bet[];
}

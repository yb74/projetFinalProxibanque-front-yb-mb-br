import { Client } from "./Client";

export interface CompteEpargne {
  balance: number;
  remunaration: number;
  client: Client | null;
}

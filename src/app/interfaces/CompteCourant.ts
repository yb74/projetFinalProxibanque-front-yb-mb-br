import {Client} from "./Client";

export interface CompteCourant {
  id: number;
  accountNumber: string;
  balance: number;
  overdraft: number;
  carteId: number;
  clientId: number;
  clientName: string;
  clientFirstname: string;
}

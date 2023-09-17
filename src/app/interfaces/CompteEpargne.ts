import {Client} from "./Client";

export interface CompteEpargne {
  id: number;
  accountNumber: string;
  balance: number;
  remunaration: number;
  clientId: number;
  clientName: string;
  clientFirstname: string;
}

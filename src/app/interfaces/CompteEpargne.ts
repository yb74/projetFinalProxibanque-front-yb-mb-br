export interface CompteEpargne {
  id: number;
  accountNumber: string;
  balance: number;
  remunaration: number;
  client: Client | null;
}

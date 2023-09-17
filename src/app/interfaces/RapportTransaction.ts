import {Client} from "./Client";

export interface RapportTransaction {
  id: number;
  amount: number;
  timestamp: string;
  clientEmetteur: Client;
  clientRecepteur: Client;
  typeDeVirement: string;
  compteEmitteurId: number;
  compteRecepteurId: number;
}

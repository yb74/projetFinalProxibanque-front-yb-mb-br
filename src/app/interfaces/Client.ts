import { CompteCourant } from "./CompteCourant";
import { CompteEpargne } from "./CompteEpargne";

export interface Client {
  id: number;
  name: string;
  firstName: string;
  adress: string;
  zipCode: string;
  city: string;
  phoneNumber: string;
  conseillerId: number;
  compteCourant: CompteCourant;
	compteEpargne: CompteEpargne;
}

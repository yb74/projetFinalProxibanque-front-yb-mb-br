import { CompteCourant } from "./CompteCourant";
import { CompteEpargne } from "./CompteEpargne";
import {Conseiller} from "./Conseiller";

export interface Client {
  id:number;
  name: string;
  firstName: string;
  adress: string;
  zipCode: string;
  city: string;
  phoneNumber: string;
  conseiller: Conseiller;
  compteCourant: CompteCourant;
	compteEpargne: CompteEpargne;
}

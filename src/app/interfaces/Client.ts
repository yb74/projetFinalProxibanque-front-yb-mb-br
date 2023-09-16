import {Conseiller} from "./Conseiller";

export interface Client {
  id: number;
  name: string;
  firstName: string;
  adress: string;
  zipCode: string;
  city: string;
  phoneNumber: string;
  conseillerId: number;
}

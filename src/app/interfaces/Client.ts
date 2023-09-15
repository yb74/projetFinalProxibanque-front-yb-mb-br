import {Conseiller} from "./Conseiller";

export interface Client {
  name: string;
  firstName: string;
  adress: string;
  zipCode: string;
  city: string;
  phoneNumber: string;
  conseiller: Conseiller
}

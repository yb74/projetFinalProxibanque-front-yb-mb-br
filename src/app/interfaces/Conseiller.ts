import {Client} from "./Client";
import {UserModel} from "./UserModel";

export interface Conseiller {
  id:number;
  name: string;
  firstname: string;
  user: UserModel | null; //pour régler le probleme d'initialisation un conseiller dans conseillers.component.ts
  clients: Client[];

  //username-email-+password
}

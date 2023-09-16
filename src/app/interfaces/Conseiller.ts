import {UserModel} from "./UserModel";

export interface Conseiller {
  id:number;
  name: string;
  firstname: string;
  user: UserModel | null; //pour régler le probleme d'initialisation un conseiller dans conseillers.component.ts
  clientsIds: number[];

  //username-email-+password
}

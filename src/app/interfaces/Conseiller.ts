import {Client} from "./Client";
import {UserModel} from "./UserModel";

export interface Conseiller {
  id:number;
  name: string;
  firstname: string;
  username:string;
  password:string;
  clients: Client[];
  //username-email-+password
}

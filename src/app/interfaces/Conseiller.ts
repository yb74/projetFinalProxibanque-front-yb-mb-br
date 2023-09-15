import {Client} from "./Client";
import {UserModel} from "./UserModel";

export interface Conseiller {
  name: string;
  firstname: string;
  user: UserModel
  clients: Client[];
}

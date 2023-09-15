import {Client} from "./Client";
import {UserModel} from "./UserModel";

export interface Conseiller {
  id: number;
  name: string;
  firstname: string;
  user: UserModel
  clienstId: number[];
}

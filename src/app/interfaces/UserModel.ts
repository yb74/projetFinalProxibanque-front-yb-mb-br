import { Conseiller } from './Conseiller'

export interface UserModel {
  userName: string;
  password: string;
  role: string;
  conseiller: Conseiller
}

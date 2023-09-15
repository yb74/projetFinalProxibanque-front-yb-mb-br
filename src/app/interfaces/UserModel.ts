import { Conseiller } from './Conseiller'

export interface UserModel {
  id: number;
  userName: string;
  password: string;
  role: string;
  conseillerId: number;
}

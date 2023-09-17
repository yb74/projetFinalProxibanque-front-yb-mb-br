import { Conseiller } from './Conseiller'

export interface UserModel {
  id: number;
  userName: string;
  password: string;
  role: string;
  conseiller: Conseiller | null //pour régler le probleme d'initialisation un conseiller dans conseillers.component.ts
}

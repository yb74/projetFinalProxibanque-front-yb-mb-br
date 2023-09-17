import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem('loggedIn') === 'true') {
      return true; // L'utilisateur est connecté
    } else {
      this.router.navigate(['/login']);
      return false; // L'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
    }
  }
}

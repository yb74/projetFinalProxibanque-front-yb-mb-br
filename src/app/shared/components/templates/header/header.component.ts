import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isActive = false;
  isConnected = false; // Initialisez isConnected à false par défaut

  constructor(private router: Router, private cookieService: CookieService, private formService: FormService) {
    // Abonnez-vous à formService.isLoggedIn pour mettre à jour isConnected
    this.formService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isConnected = isLoggedIn;
    });
  }

  ngOnInit() {
    // Abonnez-vous à FormService.isLoggedIn pour mettre à jour isConnected
    this.formService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isConnected = isLoggedIn;
    });
  }

  toggleMenu() {
    this.isActive = !this.isActive;
  }

  onLogin() {
    if (this.isConnected) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onLogOut() {
    // Demandez une confirmation à l'utilisateur
    const confirmLogout = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");

    // Si l'utilisateur confirme la déconnexion, supprimez les informations de connexion
    if (confirmLogout) {

      // Supprimez le token du stockage local lors de la déconnexion
      localStorage.removeItem('conseiller');
      localStorage.removeItem('loggedIn');

      // Mettez à jour isConnected
      this.isConnected = false;

      // Redirigez vers la page de connexion ou une autre page appropriée
      this.router.navigate(['/login']);

      window.location.reload()
    }
  }
}


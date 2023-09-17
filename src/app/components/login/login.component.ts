import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient, // Ajoutez le service HttpClient,
    private cookieService: CookieService,
    private service:FormService
  ) { }

  errorMessage = ''; // Propriété pour stocker le message d'erreur

  login() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
  
      this.http.get(`http://localhost:8080/conseillers/login?username=${formData.username}&password=${formData.password}`)
        .subscribe({
          next: (response: any) => {
            // Authentification réussie, récupérez les informations du conseiller
            const conseillerDTO = response; // Assurez-vous de la structure de la réponse
  
            // Stockez les informations du conseiller dans le localStorage
            localStorage.setItem('conseiller', JSON.stringify(conseillerDTO));
            localStorage.setItem('loggedIn', 'true');

             // Mettez à jour l'état de connexion
            this.service.updateLoginStatus(true);
            // Redirigez vers une autre page ou effectuez d'autres actions nécessaires
            this.router.navigate(['/home']);
                // Après une connexion réussie, définissez un cookie pour maintenir l'état de connexion
            this.cookieService.set('isLoggedIn', 'true');
          },
          error: (error) => {
            // Gérez l'erreur d'authentification ici en définissant le message d'erreur.
            console.error('Erreur d\'authentification : ', error);
            this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
          }
        });
    }
  }  
  
}

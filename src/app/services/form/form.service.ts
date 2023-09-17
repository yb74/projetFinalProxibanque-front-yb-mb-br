import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private isFormVisible = new BehaviorSubject<boolean>(false);
  isFormVisible$ = this.isFormVisible.asObservable();
  
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) { 
        // Vérifiez la présence du cookie au démarrage de l'application
        const isLoggedIn = this.cookieService.get('isLoggedIn') === 'true';
        this.isLoggedInSubject.next(isLoggedIn);
  }
  
  public updateFormVisibility(newStatus: boolean) {
    this.isFormVisible.next(newStatus);
  }

  // Method to set the login status
  setLoggedInState(loggedIn: boolean) {
    this.isLoggedInSubject.next(loggedIn);
  }

  errorMessage = ''; // Property to store error messages

  login(username: string, password: string): Observable<any> {
    // Perform the HTTP call for authentication here
    const formData = { username, password };

    // Effectuez l'appel HTTP pour l'authentification ici
    // En cas de succès, définissez le cookie de connexion
    this.cookieService.set('isLoggedIn', 'true');
    this.isLoggedInSubject.next(true); // Mettez à jour l'état de connexion

    return this.http.get(`http://localhost:8080/conseillers/login?username=${formData.username}&password=${formData.password}`);
  }


    // Mettez à jour l'état de connexion //pour le Header // prblème de masquage du button se connecter
  logout() {
    // Supprimez le cookie de connexion et mettez à jour l'état de connexion
    this.cookieService.delete('isLoggedIn');
    this.isLoggedInSubject.next(false);
  }
}

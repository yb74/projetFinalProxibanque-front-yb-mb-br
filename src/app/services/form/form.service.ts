import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private isFormVisible = new BehaviorSubject<boolean>(false);
  isFormVisible$ = this.isFormVisible.asObservable();
  
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { }
  
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
    return this.http.get(`http://localhost:8080/conseillers/login?username=${formData.username}&password=${formData.password}`);
  }

    // Mettez à jour l'état de connexion //pour le Header // prblème de masquage du button se connecter
    updateLoginStatus(isLoggedIn: boolean) {
      this.isLoggedInSubject.next(isLoggedIn);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable, finalize, tap, catchError, throwError} from "rxjs";
import { SpinnerService } from '../spinner/spinner.service'
import { environment } from 'src/environments/environment';
import { Conseiller } from 'src/app/interfaces/Conseiller';

@Injectable({
  providedIn: 'root'
})
export class ConseillersService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private spinnerService: SpinnerService) {}

  public getAllConseillers(): Observable<Conseiller[]> {
    this.spinnerService.updateSpinnerVisibility(true) // showing spinner

    return this.http.get<Conseiller[]>(`${this.apiBaseUrl}/conseillers`)
      .pipe(finalize(() => {
        this.spinnerService.updateSpinnerVisibility(false) // showing spinner
      })); // Emit loading state when done
  }

  createConseiller(formData: {}): Observable<Conseiller> {
    return this.http.post<Conseiller>(`${this.apiBaseUrl}/conseillers`, formData);
  }

  updateConseiller(conseiller: {}, conseillerId: number): Observable<Conseiller> {
    return this.http.put<Conseiller>(`${this.apiBaseUrl}/conseillers/${conseillerId}`, conseiller);
  }

  deleteConseiller(id: number): Observable<string> {
    return this.http.delete(`${this.apiBaseUrl}/conseillers/${id}`, { responseType: 'text' });
  }

}

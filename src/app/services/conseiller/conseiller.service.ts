import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { Conseiller } from 'src/app/interfaces/Conseiller';
import { environment } from 'src/environments/environment';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ConseillerService {
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

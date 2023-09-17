import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable,finalize } from 'rxjs';
import { Client } from '../interfaces/Client';
import { environment } from 'src/assets/environments/environment';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private spinnerService: SpinnerService) {}

  public getAllClients(): Observable<Client[]> {
    this.spinnerService.updateSpinnerVisibility(true) // showing spinner

    return this.http.get<Client[]>(`${this.apiBaseUrl}/clients`)
      .pipe(finalize(() => {
        this.spinnerService.updateSpinnerVisibility(false) // showing spinner
      })); // Emit loading state when done
  }

 createClient(client: Client,conseillerId: number): Observable<Client> {
    return this.http.post<Client>(`${this.apiBaseUrl}/clients?conseillerId=${conseillerId}`, client);
  }
 
 /* createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiBaseUrl}/clients`, client);
  }*/

  updateClient(client: {}): Observable<Client> {
    return this.http.put<Client>(`${this.apiBaseUrl}/clients`, client);
  }

  deleteClient(id: number): Observable<string> {
    return this.http.delete(`${this.apiBaseUrl}/clients/${id}`, { responseType: 'text' });
  }
}






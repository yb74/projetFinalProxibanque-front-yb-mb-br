import { Injectable } from '@angular/core';
import {finalize, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SpinnerService} from "../spinner/spinner.service";
import { environment } from 'src/environments/environment';
import { Client } from 'src/app/interfaces/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private spinnerService: SpinnerService) {}

  public getAllClients(): Observable<Client[]> {
    this.spinnerService.updateSpinnerVisibility(true) // showing spinner

    return this.http.get<Client[]>(`${this.apiBaseUrl}/clients`)
      .pipe(finalize(() => {
        this.spinnerService.updateSpinnerVisibility(false) // showing spinner
      })); // Emit loading state when done
  }

  createClient(client: Client, conseillerId: number): Observable<Client> {
    return this.http.post<Client>(`${this.apiBaseUrl}/clients/create?conseillerId=${conseillerId}`, client);
  }

  updateClient(client: {}, conseillerId: number): Observable<Client> {
    return this.http.put<Client>(`${this.apiBaseUrl}/clients/${conseillerId}`, client);
  }

  deleteClient(id: number): Observable<string> {
    return this.http.delete(`${this.apiBaseUrl}/clients/${id}`, { responseType: 'text' });
  }
}

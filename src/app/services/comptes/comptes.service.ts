import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from "rxjs";
import {CompteCourant} from "../../interfaces/CompteCourant";
import {CompteEpargne} from "../../interfaces/CompteEpargne";


@Injectable({
  providedIn: 'root'
})
export class ComptesService {
  private apiBaseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getAllComptesCourants(): Observable<CompteCourant[]> {
    return this.http.get<CompteCourant[]>(`${this.apiBaseUrl}/comptes/courants`);
  }

  public getAllComptesEpargnes(): Observable<CompteEpargne[]> {
    return this.http.get<CompteEpargne[]>(`${this.apiBaseUrl}/comptes/epargnes`);
  }

  public getComptesCourantsByClientId(clientId: number): Observable<CompteCourant[]> {
    return this.http.get<CompteCourant[]>(`${this.apiBaseUrl}/comptes/courants/client/${clientId}`);
  }

  public getComptesEpargnesByClientId(clientId: number): Observable<CompteEpargne[]> {
    return this.http.get<CompteEpargne[]>(`${this.apiBaseUrl}/comptes/courants/client/${clientId}`);
  }
}

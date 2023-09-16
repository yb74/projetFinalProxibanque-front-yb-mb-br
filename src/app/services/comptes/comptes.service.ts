import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  public cashTransferCompteCourantToCompteCourant(idEmetteur : number, idRecepteur: number, montant: number) : Observable<CompteCourant> {
    const params = new HttpParams()
      .set('idEmetteur', idEmetteur.toString())
      .set('idRecepteur', idRecepteur.toString())
      .set('montant', montant.toString());

    // Include the params in the GET request
    return this.http.post<CompteCourant>(`${this.apiBaseUrl}/transactions/ComptesCourants`, null, { params });
  }
}

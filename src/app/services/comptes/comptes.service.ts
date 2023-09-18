import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from "rxjs";
import { CompteCourant } from "../../interfaces/CompteCourant";
import { CompteEpargne } from "../../interfaces/CompteEpargne";

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

  public getCompteCourantById(id: number) : Observable<CompteCourant> {
    return this.http.get<CompteCourant>(`${this.apiBaseUrl}/comptes/courants/${id}`);
  }

  public getCompteEpargneById(id: number) : Observable<CompteEpargne> {
    return this.http.get<CompteEpargne>(`${this.apiBaseUrl}/comptes/epargnes/${id}`);
  }

  public cashTransferToAccount(
    idEmetteur: number,
    idRecepteur: number,
    montant: number,
    accountType: string
  ): Observable<string> {
    let params = new HttpParams()

    params = params
      .set('idEmetteur', idEmetteur.toString())
      .set('idRecepteur', idRecepteur.toString())
      .set('montant', montant.toString());

    let endpoint = '';
    let includeTypeVirement = false;

    switch (accountType) {
      case 'CompteCourant':
        endpoint = 'transactions/ComptesCourants';
        break;
      case 'CompteEpargne':
        includeTypeVirement = true;
        endpoint = 'transactions/CourantEpargne';
        break;
      default:
        console.log(`Invalid Account Type: ${accountType}`);
        break;
    }

    // Include the 'typeVirement' parameter conditionally
    if (includeTypeVirement) {
      params = params.set('typeVirement', 'compteEpargneVersCompteCourant'); // Update params here
    }

    // Include the params in the POST request and set responseType to 'text'
    return this.http.post(`${this.apiBaseUrl}/${endpoint}`, null, {
      params,
      responseType: 'text' // Specify that the response should be treated as plain text
    });
  }
}

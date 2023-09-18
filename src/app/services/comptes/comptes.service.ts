import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from "rxjs";
import { VirementData } from 'src/app/interfaces/virment-data';
import { CompteCourant } from 'src/app/interfaces/CompteCourant';
import { CompteEpargne } from 'src/app/interfaces/CompteEpargne';

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


  public cashTransfer(virementData: VirementData): Observable<string> {
    // Utilisez virementData au lieu de la route.snapshot pour obtenir l'ID de l'émetteur
    const idEmetteur = virementData.idEmetteur;
    const idRecepteur = virementData.idRecepteur;
    let params = new HttpParams();

    params = params
      .set('idEmetteur', idEmetteur.toString())
      .set('idRecepteur', idRecepteur.toString())
      .set('montant', virementData.montant.toString())
      .set('typeVirement', virementData.typeVirement);

    let endpoint = '';

    switch (virementData.typeVirement) {
      case 'compteCourantVersCompteCourant':
        endpoint = 'transactions/ComptesCourants';
        break;
      case 'compteCourantVersCompteEpargne':
      case 'compteEpargneVersCompteCourant':
        endpoint = 'transactions/CourantEpargne';
        break;
      default:
        console.log(`Invalid Account Type: ${virementData.typeVirement}`);
        break;
    }

    // Incluez les paramètres dans la demande PUT et définissez responseType sur 'text'
    return this.http.put(`${this.apiBaseUrl}/${endpoint}`, null, {
      params,
      responseType: 'text'
    });
  }
}

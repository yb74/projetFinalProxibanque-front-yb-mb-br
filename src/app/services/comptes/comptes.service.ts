import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from "rxjs";
import {ComptesComponent} from "../../components/comptes/comptes.component";
import {CompteCourant} from "../../interfaces/CompteCourant";


@Injectable({
  providedIn: 'root'
})
export class ComptesService {
  private apiBaseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getAllComptesCourants(): Observable<CompteCourant[]> {
    return this.http.get<CompteCourant[]>(`${this.apiBaseUrl}/comptes/courants`);
  }
}

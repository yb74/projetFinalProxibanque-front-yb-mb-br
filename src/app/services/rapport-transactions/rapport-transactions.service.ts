import { Injectable } from '@angular/core';
import {finalize, Observable} from "rxjs";
import {Client} from "../../interfaces/Client";
import {RapportTransaction} from "../../interfaces/RapportTransaction";
import {HttpClient} from "@angular/common/http";
import {SpinnerService} from "../spinner/spinner.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RapportTransactionsService {
  private apiBaseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private spinnerService: SpinnerService) {}

  public getAllTransactions(): Observable<RapportTransaction[]> {
    this.spinnerService.updateSpinnerVisibility(true)

    return this.http.get<RapportTransaction[]>(`${this.apiBaseUrl}/transactions`)
      .pipe(finalize(() => {
        this.spinnerService.updateSpinnerVisibility(false)
      }));
  }
}

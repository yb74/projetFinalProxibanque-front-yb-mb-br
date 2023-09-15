import { Component, OnInit } from '@angular/core';
import {CompteCourant} from "../../interfaces/CompteCourant";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {ToastService} from "../../services/toast/toast.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ComptesService} from "../../services/comptes/comptes.service";

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {
  public compteCourants$: Observable<CompteCourant[]> = new Observable<CompteCourant[]>();
  public isToastVisible$: Observable<boolean>;

  constructor(
    private comptesService: ComptesService,
    private toastService: ToastService
  ) {
    this.isToastVisible$ = this.toastService.isToastVisible$;
  }

  ngOnInit(): void {
    this.getComptesCourants()
  }

  private getComptesCourants (): void {
    this.compteCourants$ = this.comptesService.getAllComptesCourants().pipe(
      tap(response => {
        console.log(response)
        // After getting the conseillers, update the observable
        this.compteCourants$ = of(response);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.toastService.updateToastMessage('Network error. Please check your connection.');
        } else {
          this.toastService.updateToastMessage(error.error);
        }

        this.toastService.updateToastVisibility(true);
        setTimeout(() => {
          this.toastService.updateToastVisibility(false);
        }, 5000);

        return throwError(() => error);
      })
    )
  }

}

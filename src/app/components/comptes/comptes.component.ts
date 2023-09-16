import { Component, OnInit } from '@angular/core';
import {CompteCourant} from "../../interfaces/CompteCourant";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {ToastService} from "../../services/toast/toast.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ComptesService} from "../../services/comptes/comptes.service";
import {CompteEpargne} from "../../interfaces/CompteEpargne";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ClientsService} from "../../services/clients/clients.service";
import {Client} from "../../interfaces/Client";

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {
  public compteCourants$: Observable<CompteCourant[]> = new Observable<CompteCourant[]>();
  public comptesEpargnes$: Observable<CompteEpargne[]> = new Observable<CompteEpargne[]>();
  public isToastVisible$: Observable<boolean>;

  filterForm: FormGroup;
  clients$!: Observable<Client[]>;

  selectedClientId: number | null = null;

  constructor(
    private comptesService: ComptesService,
    private clientService: ClientsService,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {
    this.isToastVisible$ = this.toastService.isToastVisible$;

    this.filterForm = this.formBuilder.group({
      client: ['']
    });
  }

  // Fetch clients asynchronously (replace with your data fetching logic)
  fetchClientsLazy() {
    this.clients$ = this.clientService.getAllClients();
  }

  ngOnInit(): void {
    this.getComptesCourants();
    this.getComptesEpargnes();
  }

  // Update the onSubmit method to set the selected client ID
  onSubmit() {
    const clientControl = this.filterForm.get('client');
    if (clientControl) {
      const selectedClientId = clientControl.value;
      this.selectedClientId = selectedClientId;
      this.getComptesCourantsByClientId(selectedClientId);
      this.getComptesEpargnesByClientId(selectedClientId);
    }
  }

  private getComptesCourantsByClientId(selectedClientId: number) : void {
    this.compteCourants$ = this.comptesService.getComptesCourantsByClientId(selectedClientId).pipe(
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

  private getComptesEpargnesByClientId(selectedClientId: number) : void {
    this.comptesEpargnes$ = this.comptesService.getComptesEpargnesByClientId(selectedClientId).pipe(
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

  private getComptesCourants (): void {
    this.compteCourants$ = this.comptesService.getAllComptesCourants().pipe(
      tap(response => {
        console.log(response)
        // After getting the comptes, update the observable
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

  private getComptesEpargnes (): void {
    this.comptesEpargnes$ = this.comptesService.getAllComptesEpargnes().pipe(
      tap(response => {
        console.log(response)
        // After getting the comptes, update the observable
        this.comptesEpargnes$ = of(response);
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

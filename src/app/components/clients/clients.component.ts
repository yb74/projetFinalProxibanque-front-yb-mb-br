import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Client } from 'src/app/interfaces/Client';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { FormService } from 'src/app/services/form/form.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  public clients$: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  public clientsFiltered$: Observable<Client[]>  = new BehaviorSubject<Client[]>([]);
  public isLoading$: Observable<boolean>;
  public isToastVisible$: Observable<boolean>;
  public isFormVisible$: Observable<boolean>;

  public isCreateMode: boolean = true;
  public selectedClient: Client = {
    id: 0,
    name: '',
    firstName: '',
    adress: '',
    zipCode: '',
    city: '',
    phoneNumber: '',
    conseillerId: 0,
    compteCourant: {
      balance: 0,
      overdraft: 0,
      carteId: 0,
      clientId: 0,
      clientName: '',
      clientFirstname: '',
      id: 0,
      accountNumber: '',
    },
    compteEpargne: {
      balance: 0,
      remunaration: 0,
      clientId: 0,
      clientName: '',
      clientFirstname: '',
      id: 0,
      accountNumber: '',
    },
  };

  clientForm!: FormGroup;

  searchTerm: string = '';

  constructor(
    private clientService: ClientsService,
    private toastService: ToastService,
    private spinnerService: SpinnerService,
    private formService: FormService,
    private formBuilder: FormBuilder
  ) {
    this.isLoading$ = this.spinnerService.isLoading$;
    this.isToastVisible$ = this.toastService.isToastVisible$;
    this.isFormVisible$ = this.formService.isFormVisible$;
  }

  ngOnInit(): void {
    this.clients$ = new BehaviorSubject<Client[]>([]);
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      adress: ['', Validators.required],
      zipCode: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{5,}$'),
        ],
      ],
      city: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      conseillerId: ['', Validators.required],
    });

    this.loadClients();
  }

  loadClients() {
    this.clientService
      .getAllClients()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 0) {
            this.toastService.updateToastMessage(
              'Network error. Please check your connection.'
            );
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
      .subscribe((clients: Client[]) => {
        this.clients$.next(clients);
        this.updateFilteredClients();
      });
  }

  updateFilteredClients() {
    this.clientsFiltered$ = this.clients$.pipe(
      map((clients) => {
        return clients.filter(
          (client) =>
            client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            client.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      })
    );
  }

  onSearchInputChange(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.updateFilteredClients();
  }

  delete(client: Client) {
    if (
      window.confirm(
        'Are you sure you want to delete the Client with ID: ' + client.id + ' ?'
      )
    ) {
      this.clientService
        .deleteClient(client.id)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.toastService.updateToastMessage(error.error);

            this.toastService.updateToastVisibility(true);
            setTimeout(() => {
              this.toastService.updateToastVisibility(false);
            }, 5000);

            return throwError(() => error);
          })
        )
        .subscribe((response: string) => {
          this.toastService.updateToastMessage(response);
          this.toastService.updateToastVisibility(true);
          setTimeout(() => {
            this.toastService.updateToastVisibility(false);
          }, 5000);
          this.loadClients(); // Reload the clients after deletion
        });
    }
  }

  openCreateClientForm() {
    this.isCreateMode = true;
    this.initClientForm();
    this.formService.updateFormVisibility(true);
  }

  openEditClientForm(client: Client) {
    this.isCreateMode = false;
    this.initClientForm(client);
    this.formService.updateFormVisibility(true);

    this.selectedClient = client;
  }

  createClient() {
    if (this.clientForm.valid) {
      const conseillerId = this.clientForm.value.conseillerId;
      const clientData = { ...this.clientForm.value };

      delete clientData.conseiller;

      this.clientService
        .createClient(clientData, conseillerId)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.formService.updateFormVisibility(false);
            this.toastService.updateToastMessage(error.error);

            this.toastService.updateToastVisibility(true);
            setTimeout(() => {
              this.toastService.updateToastVisibility(false);
            }, 5000);

            return throwError(() => error);
          })
        )
        .subscribe((response: Client) => {
          this.toastService.updateToastMessage('Client created successfully.');
          this.toastService.updateToastVisibility(true);
          setTimeout(() => {
            this.toastService.updateToastVisibility(false);
          }, 5000);
          this.loadClients(); // Reload the clients after creation
          this.initClientForm();
        });
    }
  }

  updateClient() {
    if (this.clientForm.valid) {
      const clientData = { ...this.clientForm.value };

      delete clientData.conseiller;

      this.clientService
        .updateClient(clientData, this.selectedClient.id)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.formService.updateFormVisibility(false);
            this.toastService.updateToastMessage(error.error);

            this.toastService.updateToastVisibility(true);
            setTimeout(() => {
              this.toastService.updateToastVisibility(false);
            }, 5000);

            return throwError(() => error);
          })
        )
        .subscribe((res: Client) => {
          this.toastService.updateToastMessage(
            `Client with ID: ${res.id} updated successfully.`
          );
          this.toastService.updateToastVisibility(true);
          setTimeout(() => {
            this.toastService.updateToastVisibility(false);
          }, 5000);
          this.loadClients(); // Reload the clients after update
          this.initClientForm();
        });
    }
  }

  onSubmit() {
    if (this.isCreateMode) {
      this.createClient();
    } else {
      this.updateClient();
    }
    this.formService.updateFormVisibility(false);
  }

  private initClientForm(data?: Client) {
    const validators = this.isCreateMode
      ? [Validators.required, Validators.pattern('^[0-9]{5,}$')]
      : [];

    this.clientForm = this.formBuilder.group({
      name: [data ? data.name : '', this.isCreateMode ? Validators.required : []],
      firstName: [data ? data.firstName : '', this.isCreateMode ? Validators.required : []],
      adress: [data ? data.adress : '', ...validators],
      zipCode: [data ? data.zipCode : '', ...validators],
      city: [data ? data.city : '', ...validators],
      phoneNumber: [data ? data.phoneNumber : '', ...validators],
      conseillerId: [data ? data.conseillerId : '', ...validators],
    });
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
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
  public clients$: Observable<Client[]> = new Observable<Client[]>();
  public isLoading$: Observable<boolean>; // Observable to track loading state
  public isToastVisible$: Observable<boolean>;
  public isFormVisible$: Observable<boolean>;

  // Flag to determine whether it's in create or update mode
  public isCreateMode: boolean = true;

  selectedClient: Client = {
    id: 0,
    name: '',
    firstName: '',
    adress: '',
    zipCode: '',
    city: '',
    phoneNumber: '',
    conseillerId:0,
    compteCourant: {
      balance: 0,
      overdraft: 0,
      carteId: 0,
      clientId:0,
      clientName: '',
      clientFirstname: '',
      id: 0,
      accountNumber: ''
    },
    compteEpargne: {
      balance: 0,
      remunaration: 0,
      clientId: 0,
      clientName: '',
      clientFirstname: '',
      id: 0,
      accountNumber: ''
    },
  };

  // Initialize conseillerForm here
  clientForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    firstName: ['', Validators.required],
    adress: ['', Validators.required],
    zipCode: ['', [
      Validators.required, // Champ obligatoire
      Validators.pattern('^[0-9]{5,}$') // Au moins 5 chiffres
    ]
  ],
    city: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    conseillerId: ['', Validators.required],
  });

  constructor(
    private clientService: ClientsService,
    private toastService: ToastService,
    private spinnerService: SpinnerService,
    private formService: FormService,
    private formBuilder: FormBuilder
  ) {
    this.isLoading$ = this.spinnerService.isLoading$; // Initialize loading$ observable
    this.isToastVisible$ = this.toastService.isToastVisible$;
    this.isFormVisible$ = this.formService.isFormVisible$;

    // Initialize the conseiller form (in create mode)
    // this.initConseillerForm();
  }

  ngOnInit(): void {
    this.getClients();
  }

  private getClients(): void {
    // Récupérez l'ID du conseiller connecté depuis le service FormService
    const loggedInConseillerId = this.formService.getLoggedInConseillerId();
    
    this.clients$ = this.clientService.getAllClients().pipe(
      map((clients) => {
        // Filtrer la liste des clients pour n'afficher que ceux associés au conseiller connecté
        return clients.filter((client) => client.conseillerId === loggedInConseillerId);
      }),
      tap((filteredClients) => {
        // Après avoir filtré les clients, mettez à jour l'observable clients$
        this.clients$ = of(filteredClients);
      }),
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
          );
}

  delete(client: Client) {
    if (
      window.confirm(
        'Are you sure, you want to delete the Client with ID : ' +
          client.id +
          ' ?'
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
          this.getClients();
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
      console.log(conseillerId);
      const clientData = { ...this.clientForm.value }; // Create a copy of the form value
      delete clientData.conseiller; // Remove the conseiller property from the copy

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
          this.getClients();
          this.initClientForm();
        });
    }
  }

  // Update an existing Conseiller
  updateClient() {
    if (this.clientForm.valid) {
      // Clone the form value to avoid modifying the original data
      const clientData = { ...this.clientForm.value };
      // Remove the 'conseiller' property from the cloned data
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
            `Client with ID : ${res.id} updated successfully.`
          );
          this.toastService.updateToastVisibility(true);
          setTimeout(() => {
            this.toastService.updateToastVisibility(false);
          }, 5000);
          this.getClients();
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
    this.clientForm = this.formBuilder.group({
      name: [data ? data.name : '', Validators.required],
      firstName: [data ? data.firstName : '', Validators.required],
      adress: [data ? data.adress : '', Validators.required],
      zipCode: [data ? data.zipCode : '', [
        Validators.required, // Champ obligatoire
        Validators.pattern('^[0-9]{5,}$') // Au moins 5 chiffres
      ]
    ],
      city: [data ? data.city : '', Validators.required],
      phoneNumber: [data ? data.phoneNumber : '', Validators.required],
      conseillerId: [data ? data.conseillerId : '', Validators.required],
    });
  }
}
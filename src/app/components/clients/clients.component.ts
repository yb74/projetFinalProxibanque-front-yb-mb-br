import { Component, OnInit } from '@angular/core';
import { catchError,Observable,of,tap,throwError } from 'rxjs';
import { Client } from 'src/app/interfaces/Client';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientService } from 'src/app/services/clients.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FormService } from 'src/app/services/form.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  public clients$: Observable<Client[]> = new Observable<Client[]>();
  public isLoading$: Observable<boolean>; // Observable to track loading state
  public isToastVisible$: Observable<boolean>;
  public isFormVisible$: Observable<boolean>;

  // Flag to determine whether it's in create or update mode
  public isCreateMode: boolean = true;

  //-----ajout****
  public formData! : [];

  selectedClient: Client = {id: 0, name: "", firstName: "", adress: "", zipCode: "", city: "", phoneNumber: "", conseillerId:0}

  // Initialize conseillerForm here
  clientForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    firstName: ['', Validators.required],
    adress: ['', Validators.required],
    zipCode: ['', Validators.required],
    city: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    //conseiller: ['', Validators.required]
  });

  constructor(
    private clientService:ClientService,
    private toastService :ToastService,
    private spinnerService :SpinnerService,
    private formService : FormService,
    private formBuilder: FormBuilder
  ) {
    this.isLoading$ = this.spinnerService.isLoading$; // Initialize loading$ observable
    this.isToastVisible$ = this.toastService.isToastVisible$;
    this.isFormVisible$ = this.formService.isFormVisible$;

    // Initialize the conseiller form (in create mode)
    // this.initConseillerForm();
  }

  ngOnInit(): void {
    this.getClients()
  }

  private getClients(): void {
    this.clients$ = this.clientService.getAllClients().pipe(
      tap(response => {
        console.log(response)
        // After getting the conseillers, update the observable
        this.clients$ = of(response);
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
    );
  }

  delete(client: Client) {
    if ( window.confirm('Are you sure, you want to delete the Client with ID : ' + client.id + ' ?')) {
      this.clientService.deleteClient(client.id).pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastService.updateToastMessage(error.error);

          this.toastService.updateToastVisibility(true);
          setTimeout(() => {
            this.toastService.updateToastVisibility(false);
          }, 5000);

          return throwError(() => error);
        })
      ).subscribe((response: string) => {
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

  //----------------------------

  onFormSubmit(formData: FormData) {
    if (this.clientForm.valid) {
      const clientData = { ...this.clientForm.value }; // Utilisation des données du formulaire émises par l'enfant
      const conseillerId = this.clientForm.get('conseiller')?.value as number; // Récupérez conseillerId depuis le formulaire en tant que nombre
      if (!isNaN(conseillerId)) {
        // Appel de la méthode createClient avec les deux arguments
        this.clientService.createClient(clientData, conseillerId).pipe(
          catchError((error: HttpErrorResponse) => {
            this.formService.updateFormVisibility(false);
            this.toastService.updateToastMessage(error.error);

            this.toastService.updateToastVisibility(true);
            setTimeout(() => {
              this.toastService.updateToastVisibility(false);
            }, 5000);

            return throwError(() => error);
          })
        ).subscribe(
          (response: Client) => {
            this.toastService.updateToastMessage('Client created successfully.');
            this.toastService.updateToastVisibility(true);
            setTimeout(() => {
              this.toastService.updateToastVisibility(false);
            }, 5000);
            this.getClients();
            this.initClientForm();
          }
        );
      }
    }
   
  }

  createClient() {
    if (this.clientForm.valid) {
      // Appeler le gestionnaire d'événement onFormSubmit avec les données du formulaire
      this.onFormSubmit(this.clientForm.value);
      
    }
  }

 /* createClient() {
    if (this.clientForm.valid) {
     // const conseillerId = this.clientForm.value.conseiller
      const clientData = { ...this.clientForm.value }; // Create a copy of the form value
     // delete clientData.conseiller; // Remove the conseiller property from the copy

      //this.clientService.createClient(clientData,conseillerId).pipe(
        this.clientService.createClient(clientData).pipe(
        catchError((error: HttpErrorResponse) => {
          this.formService.updateFormVisibility(false);
          this.toastService.updateToastMessage(error.error);

          this.toastService.updateToastVisibility(true);
          setTimeout(() => {
            this.toastService.updateToastVisibility(false);
          }, 5000);

          return throwError(() => error);
        })
      ).subscribe(
        (response: Client) => {
          this.toastService.updateToastMessage('Client created successfully.');
          this.toastService.updateToastVisibility(true);
          setTimeout(() => {
            this.toastService.updateToastVisibility(false);
          }, 5000);
          this.getClients();
          this.initClientForm();
        }
      );
    }
  }*/

// Update an existing Conseiller
  updateClient() {
    if (this.clientForm.valid) {
      // Clone the form value to avoid modifying the original data
      const clientData = { ...this.clientForm.value };
      // Remove the 'conseiller' property from the cloned data
      delete clientData.conseiller;

      this.clientService.updateClient(clientData).pipe(
        catchError((error: HttpErrorResponse) => {
          this.formService.updateFormVisibility(false);
          this.toastService.updateToastMessage(error.error);

          this.toastService.updateToastVisibility(true);
          setTimeout(() => {
            this.toastService.updateToastVisibility(false);
          }, 5000);

          return throwError(() => error);
        })
      ).subscribe(
        (res: Client) => {
          this.toastService.updateToastMessage(`Client with ID : ${res.id} updated successfully.`);
          this.toastService.updateToastVisibility(true);
          setTimeout(() => {
            this.toastService.updateToastVisibility(false);
          }, 5000);
          this.getClients();
          this.initClientForm();
        }
      );
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
      zipCode: [data ? data.zipCode : '', Validators.required],
      city: [data ? data.city : '', Validators.required],
      phoneNumber: [data ? data.phoneNumber : '', Validators.required],
     // conseiller: [data ? data.conseillerId : '', Validators.required]
    });
  }

  //Détail client
  detailClient(client: Client){}
}



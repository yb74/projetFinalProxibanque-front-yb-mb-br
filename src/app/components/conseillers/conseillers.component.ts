import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { Conseiller } from 'src/app/interfaces/Conseiller';
import { ConseillerService } from 'src/app/services/conseiller/conseiller.service';
import { FormService } from 'src/app/services/form/form.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-conseillers',
  templateUrl: './conseillers.component.html',
  styleUrls: ['./conseillers.component.css']
})
export class ConseillersComponent implements OnInit {
  public conseillers$: Observable<Conseiller[]> = new Observable<Conseiller[]>();
  public isLoading$: Observable<boolean>; // Observable to track loading state
  public isToastVisible$: Observable<boolean>;
  public isFormVisible$: Observable<boolean>;

  // Flag to determine whether it's in create or update mode
  public isCreateMode: boolean = true;

// Définissez un objet Conseiller vide par défaut
 emptyConseiller: Conseiller = {
  id: 0,
  name: "",
  firstname: "",
  user: null, // Initialisez user avec null ou une valeur par défaut
  clients: []
};

// Utilisez l'objet emptyConseiller pour initialiser UserModel
selectedConseiller: Conseiller = {
  id: 0,
  name: "",
  firstname: "",
  clients: [],
  user: {
    userName: "",
    password: "",
    role: "",
    conseiller: this.emptyConseiller // Initialisez conseiller avec l'objet vide par défaut
  }
};

  // Initialize conseillerForm here
  conseillerForm = this.formBuilder.group({
    name: ['', Validators.required],
    firstname: ['', Validators.required],
    // Add form controls for other fields here
  });

  constructor(
    private conseillersService: ConseillerService,
    private toastService: ToastService,
    private spinnerService: SpinnerService,
    private formService: FormService,
    private formBuilder: FormBuilder
  ) {
    this.isLoading$ = this.spinnerService.isLoading$; // Initialize loading$ observable
    this.isToastVisible$ = this.toastService.isToastVisible$;
    this.isFormVisible$ = this.formService.isFormVisible$;

    // Initialize the conseiller form (in create mode)
    this.initConseillerForm();
  }

  ngOnInit(): void {
    this.getConseillers()
  }

  private getConseillers(): void {
    this.conseillers$ = this.conseillersService.getAllConseillers().pipe(
      tap(response => {
        console.log(response)
        // After getting the conseillers, update the observable
        this.conseillers$ = of(response);
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

  delete(conseiller: Conseiller) {
    if ( window.confirm('Are you sure, you want to delete the Conseiller with ID : ' + conseiller.id + ' ?')) {
      this.conseillersService.deleteConseiller(conseiller.id).pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastService.updateToastMessage(error.error);

          this.toastService.updateToastVisibility(true);
          setTimeout(() => {
            this.toastService.updateToastVisibility(false);
          }, 5000);

          return throwError(() => error);
        })
      ).subscribe((response: string) => {
        // Display the API response message for success
        this.toastService.updateToastMessage(response);
        this.toastService.updateToastVisibility(true);
        setTimeout(() => {
          this.toastService.updateToastVisibility(false);
        }, 5000);
        // After successful deletion, fetch the updated list of conseillers
        this.getConseillers();
      });
    }
  }

  openCreateConseillerForm() {
    this.isCreateMode = true;
    this.initConseillerForm(); // Initialize the form in create mode
    this.formService.updateFormVisibility(true);
  }

  openEditConseillerForm(conseiller: Conseiller) {
    this.isCreateMode = false;
    this.initConseillerForm(conseiller); // Initialize the form in update mode with data
    this.formService.updateFormVisibility(true);

    this.selectedConseiller = conseiller;
  }

  // Create a new Conseiller
  createConseiller() {
    if (this.conseillerForm.valid) {
      this.conseillersService.createConseiller(this.conseillerForm.value).pipe(
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
        (response: Conseiller) => {
          this.toastService.updateToastMessage('Conseiller created successfully.');
          this.toastService.updateToastVisibility(true);
          setTimeout(() => {
            this.toastService.updateToastVisibility(false);
          }, 5000);
          this.getConseillers(); // Refresh the list of conseillers
          this.initConseillerForm(); // Reset the form after submission
        }
      );
    }
  }

// Update an existing Conseiller
  updateConseiller() {
    if (this.conseillerForm.valid) {
      this.conseillersService.updateConseiller(this.conseillerForm.value, this.selectedConseiller.id).pipe(
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
        (res: Conseiller) => {
          this.toastService.updateToastMessage(`Conseiller with ID : ${res.id} updated successfully.`);
          this.toastService.updateToastVisibility(true);
          setTimeout(() => {
            this.toastService.updateToastVisibility(false);
          }, 5000);
          this.getConseillers(); // Refresh the list of conseillers
          this.initConseillerForm(); // Reset the form after submission
        }
      );
    }
  }

  onSubmit() {
    if (this.isCreateMode) {
      this.createConseiller();
    } else {
      this.updateConseiller();
    }
    this.formService.updateFormVisibility(false);
  }

  // Initialize the conseiller form with optional data for update mode
  private initConseillerForm(data?: Conseiller) {
    this.conseillerForm = this.formBuilder.group({
      name: [data ? data.name : '', Validators.required],
      firstname: [data ? data.firstname : '', Validators.required],
      // Add form controls for other fields here
    });
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';
import { Conseiller } from 'src/app/interfaces/Conseiller';
import { ConseillersService } from 'src/app/services/conseillers/conseillers.service';
import { FormService } from 'src/app/services/form/form.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.css']
})
export class ClientsFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Output() formSubmit = new EventEmitter<FormData>();
  public isFormVisible: boolean = false;
  @Input() isCreateMode: boolean = true;

  public isToastVisible$: Observable<boolean>;
  public conseillers$: Observable<Conseiller[]> | null = null;

  constructor(
    private formService: FormService,
    private conseillersService: ConseillersService,
    private toastService: ToastService,
  ) {
    this.isToastVisible$ = this.toastService.isToastVisible$;
  }

  ngOnInit(): void {
    this.formService.isFormVisible$.subscribe(visibility => {
      this.isFormVisible = visibility;
    })
  }

  shouldShowErrorStyle(): boolean {
    return this.form.invalid;
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.formSubmit.emit(formData);
    }
  }
  
  closeForm() {
    this.formService.updateFormVisibility(false);
  }

  // Fetch conseillers only when the select input is clicked
  fetchConseillersLazy() {
    if (!this.conseillers$) {
      this.conseillers$ = this.conseillersService.getAllConseillers().pipe(
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
  }
  
}

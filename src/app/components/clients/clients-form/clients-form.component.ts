import { Component, Output,OnInit,Input, EventEmitter } from '@angular/core';
import { ClientService } from 'src/app/services/clients.service';
import { Client } from 'src/app/interfaces/Client';
import {FormBuilder, FormGroup} from "@angular/forms";
import { NgForm, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable,tap, catchError, throwError } from 'rxjs';
import { FormService } from 'src/app/services/form.service';
import { ToastService } from 'src/app/services/toast.service';
import { ConseillersService } from 'src/app/services/conseillers.service';
import { Conseiller } from 'src/app/interfaces/Conseiller';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.css']
})
export class ClientsFormComponent implements OnInit{

 // @Input() formCreateClient!: FormGroup;


// @Output() formSubmit = new EventEmitter<Client>();
  
/* formCreateClient = this.fb.group({
    name:['', Validators.required],
    firstname : ['',Validators.required],
    adress : ['',Validators.required],
    zipCode : ['',Validators.required],
    city : ['',Validators.required],
    phoneNumber : ['',Validators.required],
  });

  constructor(private fb: FormBuilder, public service:ClientService){}
 

  ngOnInit(): void {
      
  }
  handleAddClient(){  
    if(this.formCreateClient.valid){
    const clientData =  this.formCreateClient.value as Client;
    console.log(clientData);
    this.service.createClient(clientData).subscribe((response=>{
      console.log('Client created successfully:', this.service.getClient);    
    }))
    }

   /* if(this.formCreateClient.valid){
      const clientData = { ...this.formCreateClient.value }; // Create a copy of the form value ;
      console.log(clientData);

      this.service.createClient(clientData).subscribe
    }*/
  
    //-------------------------------------------------
    @Input() form!: FormGroup;
  @Output() formSubmit = new EventEmitter<FormData>();
  public isFormVisible: boolean = false;
  @Input() isCreateMode: boolean = true;

  public isToastVisible$: Observable<boolean>;
  public conseillers$: Observable<Conseiller[]> | null = null;

  constructor(
    private formService: FormService,
    private conseillersService: ConseillersService,
    private toastService : ToastService
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
      console.log(formData);
      
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


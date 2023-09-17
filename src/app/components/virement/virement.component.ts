import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ComptesService } from "../../services/comptes/comptes.service";
import { Observable, of } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { ToastService } from "../../services/toast/toast.service";

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {
  virementForm!: FormGroup;
  transferResult$!: Observable<any | null>;
  accountType: string = "";
  public isToastVisible$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private comptesService: ComptesService,
    private toastService: ToastService
  ) {
    this.isToastVisible$ = this.toastService.isToastVisible$;
  }

  ngOnInit(): void {
    this.accountType = this.route.snapshot.paramMap.get('accountType')!;
    this.initializeForm();
  }

  initializeForm(): void {
    this.virementForm = this.formBuilder.group({
      idRecepteur: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.virementForm.valid) {
      const idEmetteur = +this.route.snapshot.paramMap.get('id')!;
      const idRecepteur = +this.virementForm.get('idRecepteur')?.value;
      const montant = +this.virementForm.get('montant')?.value;

      this.transferResult$ = this.comptesService.cashTransferToAccount(idEmetteur, idRecepteur, montant, this.accountType)
        .pipe(
          tap((response) => {
            console.log(response)
            // Display success message using ToastService
            this.toastService.updateToastMessage(response); // Update the message from the response
            this.toastService.updateToastVisibility(true);

            setTimeout(() => {
              this.toastService.updateToastVisibility(false);
            }, 5000);

            this.virementForm.reset();
          }),
          catchError((error) => {
            if (error.status === 0) {
              this.toastService.updateToastMessage('Network error. Please check your connection.');
            } else {
              this.toastService.updateToastMessage(error.error);
            }
            this.toastService.updateToastVisibility(true);

            setTimeout(() => {
              this.toastService.updateToastVisibility(false);
            }, 5000);

            return of(null);
          })
        );
    }
  }
}

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
      montant: ['', [Validators.required, Validators.min(1)]],
      typeVirement: ['compteCourantVersCompteCourant', Validators.required], // Par défaut, sélectionnez le type de virement
      idEmetteur: ['', Validators.required], // Champ de saisie pour l'ID de l'émetteur
      idRecepteur: ['', Validators.required] // Champ de saisie pour l'ID du récepteur
    });

    // Écoutez les changements du type de virement pour activer ou désactiver le champ de l'ID du récepteur
    this.virementForm.get('typeVirement')?.valueChanges.subscribe((typeVirement) => {
      if (typeVirement === 'compteCourantVersCompteEpargne' || typeVirement === 'compteEpargneVersCompteCourant') {
        this.virementForm.get('idRecepteur')?.disable(); // Désactiver le champ de l'ID du récepteur
      } else {
        this.virementForm.get('idRecepteur')?.enable(); // Activer le champ de l'ID du récepteur
      }
    });
  }

  onSubmit(): void {
    if (this.virementForm.valid) {
      const idEmetteur = +this.virementForm.get('idEmetteur')?.value;
      const idRecepteur = +this.virementForm.get('idRecepteur')?.value;
      const montant = +this.virementForm.get('montant')?.value;
      const typeVirement = this.virementForm.get('typeVirement')?.value;      

      // Créez un objet de données de virement pour l'envoyer au service
      const virementData = {
        idEmetteur,
        idRecepteur,
        montant,
        typeVirement
      };

      this.transferResult$ = this.comptesService.cashTransfer(virementData)
        .pipe(
          tap((response) => {
            // Affichez la réponse de succès dans le toast
            this.toastService.updateToastMessage(response);
            this.toastService.updateToastVisibility(true);

            setTimeout(() => {
              this.toastService.updateToastVisibility(false);
            }, 5000);

            this.virementForm.reset();
          }),
          catchError((error) => {
            if (error.status === 0) {
              this.toastService.updateToastMessage('Erreur réseau. Veuillez vérifier votre connexion.');
            } else {
              console.error(error);
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

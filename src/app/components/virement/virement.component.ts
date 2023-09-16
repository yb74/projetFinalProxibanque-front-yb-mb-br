import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ComptesService} from "../../services/comptes/comptes.service";
import {Observable, of} from "rxjs";
import {CompteCourant} from "../../interfaces/CompteCourant";


@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {
  virementForm!: FormGroup; // Define a FormGroup for the form
  transferResult$!: Observable<CompteCourant | null>;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private comptesService: ComptesService // Inject your VirementService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.transferResult$ = of<CompteCourant | null>(null); // Initialize as an empty observable with null value
  }

  initializeForm(): void {
    this.virementForm = this.formBuilder.group({
      idRecepteur: ['', Validators.required], // Recipient's ID, required
      montant: ['', [Validators.required, Validators.min(1)]] // Amount, required and minimum value of 1
    });
  }

  onSubmit(): void {
    if (this.virementForm.valid) {
      const idEmetteur = +this.route.snapshot.paramMap.get('id')!;
      const idRecepteur = +this.virementForm.get('idRecepteur')?.value;
      const montant = +this.virementForm.get('montant')?.value;

      console.log(idEmetteur)

      this.transferResult$ = this.comptesService.cashTransferCompteCourantToCompteCourant(idEmetteur, idRecepteur, montant);
    }
  }
}

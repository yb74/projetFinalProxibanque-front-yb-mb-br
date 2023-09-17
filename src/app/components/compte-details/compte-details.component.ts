import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComptesService } from '../../services/comptes/comptes.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-compte-details',
  templateUrl: './compte-details.component.html',
  styleUrls: ['./compte-details.component.css']
})
export class CompteDetailsComponent implements OnInit {
  compteId!: number;
  accountType!: string;
  compteDetails$!: Observable<any | null>;
  public isToastVisible$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private comptesService: ComptesService,
    private toastService: ToastService
  ) {
    this.isToastVisible$ = this.toastService.isToastVisible$;
  }

  ngOnInit(): void {
    this.initializeCompteDetails();
  }

  initializeCompteDetails(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.compteId = +paramMap.get('id')!;
      this.accountType = paramMap.get('accountType')!;

      // Initialize compteDetails$ with an observable that emits null
      this.compteDetails$ = of(null);

      // Call the appropriate service function based on accountType
      switch (this.accountType) {
        case 'CompteCourant':
          this.compteDetails$ = this.comptesService.getCompteCourantById(this.compteId);
          break;
        case 'CompteEpargne':
          this.compteDetails$ = this.comptesService.getCompteEpargneById(this.compteId);
          break;
        default:
          break;
      }

      this.compteDetails$ = this.compteDetails$.pipe(
        catchError((error) => {
          console.log(error)
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
    });
  }
}

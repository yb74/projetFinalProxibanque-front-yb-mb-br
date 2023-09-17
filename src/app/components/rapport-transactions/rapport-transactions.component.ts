import {Component, Inject, LOCALE_ID} from '@angular/core';
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {Client} from "../../interfaces/Client";
import {RapportTransaction} from "../../interfaces/RapportTransaction";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastService} from "../../services/toast/toast.service";
import {SpinnerService} from "../../services/spinner/spinner.service";
import {RapportTransactionsService} from "../../services/rapport-transactions/rapport-transactions.service";

@Component({
  selector: 'app-rapport-transactions',
  templateUrl: './rapport-transactions.component.html',
  styleUrls: ['./rapport-transactions.component.css']
})
export class RapportTransactionsComponent {
  public rapports$: Observable<RapportTransaction[]> = new Observable<RapportTransaction[]>();
  public isLoading$: Observable<boolean> = new Observable<boolean>();
  public isToastVisible$: Observable<boolean> = new Observable<boolean>();

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private toastService: ToastService,
    private rapportTransactionsService: RapportTransactionsService
  ) {}

  ngOnInit(): void {
    this.getRapportTransactions();
  }

  private getRapportTransactions(): void {
    this.rapports$ = this.rapportTransactionsService.getAllTransactions().pipe(
      tap((response) => {
        console.log(response);
        this.rapports$ = of(response);
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

}

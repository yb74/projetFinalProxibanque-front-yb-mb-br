import { Component } from '@angular/core';

@Component({
  selector: 'app-simulation-pret',
  templateUrl: './simulation-pret.component.html',
  styleUrls: ['./simulation-pret.component.css']
})
export class SimulationPretComponent {
  loanAmount: number = 0;
  annualInterestRate: number = 0;
  loanTermMonths: number = 0;

  // Résultat du calcul
  monthlyPayment: number = 0;

  calculateMonthlyPayment(): void {

    if (this.loanAmount < 0) {
      console.log("Le montant du prêt ne peut pas être négatif.");
      return; // Arrêtez le calcul si le montant est négatif
    }

    if (this.annualInterestRate < 0) {
      console.log("Le taux du prêt ne peut pas être négatif.");
      return; // Arrêtez le calcul si le montant est négatif
    }
   
    if (this.loanAmount && this.annualInterestRate && this.loanTermMonths) {
      const r = (this.annualInterestRate / 100) / 12; // Conversion en taux périodique mensuel
      const n = this.loanTermMonths;
      const numerator = r * Math.pow(1 + r, n);
      const denominator = Math.pow(1 + r, n) - 1;

      // Calcul du paiement mensuel
      this.monthlyPayment = this.loanAmount * (numerator / denominator);
    } else {
      // Gérer le cas où tous les champs ne sont pas remplis
      this.monthlyPayment = 0;
    }
  }
}



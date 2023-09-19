import { NgModule } from '@angular/core';
import {LoginComponent} from "./components/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {ConseillersComponent} from "./components/conseillers/conseillers.component";
import {ClientsComponent} from "./components/clients/clients.component";
import {ComptesComponent} from "./components/comptes/comptes.component";
import {RegisterComponent} from "./components/register/register.component";
import { SimulationPretComponent } from './components/simulation-pret/simulation-pret.component';
import {CompteDetailsComponent} from "./components/compte-details/compte-details.component";
import {VirementComponent} from "./components/virement/virement.component";
import { AuthService } from './services/auth/auth.service';
import {RapportTransactionsComponent} from "./components/rapport-transactions/rapport-transactions.component";


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthService]},
  { path: 'conseillers', component: ConseillersComponent, canActivate: [AuthService] },
  {path: 'clients', component: ClientsComponent, canActivate: [AuthService]},
  {path: 'comptes', component: ComptesComponent, canActivate: [AuthService]},
  { path: 'compte-details/:id/:accountType', component: CompteDetailsComponent, canActivate: [AuthService] },
  { path: 'virement/:id', component: VirementComponent, canActivate: [AuthService] },
  {path: 'login', component: LoginComponent},
  {path: 'simulation-pret',component:SimulationPretComponent, canActivate: [AuthService]},
  {path: 'rapport-transaction',component:RapportTransactionsComponent, canActivate: [AuthService]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

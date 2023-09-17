import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./components/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {ConseillersComponent} from "./components/conseillers/conseillers.component";
import {ClientsComponent} from "./components/clients/clients.component";
import {ComptesComponent} from "./components/comptes/comptes.component";
import {RegisterComponent} from "./components/register/register.component";
import { SimulationPretComponent } from './simulation-pret/simulation-pret.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'conseillers', component: ConseillersComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'comptes', component: ComptesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'simulation-pret',component:SimulationPretComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

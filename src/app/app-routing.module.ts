import { NgModule } from '@angular/core';
import {LoginComponent} from "./components/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {ConseillersComponent} from "./components/conseillers/conseillers.component";
import {ClientsComponent} from "./components/clients/clients.component";
import {ComptesComponent} from "./components/comptes/comptes.component";
import {RegisterComponent} from "./components/register/register.component";
import {CompteDetailsComponent} from "./components/compte-details/compte-details.component";
import {VirementComponent} from "./components/virement/virement.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'conseillers', component: ConseillersComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'comptes', component: ComptesComponent},
  { path: 'compte-details/:id/:accountType', component: CompteDetailsComponent },
  { path: 'virement/:id/:accountType', component: VirementComponent },
  {path: 'login', component: LoginComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

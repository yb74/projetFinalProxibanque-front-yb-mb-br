import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ConseillersComponent } from './components/conseillers/conseillers.component';
import { ComptesComponent } from './components/comptes/comptes.component';
import { ClientsComponent } from './components/clients/clients.component';
import { FooterComponent } from './shared/components/templates/footer/footer.component';
import { HeaderComponent } from './shared/components/templates/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { ClientsFormComponent } from './components/clients/clients-form/clients-form.component';
import { ConseillersFormComponent } from './components/conseillers/conseillers-form/conseillers-form.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { CompteDetailsComponent } from './components/compte-details/compte-details.component';
import { VirementComponent } from './components/virement/virement.component';
import { AuthService } from './services/auth/auth.service';
import { SimulationPretComponent } from './components/simulation-pret/simulation-pret.component';
import { RapportTransactionsComponent } from './components/rapport-transactions/rapport-transactions.component';
import {FrenchDatePipe} from "./custom-pipes/french-date-pipe";
import {DatePipe} from "@angular/common";
import { SpinnerComponent } from './shared/components/UI/spinner/spinner.component';
import { ToastComponent } from './shared/components/UI/toast/toast.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConseillersComponent,
    ComptesComponent,
    ClientsComponent,
    ToastComponent,
    FooterComponent,
    HeaderComponent,
    RegisterComponent,
    ClientsFormComponent,
    ConseillersFormComponent,
    SpinnerComponent,
    SimulationPretComponent,
    CompteDetailsComponent,
    VirementComponent,
    RapportTransactionsComponent,
    [RapportTransactionsComponent, FrenchDatePipe
  ],
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

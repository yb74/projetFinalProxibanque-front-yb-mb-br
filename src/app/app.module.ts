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
import { ToastComponent } from './shared/components/UI/toast/toast.component';
import { FooterComponent } from './shared/components/templates/footer/footer.component';
import { HeaderComponent } from './shared/components/templates/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { ClientsFormComponent } from './components/clients/clients-form/clients-form.component';
import { ConseillersFormComponent } from './components/conseillers/conseillers-form/conseillers-form.component';

import {ReactiveFormsModule} from "@angular/forms";
import { SpinnerComponent } from './shared/components/UI/spinner/spinner.component';
import { CompteDetailsComponent } from './components/compte-details/compte-details.component';
import { VirementComponent } from './components/virement/virement.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth/auth.service';
import { SimulationPretComponent } from './simulation-pret/simulation-pret.component';
import { FormsModule } from '@angular/forms';


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
    SimulationPretComponent
    CompteDetailsComponent,
    VirementComponent, 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [CookieService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

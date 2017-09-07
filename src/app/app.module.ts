import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-popover';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableModule } from 'angular2-datatable';

import { AuthGuard } from './guards/auth.guard'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PublicMissionFormComponent } from './public-mission-form/public-mission-form.component';

import { SubscriptionService } from './subscription/subscription.service';
import { UserService } from './user/user.service'
import { EnrollmentService } from './enrollment/enrollment.service'

import { FranceConnectedFormComponent } from './france-connected-form/france-connected-form.component';
import { FranceConnectLoginFormComponent } from './france-connect-login-form/france-connect-login-form.component';
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { LoginComponent } from './login/login.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component'

const routes = [
  {path: '', redirectTo: '/accueil', pathMatch: 'full'},
  { path: 'accueil', component: HomeComponent },
  { path: 'souscription', component: SubscriptionComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'enrolement/form', component: EnrollmentFormComponent, canActivate: [AuthGuard] },
  { path: 'enrolement', component: EnrollmentComponent, canActivate: [AuthGuard] },
  { path: 'enrolement/:id', component: EnrollmentComponent, canActivate: [AuthGuard] },
  { path: 'enrolements', component: EnrollmentsComponent, canActivate: [AuthGuard] }
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubscriptionComponent,
    PublicMissionFormComponent,
    FranceConnectedFormComponent,
    FranceConnectLoginFormComponent,
    EnrollmentFormComponent,
    EnrollmentComponent,
    LoginComponent,
    EnrollmentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PopoverModule,
    BrowserAnimationsModule,
    DataTableModule,
    RouterModule.forRoot(
      routes,
      {
        enableTracing: true,
        useHash: true
      }
    )
  ],
  providers: [
    SubscriptionService,
    UserService,
    EnrollmentService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {Component, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ContactsComponent} from "./pages/contacts/contacts.component";
import {ActivitesComponent} from "./pages/activites/activites.component";
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {AddContactComponent} from "./components/add-contact/add-contact.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path : "contacts" , component:ContactsComponent},
  {path : "activities" , component:ActivitesComponent},
  {path : "login" , component:LoginComponent},
  { path: 'add-contact', component: AddContactComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {MenubarModule} from "primeng/menubar";
import {MessageService, SharedModule} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ActivitesComponent } from './pages/activites/activites.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import {FormsModule} from "@angular/forms";
import {ConfirmationService} from "primeng/api";
import { AddContactComponent } from './components/add-contact/add-contact.component';
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DialogService} from "primeng/dynamicdialog";
import {DynamicDialogModule} from 'primeng/dynamicdialog';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import {MultiSelectModule} from "primeng/multiselect";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ActivitesComponent,
    LoginComponent,
    HomeComponent,
    AddContactComponent,
    AddActivityComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextModule,
    CheckboxModule,
    FormsModule,
    DropdownModule,
    InputTextareaModule,
    DialogModule,
    DynamicDialogModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule







  ],
  providers: [MessageService, ConfirmationService , DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }

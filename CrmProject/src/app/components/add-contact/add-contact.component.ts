import { Component, OnInit } from '@angular/core';
import {Contact} from "../../model/Contact.model";
import {ContactService} from "../../services/contact/contact.service";
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-contact',
  template: `

      <div class="p-fluid p-formgrid p-grid">



        <form #form="ngForm">
          <div class="p-field p-col-12 p-md-6">
            <label for="firstName">First Name <span class="text-danger">*</span></label>
            <input id="firstName" type="text" pInputText [(ngModel)]="formData.firstName" name="firstName"
                   (ngModelChange)="validateForm()" required>
            <small class="text-danger" *ngIf="invalid && !formData.firstName" style="color: red;">First name is required</small>
          </div>


          <div class="p-field p-col-12 p-md-6">
            <label for="lastName">Last Name <span class="text-danger">*</span></label>
            <input id="lastName" type="text" pInputText [(ngModel)]="formData.lastName" name="lastName"
                   (ngModelChange)="validateForm()" required>
            <small class="text-danger" *ngIf="invalid && !formData.lastName" style="color: red;">Last name is required</small>
          </div>
        </form>

        <div class="p-field p-col-12 p-md-6">
          <label for="email">Email</label>
          <input id="email" type="email" pInputText [(ngModel)]="formData.email" #email="ngModel"
                 pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$">
        </div>


        <div class="p-field p-col-12 p-md-6">
          <label for="phone">Phone</label>
          <input id="phone" type="text" pInputText [(ngModel)]="formData.phone">
        </div>


        <div class="p-field p-col-12 p-md-6">
          <label for="contactOwner">Contact Owner</label>
          <p-dropdown inputId="contactOwner" [options]="contactOwners" [(ngModel)]="formData.contactOwner" placeholder="Select Contact Owner" optionLabel="name"></p-dropdown>
        </div>


        <div class="p-field p-col-12 p-md-6">
          <label for="jobTitle">Job Title</label>
          <p-dropdown inputId="jobTitle" [options]="jobTitles" [(ngModel)]="formData.jobTitle" placeholder="Select Job Title" optionLabel="name"></p-dropdown>
        </div>


        <div class="p-field p-col-12 p-md-6">
          <label for="company">Company</label>
          <input id="company" type="text" pInputText [(ngModel)]="formData.company">
        </div>


        <div class="p-field p-col-12">
          <label for="address">Address</label>
          <textarea id="address" rows="3" pInputTextarea [(ngModel)]="formData.address"></textarea>
        </div>


        <div class="p-field p-col-12 p-md-4">
          <label for="country">Country</label>
          <input id="country" type="text" pInputText [(ngModel)]="formData.country">
        </div>


        <div class="p-field p-col-12 p-md-4">
          <label for="state">State</label>
          <input id="state" type="text" pInputText [(ngModel)]="formData.state">
        </div>


        <div class="p-field p-col-12 p-md-4">
          <label for="city">City</label>
          <input id="city" type="text" pInputText [(ngModel)]="formData.city">
        </div>


        <div class="p-field p-col-12 p-md-6">
          <label for="zipCode">Zip Code</label>
          <input id="zipCode" type="text" pInputText [(ngModel)]="formData.zipCode">
        </div>
        <p-toolbar styleClass="p-mb-4">
          <ng-template pTemplate="left">
            <button pButton type="submit" [disabled]="invalid" pRipple label="Submit" icon="pi pi-plus"
                    class="p-button-success p-mr-2"
                    (click)="addNew()">
            </button>

          </ng-template>

          <ng-template pTemplate="right">
            <button pButton pRipple label="Send Email" icon="pi pi-envelope"
                    class="p-button-primary"
                    (click)="sendEmail()">
            </button>
          </ng-template>
        </p-toolbar>
        <p-message *ngIf = showMessage  severity="success" text="Contact added successfully!"></p-message>





      </div>




  `,
  styles: [
  ]
})
export class AddContactComponent implements OnInit {
  checkUpdate: boolean = false;
  id : number =0;
  contact: Contact = {} as Contact;
  display = 'none';
  invalid = false ;
  showMessage = false;

  formData  = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    contactOwner: '',
    jobTitle: '',
    company: '',
    zipCode:'',
    city : '',
    state :'',
    country : '',
    address : '',
  };
  contactOwners = [
    { name: 'User1', value: 'User1' },
    { name: 'User2', value: 'User2' },
  ];
  jobTitles = [
    { name: 'Job 1', value: 'Job 1' },
    { name: 'Job 2', value: 'Job 2' },
  ]

  constructor(private contactService : ContactService , public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    if (this.config.data && this.config.data.checkUpdate !== undefined ) {
      this.checkUpdate = this.config.data.checkUpdate;

    }
    if (this.config.data.id !== undefined) {
      this.id = this.config.data.id;
      console.log(this.id)
    }
  }


  addNew() {

    if (this.formData.firstName && this.formData.lastName) {
      if (this.checkUpdate) {

        this.contactService.updateContact(this.formData , this.id);
        console.log(this.formData);
      } else {

        this.contactService.addContact(this.formData);
      }

      this.showMessage = true;


    } else {

      this.invalid = true;
    }
  }
  validateForm() {
    if (this.formData.firstName && this.formData.lastName) {
      this.invalid = false;
    }
  }

  handelExit() {}
  sendEmail() {}
}

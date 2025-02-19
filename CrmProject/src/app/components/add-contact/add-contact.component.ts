import { Component, OnInit } from '@angular/core';
import {Contact} from "../../model/Contact.model";
import {ContactService} from "../../services/contact/contact.service";
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import {CountryService} from "../../services/country /country.service";
import {ActivitesComponent} from "../../pages/activites/activites.component";


@Component({
  selector: 'app-add-contact',
  template: `

    <span class="p-mb-4" style="display: flex; justify-content: flex-end; align-items: center;">
      <button *ngIf="checkUpdate" pButton type="button" pRipple label="Activities" icon="pi pi-envelope" class="p-button-primary" (click)="handleActivites()"></button>
    </span>



    <form [formGroup]="contactForm" (ngSubmit)="addNew()" class="p-fluid p-formgrid p-grid">

      <div class="p-field p-col-12 p-md-6">
        <label for="firstName">First Name <span class="text-danger">*</span></label>
        <input id="firstName" type="text" pInputText formControlName="firstName">
        <small class="text-danger" *ngIf="contactForm.controls.firstName.invalid && contactForm.controls.firstName.touched">
          First name is required
        </small>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="lastName">Last Name <span class="text-danger">*</span></label>
        <input id="lastName" type="text" pInputText formControlName="lastName">
        <small class="text-danger" *ngIf="contactForm.controls.lastName.invalid && contactForm.controls.lastName.touched">
          Last name is required
        </small>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="email">Email</label>
        <input id="email" type="email" pInputText formControlName="email">
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="phone">Phone</label>
        <input id="phone" type="text" pInputText formControlName="phone">
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="contactOwner">Contact Owner</label>
        <p-dropdown inputId="contactOwner" [options]="contactOwners" formControlName="contactOwner" optionLabel="name"></p-dropdown>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="jobTitle">Job Title</label>
        <p-dropdown inputId="jobTitle" [options]="jobTitles" formControlName="jobTitle" optionLabel="name"></p-dropdown>
      </div>

      <div class="p-field p-col-12">
        <label for="company">Company</label>
        <input id="company" type="text" pInputText formControlName="company">
      </div>

      <div class="p-field p-col-12">
        <label for="address">Address</label>
        <textarea id="address" rows="3" pInputTextarea formControlName="address"></textarea>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="country">Country</label>
        <p-dropdown
          [options]="countries"
          [showClear]="true"
          [filter]="true"
          optionLabel="name"
          formControlName="country"
          placeholder="Select a country">


          <ng-template let-country pTemplate="item">
            <div class="country-item">
              <img [src]="country.flag" [alt]="country.name" class="country-flag"/>
              <span>{{ country.name }}</span>
            </div>
          </ng-template>


          <ng-template let-country pTemplate="selectedItem">
            <div class="country-item">
              <img [src]="country.flag" [alt]="country.name" class="country-flag"/>
              <span>{{ country.name }}</span>
            </div>
          </ng-template>
        </p-dropdown>
      </div>


      <div class="p-field p-col-12 p-md-4">
        <label for="state">State</label>
        <input id="state" type="text" pInputText formControlName="state">
      </div>

      <div class="p-field p-col-12 p-md-4">
        <label for="city">City</label>
        <input id="city" type="text" pInputText formControlName="city">
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="zipCode">Zip Code</label>
        <input id="zipCode" type="text" pInputText formControlName="zipCode">
      </div>

      <p-toolbar styleClass="p-mb-4">
        <ng-template pTemplate="left">
          <button pButton type="submit" [disabled]="contactForm.invalid" pRipple label="Submit" icon="pi pi-plus" class="p-button-success p-mr-2"></button>
        </ng-template>
        <ng-template pTemplate="right">
          <button pButton type="button" pRipple label="Send Email" icon="pi pi-envelope" class="p-button-primary" (click)="sendEmail()"></button>
        </ng-template>


      </p-toolbar>

      <p-message *ngIf="showMessage" severity="success" text="Contact added successfully!"></p-message>
    </form>



  `,
  styles: [`
    .country-item {
  display: flex;
  align-items: center;
gap: 8px;
padding: 5px 10px;
}

.country-flag {
  width: 24px;
  height: 16px;
  border-radius: 3px;
  object-fit: cover;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.p-dropdown {
  width: 100%;
}

.p-dropdown .p-dropdown-label {
  display: flex;
  align-items: center;
  gap: 8px;
}
`

] ,
  providers : [DialogService]
})
export class AddContactComponent implements OnInit {
  checkUpdate: boolean = false;
  id : number =0;
  contact: Contact = {} as Contact;
  invalid = false ;
  showMessage = false;
  contactForm!: FormGroup;
  countries : {name:string , flag : string  }[] = []


  contactOwners = [
    { name: 'User1', value: 'User1' },
    { name: 'User2', value: 'User2' },
  ];
  jobTitles = [
    { name: 'Job 1', value: 'Job 1' },
    { name: 'Job 2', value: 'Job 2' },
  ]

  constructor( private fb: FormBuilder,
               private contactService: ContactService,
               public ref: DynamicDialogRef,
               public config: DynamicDialogConfig,
               private dialogService : DialogService,
               private countryService: CountryService) { }

  ngOnInit(): void {

    this.countryService.getCountries().subscribe(data => {
      this.countries = data.map(country => ({
        name: country.name.common,
        flag: country.flags.svg
      }));
      this.countries.sort((a, b) => a.name.localeCompare(b.name));
    });

    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      phone: ['', [Validators.pattern(/^[0-9]{8,15}$/)]],
      contactOwner: [null],
      jobTitle: [null],
      company: [''],
      address: [''],
      country: [''],
      state: [''],
      city: [''],
      zipCode: ['']
    });









    if (this.config.data?.checkUpdate !== undefined) {
      this.checkUpdate = this.config.data.checkUpdate;
    }

    if (this.config.data?.id !== undefined) {
      this.id = this.config.data.id;

    }
  }

  addNew() {
    if (this.contactForm.valid) {
      if (this.checkUpdate) {
        this.contactService.updateContact(this.contactForm.value, this.id);
        console.log("Contact updated:", this.contactForm.value);
      } else {
        this.contactService.addContact(this.contactForm.value);
        console.log("Contact added:", this.contactForm.value);
      }
      this.showMessage = true;
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }



  sendEmail() {
    console.log('Send Email ');
  }

  handleActivites() {

    const ref = this.dialogService.open(ActivitesComponent, {
      data : {
        checkParametres : true
      } ,

      header: 'Activities',
      width: '50%',
      height: '60%',
      style: {
        'border-radius': '12px',
      },
      contentStyle: {
        'overflow': 'auto',
        'padding': '1rem',
      },
      baseZIndex: 10000,
      closable: true,
      modal: true,

    });

  }
}

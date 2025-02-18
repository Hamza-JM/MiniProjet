import {Component, OnInit, ViewChild} from '@angular/core';
import {Contact} from "../../model/Contact.model";
import {ContactService} from "../../services/contact/contact.service";
import {Table} from "primeng/table";
import {DialogService} from "primeng/dynamicdialog";
import {AddContactComponent} from "../../components/add-contact/add-contact.component";
import {Activity} from "../../model/Activity.model";


@Component({
  selector: 'app-contacts',
  template: `
    <p-toast></p-toast>

    <div class="card">
      <p-toolbar styleClass="p-mb-4">
        <ng-template pTemplate="left">
          <button pButton pRipple label="New Contact" icon="pi pi-plus" class="p-button-success p-mr-2"  (click)="openNew()"></button>
          <button pButton pRipple [label]="'Delete'" icon="pi pi-trash" class="p-button-danger" (click)="deleteSelectedContacts()" [disabled]="!selectedContacts || !selectedContacts.length"></button>
        </ng-template>


      </p-toolbar>

      <p-table #dt [value]="contacts" [rows]="10" [paginator]="true" [globalFilterFields]="['firstName', 'lastName', 'email']" responsiveLayout="scroll"
               [(selection)]="selectedContacts" [rowHover]="true" dataKey="id"
               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" [showCurrentPageReport]="true">
        <ng-template pTemplate="caption">
          <div class="p-d-flex p-ai-center p-jc-between">
            <h5 class="p-m-0">Manage Contacts</h5>
            <span class="p-input-icon-left">
                    <i class="pi pi-search"></i>
                    <input pInputText type="text" (input)="filterGlobal($event.target, 'contains')" placeholder="Search..." />
                </span>
          </div>
        </ng-template>
        <ng-template pTemplate="header">
          <tr>
            <th style="width: 3rem">
              <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
            </th>
            <th pSortableColumn="firstName">First Name <p-sortIcon field="firstName"></p-sortIcon></th>
            <th pSortableColumn="lastName">Last Name <p-sortIcon field="lastName"></p-sortIcon></th>
            <th pSortableColumn="email">Email <p-sortIcon field="email"></p-sortIcon></th>
            <th pSortableColumn="phone">Phone <p-sortIcon field="phone"></p-sortIcon></th>
            <th pSortableColumn="company">Company <p-sortIcon field="company"></p-sortIcon></th>
            <th></th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-contact>
          <tr>
            <td>
              <p-tableCheckbox [value]="contact"></p-tableCheckbox>
            </td>
            <td>{{contact.firstName}}</td>
            <td>{{contact.lastName}}</td>
            <td>{{contact.email}}</td>
            <td>{{contact.phone}}</td>
            <td>{{contact.company}}</td>
            <td>

              <button pButton pRipple icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" (click)="editContact(contact)"></button>
              <button pButton pRipple icon="pi pi-trash" class="p-button-rounded p-button-warning" (click)="deleteContact(contact)"></button>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="summary">
          <div class="p-d-flex p-ai-center p-jc-between">
            In total there are {{contacts ? contacts.length : 0 }} contacts.
          </div>
        </ng-template>
      </p-table>
    </div>

    <p-dialog [(visible)]="contactDialog" [style]="{width: '450px'}" header="Contact Details" [modal]="true" styleClass="p-fluid">
      <ng-template pTemplate="content">
        <div class="p-field">
          <label for="firstName">First Name</label>
          <input type="text" pInputText id="firstName" [(ngModel)]="contact.firstName" required autofocus />
          <small class="p-error" *ngIf="submitted && !contact.firstName">First Name is required.</small>
        </div>
        <div class="p-field">
          <label for="lastName">Last Name</label>
          <input type="text" pInputText id="lastName" [(ngModel)]="contact.lastName" required />
          <small class="p-error" *ngIf="submitted && !contact.lastName">Last Name is required.</small>
        </div>
        <div class="p-field">
          <label for="email">Email</label>
          <input type="email" pInputText id="email" [(ngModel)]="contact.email" required />
        </div>
        <div class="p-field">
          <label for="phone">Phone</label>
          <input type="text" pInputText id="phone" [(ngModel)]="contact.phone" required />
        </div>
        <div class="p-field">
          <label for="company">Company</label>
          <input type="text" pInputText id="company" [(ngModel)]="contact.company" />
        </div>
      </ng-template>

      <ng-template pTemplate="footer">
        <button pButton pRipple label="Cancel" icon="pi pi-times" class="p-button-text" (click)="hideDialog()"></button>
        <button pButton pRipple label="Save" icon="pi pi-check" class="p-button-text" (click)="saveContact()"></button>
      </ng-template>
    </p-dialog>

    <p-confirmDialog [style]="{width: '450px'}"></p-confirmDialog>

  `,
  styles: [
  ],
  providers: [DialogService],
})
export class ContactsComponent implements OnInit {
  @ViewChild("dt") dt !: Table;
  contactDialog: boolean = false;
  contacts: Contact[] = [];
  contact: Contact = {} as Contact;
  selectedContacts: Contact[] = [];
  submitted: boolean = false;



  constructor(private contactService : ContactService , private dialogService : DialogService) { }

  ngOnInit(): void {
    this.contacts= this.contactService.getContacts()

  }
  filterGlobal(event :EventTarget| null, filtrParam:string){
    let eventAsInput = event as HTMLInputElement;
    this.dt.filterGlobal(eventAsInput.value, filtrParam);
}
  openNew() {


    const ref = this.dialogService.open(AddContactComponent, {
      data: {
        checkUpdate :  false ,
      },
      header: 'Add Contact',
      width: '70%',
      height : '70%',
    });





  }
  editContact(contact: Contact) {
    this.contact = { ...contact };

    const ref = this.dialogService.open(AddContactComponent, {
      data: {
        checkUpdate :  true ,
        id : contact.id
      },

      header: 'Edit Contact',
      width: '70%',
      height : '70%',
    });


  }
  deleteContact( contact:Contact) {
    if (contact && contact.id) {
      this.contactService.deleteContact(contact.id);
      this.contacts = this.contacts.filter(c => c.id !== contact.id);
    }
  }


  deleteSelectedContacts() {
    if (this.selectedContacts.length > 0) {
      this.selectedContacts.forEach(contact => this.contactService.deleteContact(contact.id!));
      this.contacts = this.contacts.filter(c => !this.selectedContacts.includes(c));
      this.selectedContacts = [];
    }

  }
  hideDialog() {

  }
  saveContact() {


  }

}

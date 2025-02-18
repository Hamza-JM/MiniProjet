import { Injectable } from '@angular/core';
import {Contact} from "../../model/Contact.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', company: 'Company A' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210', company: 'Company B' },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@example.com', phone: '555-123-4567', company: 'Company C' },
    { id: 4, firstName: 'Emily', lastName: 'Davis', email: 'emily.davis@example.com', phone: '444-567-8901', company: 'Company D' },
    { id: 5, firstName: 'David', lastName: 'Martinez', email: 'david.martinez@example.com', phone: '333-234-5678', company: 'Company E' },
    { id: 6, firstName: 'Sophia', lastName: 'Brown', email: 'sophia.brown@example.com', phone: '222-678-1234', company: 'Company F' },
    { id: 7, firstName: 'James', lastName: 'Wilson', email: 'james.wilson@example.com', phone: '111-345-6789', company: 'Company G' },
    { id: 8, firstName: 'Olivia', lastName: 'Moore', email: 'olivia.moore@example.com', phone: '888-234-7890', company: 'Company H' },
    { id: 9, firstName: 'Liam', lastName: 'Taylor', email: 'liam.taylor@example.com', phone: '777-567-8901', company: 'Company I' },
    { id: 10, firstName: 'Mia', lastName: 'Anderson', email: 'mia.anderson@example.com', phone: '666-890-1234', company: 'Company J' },
    { id: 11, firstName: 'Lucas', lastName: 'Thomas', email: 'lucas.thomas@example.com', phone: '555-432-6789', company: 'Company K' },
    { id: 12, firstName: 'Charlotte', lastName: 'Harris', email: 'charlotte.harris@example.com', phone: '444-123-4567', company: 'Company L' },
    { id: 13, firstName: 'Benjamin', lastName: 'Clark', email: 'benjamin.clark@example.com', phone: '333-765-4321', company: 'Company M' },
    { id: 14, firstName: 'Amelia', lastName: 'Lewis', email: 'amelia.lewis@example.com', phone: '222-345-6789', company: 'Company N' },
    { id: 15, firstName: 'Ethan', lastName: 'Walker', email: 'ethan.walker@example.com', phone: '111-876-5432', company: 'Company O' },
    { id: 16, firstName: 'Ava', lastName: 'Allen', email: 'ava.allen@example.com', phone: '999-123-4567', company: 'Company P' },
    { id: 17, firstName: 'Henry', lastName: 'Scott', email: 'henry.scott@example.com', phone: '888-345-6789', company: 'Company Q' },
    { id: 18, firstName: 'Ella', lastName: 'Young', email: 'ella.young@example.com', phone: '777-654-3210', company: 'Company R' },
    { id: 19, firstName: 'William', lastName: 'King', email: 'william.king@example.com', phone: '666-432-7654', company: 'Company S' },
    { id: 20, firstName: 'Isabella', lastName: 'Carter', email: 'isabella.carter@example.com', phone: '555-321-9876', company: 'Company T' }
  ];


  constructor() { }

  getContacts() {
    console.log(this.contacts) ;
    return this.contacts

  }
  addContact(contact : Contact) : void {
    this.contacts.push(contact);
    console.log("Contact will be  added ")
  }
  updateContact(contact: Contact , id : number) : void {
    this.contacts[id-1] = { ...contact };
  }
  deleteContact(id: number  | undefined): void{
    console.log("Contact will be  deleted ")
  }
}

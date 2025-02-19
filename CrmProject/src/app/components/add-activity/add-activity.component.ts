import { Component, OnInit } from '@angular/core';
import { Activity } from '../../model/Activity.model';
import { ActivityService } from '../../services/activity/activity.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-activity',
  template: `
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12 p-md-6">
        <label for="date">Date <span class="text-danger">*</span></label>
        <input id="date" type="date" pInputText [(ngModel)]="formData.date" name="date">
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="activites">Activity Type</label>
        <p-dropdown inputId="activites" [options]="activites" [(ngModel)]="formData.activites"
                    placeholder="Select Activity Type" optionLabel="name"></p-dropdown>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="participants">Participants</label>
        <p-multiSelect inputId="participants" [options]="participants" [(ngModel)]="formData.participants"
                       placeholder="Select Participants"></p-multiSelect>
      </div>


      <div class="p-field p-col-12 p-md-6">
        <label for="subject">Subject</label>
        <input id="subject" type="text" pInputText [(ngModel)]="formData.subject">
      </div>

      <div class="p-field p-col-12">
        <label for="note">Note</label>
        <textarea id="note" pInputTextarea [(ngModel)]="formData.note"></textarea>
      </div>


      <div class="p-field p-col-12">
        <label for="fileUpload">Document</label>
        <p-fileUpload
          id="fileUpload"
          mode="advanced"
          name="documents"
          accept=".pdf,.doc,.docx,.png,.jpg"
          (onSelect)="onFileSelected($event)"
          chooseLabel="Parcourir"

        ></p-fileUpload>
      </div>



      <p-toolbar class="p-mb-4">
        <ng-template pTemplate="left">
          <button pButton type="button" [disabled]="invalid" pRipple label="Submit" icon="pi pi-plus"
                  class="p-button-success p-mr-2" (click)="addNew()">
          </button>
        </ng-template>

        <ng-template pTemplate="right">
          <button pButton pRipple label="Send Email" icon="pi pi-envelope"
                  class="p-button-primary" (click)="sendEmail()">
          </button>
        </ng-template>
      </p-toolbar>

      <p-message *ngIf="showMessage" severity="success" text="Activity added successfully!"></p-message>
    </div>
  `,
  styles: []
})
export class AddActivityComponent implements OnInit {
  checkUpdate: boolean = false;
  id: number = 0;
  activity: Activity = {} as Activity;
  invalid: boolean = false;
  showMessage: boolean = false;
  formData = {
    date: new Date(),
    participants: [] as string[],
    activites: '',
    subject: '',
    note: '',
    documents: [] as File[],
  };

  participants = ["User1","User2","User3","User4","User5","User6"];


  activites = [
    { name: 'Meeting', value: 'Meeting' },
    { name: 'Call', value: 'Call' },
  ];

  constructor(private activityService: ActivityService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  ngOnInit(): void {
    if (this.config.data?.checkUpdate !== undefined) {
      this.checkUpdate = this.config.data.checkUpdate;
    }
    if (this.config.data?.id !== undefined) {
      this.id = this.config.data.id;
    }
  }
  addNew() {
    if (this.formData.date && this.formData.subject) {

      if (this.checkUpdate) {
        this.activityService.updateActivity(this.formData, this.id);
      } else {
        this.activityService.addActivity(this.formData);
      }
      this.showMessage = true;
    } else {
      this.invalid = true;
    }
  }


  onFileSelected(event: any) {
    this.formData.documents = Array.from(event.target.files);
  }

  sendEmail() {}
}

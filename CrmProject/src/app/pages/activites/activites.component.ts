import { Component, OnInit, ViewChild } from '@angular/core';
import { Activity } from '../../model/Activity.model';
import { ActivityService } from '../../services/activity/activity.service';
import { Table } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog';
import { AddActivityComponent } from '../../components/add-activity/add-activity.component';

@Component({
  selector: 'app-activities',
  template: `
    <p-toast></p-toast>

    <div class="card">
      <p-toolbar styleClass="p-mb-4">
        <ng-template pTemplate="left">
          <button pButton pRipple label="New Activity" icon="pi pi-plus" class="p-button-success p-mr-2" (click)="openNew()"></button>
          <button pButton pRipple label="Delete" icon="pi pi-trash" class="p-button-danger" (click)="deleteSelectedActivities()" [disabled]="!selectedActivities || !selectedActivities.length"></button>
        </ng-template>
      </p-toolbar>

      <p-table #dt [value]="activities" [rows]="10" [paginator]="true" [globalFilterFields]="['Subject', 'Note']" responsiveLayout="scroll"
               [(selection)]="selectedActivities" [rowHover]="true" dataKey="id"
               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" [showCurrentPageReport]="true">

        <ng-template pTemplate="caption">
          <div class="p-d-flex p-ai-center p-jc-between">
            <h5 class="p-m-0">Manage Activities</h5>
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
            <th pSortableColumn="Date">Date <p-sortIcon field="Date"></p-sortIcon></th>
            <th pSortableColumn="Participants">Participants <p-sortIcon field="Participants"></p-sortIcon></th>
            <th pSortableColumn="Subject">Subject <p-sortIcon field="Subject"></p-sortIcon></th>
            <th pSortableColumn="Note">Note <p-sortIcon field="Note"></p-sortIcon></th>
            <th></th>
          </tr>
        </ng-template>

        <ng-template pTemplate="body" let-activity>
          <tr>
            <td>
              <p-tableCheckbox [value]="activity"></p-tableCheckbox>
            </td>
            <td>{{ activity.date | date: 'yyyy-MM-dd' }}</td>
            <td>{{ activity.participants.join(', ') }}</td>
            <td>{{ activity.subject }}</td>
            <td>{{ activity.note }}</td>
            <td>
              <button pButton pRipple icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" (click)="editActivity(activity)"></button>
              <button pButton pRipple icon="pi pi-trash" class="p-button-rounded p-button-warning" (click)="deleteActivity(activity)"></button>
            </td>
          </tr>
        </ng-template>

        <ng-template pTemplate="summary">
          <div class="p-d-flex p-ai-center p-jc-between">
            In total there are {{ activities ? activities.length : 0 }} activities.
          </div>
        </ng-template>

      </p-table>
    </div>
  `,
  styles: [],
  providers: [DialogService],
})
export class ActivitesComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  activities: Activity[] = [];
  selectedActivities: Activity[] = [];

  constructor(private activityService: ActivityService, private dialogService: DialogService) {}

  ngOnInit(): void {
    this.activities = this.activityService.getActivities();
  }

  filterGlobal(event: EventTarget | null, filterParam: string) {
    const eventAsInput = event as HTMLInputElement;
    this.dt.filterGlobal(eventAsInput.value, filterParam);
  }

  openNew() {
    this.dialogService.open(AddActivityComponent, {
      data: { checkUpdate: false },
      header: 'Add Activity',
      width: '70%',
      height: '70%',
    });
  }

  editActivity(activity: Activity) {
    this.dialogService.open(AddActivityComponent, {
      data: { checkUpdate: true, id : activity.id},
      header: 'Edit Activity',
      width: '70%',
      height: '70%',
    });
  }

  deleteActivity(activity: Activity) {
    if (activity && activity.id) {
      this.activityService.deleteActivity(activity.id);
      this.activities = this.activities.filter(a => a.id !== activity.id);
    }
  }

  deleteSelectedActivities() {
    if (this.selectedActivities.length > 0) {
      this.selectedActivities.forEach(activity => this.activityService.deleteActivity(activity.id!));
      this.activities = this.activities.filter(a => !this.selectedActivities.includes(a));
      this.selectedActivities = [];
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <p-menubar [model]="items">
      <ng-template #item let-item>
        <ng-container *ngIf="!item.items; else hasSubmenu">
          <ng-container *ngIf="item.routerLink; else urlRef">
            <a [routerLink]="item.routerLink" class="p-menubar-item-link" (click)="onItemClick(item)">
              <span [class]="item.icon"></span>
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </ng-container>
          <ng-template #urlRef>
            <a *ngIf="item.url; else noLink" [href]="item.url" class="p-menubar-item-link">
              <span [class]="item.icon"></span>
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </ng-template>
          <ng-template #noLink>
            <div class="p-menubar-item-link">
              <span [class]="item.icon"></span>
              <span class="ml-2">{{ item.label }}</span>
            </div>
          </ng-template>
        </ng-container>

        <ng-template #hasSubmenu>
          <div class="p-menubar-item-link" (click)="onItemClick(item)">
            <span [class]="item.icon"></span>
            <span class="ml-2">{{ item.label }}</span>
            <span class="pi pi-fw pi-angle-down ml-2"></span>
          </div>
        </ng-template>
      </ng-template>
    </p-menubar>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {

  crmClickCount = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onItemClick(item: MenuItem) {
    if (item.label === 'CRM') {
      this.crmClickCount++;

      if (this.crmClickCount === 2) {
        this.router.navigate(['/contacts']);
        this.crmClickCount = 0;
      }

      setTimeout(() => {
        this.crmClickCount = 0;
      }, 500);
    }
  }

  items: MenuItem[] = [
    {
      label: 'CRM',
      icon: 'pi pi-fw pi-sitemap',
      items: [
        {
          label: 'Contacts',
          icon: 'pi pi-fw pi-users',
          routerLink: ['/contacts']
        },
        {
          label: 'Activities',
          icon: 'pi pi-fw pi-calendar',
          routerLink: ['/activities']
        }
      ],
      command: () => this.onItemClick({ label: 'CRM' })
    }
  ];
}

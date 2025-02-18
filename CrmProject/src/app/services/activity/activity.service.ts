import { Injectable } from '@angular/core';
import {Activity} from "../../model/Activity.model";
import {Contact} from "../../model/Contact.model";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activites: Activity[] = [
    {
      id: 1,
      date: new Date('2020-02-13'),
      participants: ['Jeremy Hagdinberg'],
      subject: '',
      note: ''
    },
    {
      id: 2,
      date: new Date('2018-07-07'),
      participants: ['Jeremy Hagdinberg'],
      subject: '',
      note: ''
    },
    {
      id: 3,
      date: new Date('2019-12-21'),
      participants: ['Jeremy Hagdinberg'],
      subject: '',
      note: ''
    },
    {
      id: 4,
      date: new Date('2020-04-08'),
      participants: ['Sébastien Boyé'],
      subject: '',
      note: ''
    },
    {
      id: 5,
      date: new Date('2021-07-09'),
      participants: ['Sébastien Boyé'],
      subject: '',
      note: ''
    },
    {
      id: 6,
      date: new Date('2022-05-06'),
      participants: [],
      subject: '',
      note: ''
    },
    {
      id: 7,
      date: new Date('2022-05-03'),
      participants: [],
      subject: 'for investment in tagger',
      note: ''
    },
    {
      id: 8,
      date: new Date('2022-05-11'),
      participants: [],
      subject: 'Lunch',
      note: ''
    },
    {
      id: 9,
      date: new Date('2022-05-02'),
      participants: [],
      subject: '1st contact',
      note: 'idalozeuzahapopelazoi'
    },
    {
      id: 10,
      date: new Date('2021-07-09'),
      participants: ['Sébastien Boyé'],
      subject: 'fez',
      note: ''
    },
    {
      id: 11,
      date: new Date('2022-05-06'),
      participants: [],
      subject: 'fezf',
      note: ''
    },
    {
      id: 12,
      date: new Date('2022-05-03'),
      participants: [],
      subject: 'for investment in tagger',
      note: ''
    },
    {
      id: 13,
      date: new Date('2022-05-11'),
      participants: [],
      subject: 'Lunch',
      note: ''
    },
    {
      id: 14,
      date: new Date('2022-05-02'),
      participants: [],
      subject: '1st contact',
      note: 'idalozeuzahapopelazoi'
    }
  ];

  constructor() { }

  getActivities() {
    return this.activites
  }
  addActivity(activity : Activity ) : void {
    this.activites.push(activity);


    console.log("Activity will be  added ")
  }
  updateActivity(activity: Activity , id : number) : void {
    this.activites[id-1] ={ ...activity }
  }
  deleteActivity(id:number | undefined) : void {
    console.log("Activty will be  deleted ")
  }
}

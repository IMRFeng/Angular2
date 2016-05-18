import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment';
import { PeopleService } from './../../services/people/people.service';
import { Person } from './../../models/models';

@Component({
  moduleId: module.id,
  selector: 'weights',
  templateUrl: 'weights.component.html'
})
export class WeightsComponent implements OnInit {
  months: string[] = moment.monthsShort();
  date: Date = new Date();
  people: Person[];
  
  constructor(private peopleService: PeopleService) { }

  ngOnInit() { 
    this.get(this.date);
  }
  
  get(date: Date) {
    this.peopleService.get(date)
        .subscribe(people => {
            this.people = people;
        });
  }

}
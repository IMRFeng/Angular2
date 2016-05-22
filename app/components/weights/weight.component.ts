import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import * as moment from 'moment/moment';
import { PeopleService } from './../../services/people/people.service';
import { Person, Chart } from './../../models/models';
import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';

@Component({
  moduleId: module.id,
  selector: 'weights',
  templateUrl: 'weights.component.html',
  styleUrls: ['weights.component.css'],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES],
  encapsulation: ViewEncapsulation.None
})
export class WeightsComponent implements OnInit {
  months: string[] = moment.monthsShort();
  date: Date = new Date();
  people: Person[];
  selectedYear = this.date.getFullYear();
  lineChart = new Chart();
  colors = ['red', 'blue', 'green', 'orange', 'pink', 'gold', 'purple', 'rose'];
  dataFormatted: boolean = false;
    
  constructor(private peopleService: PeopleService) {
  }

  ngOnInit() {
    this.get(this.date);
  }
  
  changeValue(people) {
    this.people = [...people];
    this.formatChartData();
  }

  changeYear(amount) {
    this.date.setFullYear(this.date.getFullYear() + amount);
    this.selectedYear = this.date.getFullYear();
    this.get(this.date);
  }
  
  get(date: Date) {
    this.peopleService.get(date)
        .subscribe(people => {
            this.people = people;
            this.formatChartData();
        });
  }
  
  formatChartData() {
    let _lineChartData = [];
    let _lineChartSeries = [];
    
    this.formatColors();
    
    this.people.forEach((person) => {
      let arr = person.Weights.map((w) => {
        return w.Kg;
      });
      _lineChartData.push({data: arr, label: person.FullName});
      _lineChartSeries.push(person.FullName);
    });
    
    this.lineChart.chartType = 'line';
    this.lineChart.chartData = _lineChartData;
    this.lineChart.lineChartLegend = false;
    this.lineChart.chartSeries = _lineChartSeries;
    this.lineChart.chartLabels = this.months;
    
    this.lineChart.chartOptions = {
        animation: false,
        multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>',
        responsive: true
    };
    
    this.dataFormatted = true;
  }
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  
  formatColors() {
    let _chartColors = [];
    _chartColors.push(this.colors.map((color) => {
      return {
        fillColor: 'rgba(220,220,220, 0.1)',
        strokeColor: color,
        pointColor: color,
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: color,
      };
    }));
    this.lineChart.chartColors = _chartColors;
  }
    
  create() {
    let person = new Person();
    this.peopleService.create(person, this.selectedYear)
      .subscribe((person) => {
          console.log(`successfully added person`);
          this.people = [...this.people, person];
      });
  }

  put(people: Person[]) {
    this.peopleService.put(people)
      .subscribe((people) => {
          console.log(`successfully updated people`);
      });
  }

  delete(person: Person) {
    this.peopleService.delete(person)
      .subscribe((person) => {
          this.people = _.remove(this.people, (p) => {
              return p.Id !== person.Id;
          });
          console.log(`successfully deleted person`);
      });
  }

}
import { Component } from '@angular/core';
import {WeightsComponent} from './../weights/weight.component';

@Component({
  selector: 'my-app',
  directives: [WeightsComponent],
  template: `
    <weights></weights>
  `
})
export class AppComponent { }

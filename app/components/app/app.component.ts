import { Component } from '@angular/core';
import {WeightsComponent} from './../weights/weight.component';

@Component({
  selector: 'my-app',
  directives: [WeightsComponent],
  template: `
    <div class="container">
      <weights></weights>
    </div>
  `
})
export class AppComponent { }

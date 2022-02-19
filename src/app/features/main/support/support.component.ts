import { Component } from '@angular/core';
import { opacityAnimation } from '@core/animations/opacity-animation';

@Component({
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  animations: [opacityAnimation]
})
export class SupportComponent {
  constructor() { }
}

import { Component, Input } from '@angular/core';
import { opacityAnimation } from '@core/animations/opacity-animation';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [opacityAnimation],
})
export class LoaderComponent {
  @Input() height: string = '60vh';
}

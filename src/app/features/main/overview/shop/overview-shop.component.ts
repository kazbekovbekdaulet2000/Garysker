import { Component } from '@angular/core';
import { opacityAnimation } from '@core/animations/opacity-animation';

@Component({
  selector: 'app-overview-shop',
  templateUrl: './overview-shop.component.html',
  styleUrls: ['./overview-shop.component.scss'],
  animations: [opacityAnimation]
})
export class ProjectOverviewShopComponent {
}
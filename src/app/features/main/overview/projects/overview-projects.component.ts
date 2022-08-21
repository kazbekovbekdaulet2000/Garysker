import { Component, Input } from '@angular/core';
import { opacityAnimation } from '@core/animations/opacity-animation';

@Component({
  selector: 'app-overview-projects',
  templateUrl: './overview-projects.component.html',
  styleUrls: ['./overview-projects.component.scss'],
  animations: [opacityAnimation]
})
export class ProjectOverviewProjectsComponent {
  @Input() project: any = null
}
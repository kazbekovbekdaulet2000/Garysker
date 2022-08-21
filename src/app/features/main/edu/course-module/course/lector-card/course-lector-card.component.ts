import { Component, Input } from '@angular/core';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { LectorDetailModel } from '@core/models/api/lector.model';

@Component({
  selector: 'app-course-lector-card',
  templateUrl: './course-lector-card.component.html',
  styleUrls: ['./course-lector-card.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class CourseLectorCardComponent {
  @Input() lector: LectorDetailModel;
  @Input() show_desc: boolean = true;
}


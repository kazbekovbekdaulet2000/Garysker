import {Component, Input} from '@angular/core';
import { VideoModel } from '@core/models/api/video.model';
import { opacityAnimation } from '@core/animations/opacity-animation';

@Component({
  selector: 'video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  animations: [opacityAnimation]
})
export class VideoCardComponent {

  @Input() video!: VideoModel;

  constructor(
  ) {}
}

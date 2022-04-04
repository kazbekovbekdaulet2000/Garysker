import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { VideoModel } from '@core/models/api/video.model';
import { opacityAnimation } from '@core/animations/opacity-animation';
import * as moment from 'moment';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  animations: [opacityAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class VideoCardComponent implements OnInit {

  @Input() video!: VideoModel;
  @Input() width: string = '360px';
  @Input() fontSize: string = 'normal'
  @Input() small: boolean = false

  ngOnInit(): void {
    if (this.video.image === null) {
      this.video.image = 'https://images.unsplash.com/photo-1526614180703-827d23e7c8f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
    }
  }

  getTime(duriation: string) {
    return moment.duration(duriation).asMilliseconds()
  }
}

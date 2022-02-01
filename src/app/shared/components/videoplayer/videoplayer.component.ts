import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { VideoDetailModel } from '@core/models/api/video.model';
import { PlyrComponent } from 'ngx-plyr';
import { videoI18n } from './videoplayer.i18n';

@Component({
  selector: 'app-plyr-player',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss'],
  animations: [opacityAnimation, heightOutAnimation]
})
export class PlyrVideoPlayerComponent implements OnInit {
  
  @Input() entity: VideoDetailModel | any
  @Input() link: string | any;

  @ViewChild(PlyrComponent)
  plyr!: PlyrComponent;
  player!: Plyr;

  videoSources: Plyr.Source[] = []

  videoOption: Plyr.Options = {
    ratio: "16:9",
    // quality: { 
    //   forced: true,
    //   default: 576, 
    //   options: [2160, 1440, 1080, 720, 576, 480, 360, 240] 
    // },
    // backend doesn have quality options yeet
    i18n: videoI18n,
    autoplay: false,
    volume: 1,
    fullscreen: {
      enabled: true,
      iosNative: true
    },
    storage: {
      enabled: true,
      key: "vidoe_storage"
    }
  }

  ngOnInit(): void {
    if (this.link) {
      this.videoSources = [
        {
          src: this.link,
          provider: 'html5',
        },
      ];
    }
  }

  play(): void {
    this.player.play();
  }

}

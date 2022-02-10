import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { VideoDetailModel, VideoModel } from '@core/models/api/video.model';
import { Select } from '@ngxs/store';
import { PlyrComponent } from 'ngx-plyr';
import * as Plyr from 'plyr';
import { Observable } from 'rxjs';
import { VideoState } from 'src/app/features/main/edu/video-module/video.state';
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

  @Select(VideoState.video) video$!: Observable<VideoDetailModel>

  @ViewChild(PlyrComponent)
  plyr!: PlyrComponent;
  player!: Plyr;

  videoSources: Plyr.Source[] = []

  viderQuality!: Plyr.QualityOptions

  videoOption: Plyr.Options = {
    ratio: "16:9",
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
    } else {
      this.video$.subscribe(link => {
        const new_link = link.video.split('/video-video/')[0]
        link.video_quality.forEach(video => {
          const q_link = video.path
          if (link.original_quality === video.quality) {
            this.videoSources.push({
              src: link.video,
              type: 'video/mp4',
              size: link.original_quality,
            })
          } else {
            this.videoSources.push({
              src: `${new_link}/video-video/${q_link}`,
              type: 'video/mp4',
              size: video.quality
            })
          }

        })

      })
    }
  }

  play(): void {
    this.player.play();
  }

}

import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
export class PlyrVideoPlayerComponent implements OnInit, OnDestroy {
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
  }

  ngOnDestroy(): void {
    this.player.destroy()
  }

  ngOnInit(): void {
    this.videoSources = []
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
        this.videoSources.push({
          src: link.video,
          provider: 'html5',
          type: 'video/mp4',
          size: this.get_quality(link.original_quality),
        })
        link.video_quality.forEach((video: any) => {
          const q_link = video.path
          this.videoSources.push({
            src: `${new_link}/video-video/${q_link}`,
            provider: 'html5',
            type: 'video/mp4',
            size: video.quality
          })
        })
      })
    }
  }

  get_quality(quality: number): number {
    if (quality > 1080 && quality <= 1440) {
      return 1440
    }
    if (quality > 1440 && quality <= 2160) {
      return 2160
    }
    if (quality > 720 && quality <= 1080) {
      return 1080
    }
    if (quality > 480 && quality <= 720) {
      return 720
    }
    if (quality > 360 && quality <= 480) {
      return 480
    }
    return 240
  }

  play(): void {
    this.player.play();
  }

}

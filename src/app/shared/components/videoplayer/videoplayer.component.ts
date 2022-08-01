import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { VideoTranscodeModel } from '@core/models/api/video/video-transcode.model';
import { PlyrComponent } from 'ngx-plyr';
import * as Plyr from 'plyr';
import { videoI18n } from './videoplayer.i18n';

@Component({
  selector: 'app-video-player',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss'],
  animations: [opacityAnimation, heightOutAnimation]
})
export class VideoPlayerComponent implements OnInit, OnDestroy, OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.video) {
      this.ngOnInit()
    }
  }

  @Input() video: VideoTranscodeModel | undefined;
  @Input() link: string | undefined;
  @ViewChild(PlyrComponent) plyr: PlyrComponent | undefined;

  player!: Plyr;
  videoSources: Plyr.Source[] = [];
  viderQuality!: Plyr.QualityOptions
  videoTracks: Plyr.Track[] = []

  videoOption: Plyr.Options = {
    ratio: "16:9",
    i18n: videoI18n,
    autoplay: false,
    volume: 1,
    fullscreen: {
      enabled: true,
      iosNative: true,
    },
  }

  ngOnDestroy(): void {
    this.player.destroy()
  }

  ngOnInit(): void {
    if (this.video) {
      this.videoSources = this.video.qualities.map(obj => {
        return {
          src: obj.url.split('?')[0],
          provider: 'html5',
          size: obj.quality
        }
      })
      this.videoSources.push({ src: this.video.video, provider: 'html5' })
    }
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

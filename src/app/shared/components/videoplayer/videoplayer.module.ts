import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { VideoPlayerComponent } from "./videoplayer.component";
import { PlyrModule } from 'ngx-plyr';

@NgModule({
  declarations: [
    VideoPlayerComponent
  ],
  exports: [
    VideoPlayerComponent
  ],
  imports: [
    CommonModule,
    PlyrModule,
  ],
})
export class VideoPlayerModule {
}

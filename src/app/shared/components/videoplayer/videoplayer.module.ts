import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PlyrVideoPlayerComponent } from "./videoplayer.component";
import { PlyrModule } from 'ngx-plyr';

@NgModule({
  declarations: [
    PlyrVideoPlayerComponent
  ],
  exports: [
    PlyrVideoPlayerComponent
  ],
  imports: [
    CommonModule,
    PlyrModule,
  ],
})
export class PlyrVideoPlayerModule {
}

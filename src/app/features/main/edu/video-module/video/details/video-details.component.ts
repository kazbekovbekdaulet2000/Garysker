import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VideoDetailModel } from '@core/models/api/video.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LinkShareModalComponent } from 'src/app/shared/modals/share-modal/share-modal.component';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss']
})
export class VideoDetailsComponent {
  @Input() entity: VideoDetailModel
  @Output() like = new EventEmitter()
  @Output() save = new EventEmitter()

  constructor(
    private bsService: BsModalService,
  ) { }

  onShare() {
    this.bsService.show(LinkShareModalComponent, { class: 'modal-dialog-centered' })
  }
}

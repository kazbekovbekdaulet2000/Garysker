import { Component, EventEmitter, Input, Output } from '@angular/core';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CommentModel } from '@core/models/api/comment.model';

@Component({
  selector: 'app-reply-menu-module',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
  animations: [opacityAnimation, heightOutAnimation]
})
export class ReplyComponent {

  @Input() replyContent: any

  @Output() reply = new EventEmitter<CommentModel>();

  constructor(
  ) { }

  removeReplyParent() {
    this.replyContent = null
  }
}

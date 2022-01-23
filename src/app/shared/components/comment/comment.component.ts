import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CommentModel } from '@core/models/api/comment.model';
import { AuthState } from '@core/states/auth/auth.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comment-module',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [opacityAnimation, heightOutAnimation]
})
export class CommentComponent{

  @Select(AuthState.access) access$!: Observable<string>

  hideAns = true;
  @Input() comment!: CommentModel;
  @Input() isReply: boolean = false;
  @Input() isLast: boolean = false;

  @Output() reply = new EventEmitter<CommentModel>();

  constructor(
  ) {}

  addReply(value: CommentModel){
    this.reply.emit(value)
  }

  showMore(){
    this.hideAns = !this.hideAns
  }

  get getCommentCount(){
    // Показать
    const prev = this.hideAns ? "Показать" : "Скрыть"
    if(this.comment.replies.length >= 1 && this.comment.replies.length <= 4){
      return `${prev} ${this.comment.replies.length} ответа`
    }else if(this.comment.replies.length >= 5){
      return `${prev} ${this.comment.replies.length} ответов`
    }else{
      return `${prev} ${this.comment.replies.length} ответ`
    }
  }
}

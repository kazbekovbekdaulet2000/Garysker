import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { CommentModel } from '@core/models/api/comment.model';
import { ListResponseModel } from '@core/models/api/list.model';
import { ReportDetailModel } from '@core/models/api/report.model';
import { ReportsService } from '@core/services/reports.service';
import { AuthState } from '@core/states/auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ClearReportDetail, GetReport, ListReportComments, PostReportComment } from '../../main.actions';
import { MainState } from '../../main.state';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [opacityAnimation, heightAnimation]
})
export class ReportComponent implements OnDestroy, AfterViewInit {

  @Select(AuthState.access) access$!: Observable<string>;
  @Select(MainState.report) report$!: Observable<ReportDetailModel>;
  @Select(MainState.comments) comments$!: Observable<ListResponseModel<CommentModel>>;

  @ViewChild('body') body!: ElementRef<any>

  replyContent: any | null

  formGroup: FormGroup | any;
  reportId: number | undefined;
  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private reportService: ReportsService
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.reportId = id
      this.store.dispatch(new GetReport(id))
      this.store.dispatch(new ListReportComments(id))

      this.formGroup = this.formBuilder.group({
        body: [null, Validators.required],
        reply: [null],
        report: [id, Validators.required]
      })

    })
  }

  ngAfterViewInit() {
    throw ("asd")
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ClearReportDetail)
  }

  sendComment() {
    const payload = this.formGroup.getRawValue()
    if (payload.body !== '') {
      this.reportService.postComment(this.reportId!, payload)
        .toPromise()
        .then(()=> {
          this.replyContent = null
          this.formGroup.patchValue({
            body: null,
            reply: null, 
          })
          this.store.dispatch(new ListReportComments(this.reportId!))
        })
        .catch((err)=>{
          alert(err)
        })
    }
  }

  addReply(reply: CommentModel) {
    if(this.replyContent?.id === reply.id){
      this.replyContent = null
      this.formGroup.patchValue({
        reply: null, 
      });
    }else{
      this.replyContent = reply
      this.formGroup.patchValue({
        reply: this.replyContent.id, 
      });
    }
  }

  removeReplyParent(){
    this.replyContent = null
  }

}

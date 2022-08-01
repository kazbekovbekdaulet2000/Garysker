import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { ProjectDetailModel } from '@core/models/api/projects.model';
import { DonationService } from '@core/services/donation.service';
import { ProjectsService } from '@core/services/projects.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SelectListConfig } from 'src/app/shared/components/input/selections/select.config';
import { VideoPlayerComponent } from 'src/app/shared/components/videoplayer/videoplayer.component';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';

@Component({
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  animations: [opacityAnimation]
})
export class ProjectDetailComponent {

  project: ProjectDetailModel | null = null;
  index: number = 0;
  reqAmount: number = 1000 / 0.982
  selfAmount = false
  amount: SelectListConfig[] = []

  formData = this.formBuilder.group({
    amount: [1000, Validators.required],
    full_name: [null, Validators.required],
    donation: [null, Validators.required],
    email: [null, Validators.email],
    rules: [false, Validators.required]
  });

  @ViewChild(VideoPlayerComponent) player: VideoPlayerComponent | undefined

  constructor(
    private projectsService: ProjectsService,
    private donationService: DonationService,
    private activatedRoute: ActivatedRoute,
    private bsModalService: BsModalService,
    private formBuilder: FormBuilder,
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.projectsService.get(id)
        .toPromise()
        .then(project => {
          this.project = project
          this.amount = [
            ...project.children[this.index].donat.default_options.map((val, i) => {
              return {
                title: `${val} ₸`,
                selected: id === 0 ? true : false,
                id: val
              }
            }),
            {
              title: 'support.another_amount',
            }
          ]
          this.formData.get('donation')?.patchValue(this.project.children[this.index].donat.id)
        })
        .catch(err => {
          if (err.status === 404) {
            this.bsModalService.show(MessageModalComponent, {
              initialState: {
                message: "projects.error.not_found",
                icon: 'sticker1'
              },
              class: 'modal-dialog-centered'
            })
            history.back()
          }
        })
    })
  }

  onTypeSelect(index: number) {
    this.index = index
    this.player!.video = this.project!.children[index]!.video!
    this.formData.get('donation')?.patchValue(this.project!.children[this.index].donat.id)
    this.player?.ngOnInit()
  }

  selectAmount(selection: SelectListConfig) {
    if (selection.id) {
      this.formData.patchValue({
        amount: selection.id
      })
      this.reqAmount = selection.id / 0.982
    } else {
      this.selfAmount = true
    }
  }

  get collectedPersentage(): number {
    return (this.project?.children[this.index].donat.collected! / this.project?.children[this.index].donat.required!) * 100 || 0
  }

  get getAmount(): number {
    return parseFloat(this._amount.toFixed(0))
  }

  get _amount(): number {
    return this.formData.get('amount')?.value / 0.982 - this.formData.get('amount')?.value
  }

  helpProject() {
    const payload = this.formData.getRawValue()
    if (payload.rules) {
      payload.amount = Number((this.formData.get('amount')?.value || 1000) / 0.982).toFixed(0)
    }
    this.donationService.fetch(payload).subscribe(data=>{
      window.open(data.ioka_answer.order.checkout_url)
    })
  }
}

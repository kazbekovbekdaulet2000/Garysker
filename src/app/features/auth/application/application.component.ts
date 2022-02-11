import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { opacityUpDownAnimation } from '@core/animations/opacity-up-down-animation';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApplicationModalComponent } from './modal/application-modal.component';
import { SignUpSections, StageModel } from './sign-up-sections';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  animations: [opacityUpDownAnimation, opacityAnimation]
})

export class ApplicationComponent {

  modalRef!: BsModalRef;
  formGroup!: FormGroup;

  stage_num: number = 0;

  tabChanged: boolean = true;

  stages: StageModel[] = SignUpSections

  constructor(
    private bsService: BsModalService
  ) { }

  openModal() {
    this.bsService.show(
      ApplicationModalComponent,
      {
        class: 'modal-lg modal-dialog-centered',
      })
  }

  onSelect(stage_num: number) {
    if (this.stage_num !== stage_num) {
      this.tabChanged = false
      this.stage_num = stage_num
      setTimeout(() => {
        this.tabChanged = true
      }, 500)
    }

  }

  nextSection(event: any) {
    console.log(event)
    this.tabChanged = false
    if (this.stage_num === this.stages.length-1) {
      return
    }
    this.stage_num++
    setTimeout(() => {
      this.tabChanged = true
    }, 500)
  }
}

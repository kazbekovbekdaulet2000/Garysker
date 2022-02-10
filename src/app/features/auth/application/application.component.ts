import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { opacityUpDownAnimation } from '@core/animations/opacity-up-down-animation';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApplicationModalComponent } from './modal/application-modal.component';

export interface StageModel {
  id: number
  title: string
  description: string
  icon: string
}

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  animations: [opacityUpDownAnimation, opacityAnimation]
})

export class ApplicationComponent {

  modalRef!: BsModalRef;
  formGroup!: FormGroup;

  stage_num: number = 1;

  tabChanged: boolean = true;

  stages: StageModel[] = [
    { id: 1, title: "О вас", description: "пройти и зарегистрироваться", icon: "assets/icons/person.svg" },
    { id: 2, title: "Деятельность", description: "пройти и зарегистрироваться", icon: "assets/icons/about-page.svg" },
    { id: 3, title: "Ценности проекта", description: "пройти и зарегистрироваться", icon: "assets/icons/star.svg" },
    { id: 5, title: "Данные для входа", description: "пройти и зарегистрироваться", icon: "assets/icons/message.svg" },
  ]

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

  next() {
    this.tabChanged = false
    if (this.stage_num === 5) {
      return
    }
    this.stage_num++
    setTimeout(() => {
      this.tabChanged = true
    }, 500)
  }
}

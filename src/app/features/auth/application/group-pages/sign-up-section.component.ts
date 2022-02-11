import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { opacityUpDownAnimation } from '@core/animations/opacity-up-down-animation';
import { BsModalService } from 'ngx-bootstrap/modal';
import { StageModel } from '../sign-up-sections';

@Component({
  selector: 'app-sign-up-section',
  templateUrl: './sign-up-section.component.html',
  styleUrls: ['./sign-up-section.component.scss'],
  animations: [opacityUpDownAnimation, opacityAnimation]
})

export class SignUpSectionComponent implements OnInit {

  @Input() form!: StageModel;

  formGroup!: FormGroup;

  @Output() next = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const list = this.form.config?.map(val => {
      return val.property
    })
    const controls = Object.assign({}, ...list!.map(key => ({ [String(key)]: "" })))
    this.formGroup = this.formBuilder.group(controls)
  }

  send() {
    this.next.emit(this.formGroup.getRawValue())
  }
}

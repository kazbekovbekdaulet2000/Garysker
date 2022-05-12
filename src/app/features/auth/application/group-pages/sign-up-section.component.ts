import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { opacityUpDownAnimation } from '@core/animations/opacity-up-down-animation';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';
import { InputConfig, StageModel } from '../sign-up-sections';

@Component({
  selector: 'app-sign-up-section',
  templateUrl: './sign-up-section.component.html',
  styleUrls: ['./sign-up-section.component.scss'],
  animations: [opacityUpDownAnimation, opacityAnimation]
})

export class SignUpSectionComponent implements OnInit {

  @Input() form!: StageModel;
  @Input() group!: FormGroup;
  @Input() stage: number = 0;
  @Output() next = new EventEmitter<any>();
  @Output() prev = new EventEmitter();
  selectedType: number = NaN;
  politics!: FormGroup;

  constructor(
    private bsService: BsModalService,
    private formBuilder: FormBuilder
  ) {
    this.politics = this.formBuilder.group({
      rules: []
    })
  }

  ngOnInit(): void {
    if (this.group.controls?.user_type) {
      this.selectedType = this.group.controls?.user_type.value
    }
  }

  updateSelection(key: any, val: any) {
    this.group.get(key)?.setValue(val.target.value)
  }

  send() {
    if(this.stage === 3 && this.politics.getRawValue().rules !== true){
      this.bsService.show(MessageModalComponent, {
        initialState: { message: "auth.message.err.policy" },
        class: 'modal-dialog-centered'
      })
      return
    }
    if (this.group.get('password')?.value !== this.group.get('re_password')?.value) {
      this.group.get('re_password')?.setErrors({ 'incorrect': true })
    }
    if (this.group.valid) {
      this.next.emit(this.group.getRawValue())
    } else {
      this.form.config?.forEach((val: InputConfig) => {
        if (!this.group.get(val.key!)?.valid) {
          this.group.get(val.key!)?.setErrors({ 'incorrect': true });
        }
      })
    }
  }

  back() {
    this.prev.emit()
  }

  choseType(i: number) {
    this.selectedType = i
    this.group.get('user_type')?.setValue(i)
  }
}

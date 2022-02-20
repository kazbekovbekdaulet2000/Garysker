import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { opacityUpDownAnimation } from '@core/animations/opacity-up-down-animation';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ErrorModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';
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

  cities: string[] = ['Алматы', 'Нур-Султан', 'Шымкент', 'Актобе', 'Караганда',
    'Тараз', 'Павлодар', 'Атырау', 'Усть-Каменогорск', 'Семей', 'Уральск', 'Кызылорда', 'Костанай',
    'Петропавловск', 'Актау', 'Темиртау', 'Туркестан', 'Кокшетау', 'Талдыкорган', 'Экибастуз', 'Рудный',
    'Жанаозен', 'Жезказган', 'Балхаш']
  constructor(
    private bsService: BsModalService
  ) { }

  ngOnInit(): void {
    if (this.group.controls?.user_type) {
      this.selectedType = this.group.controls?.user_type.value
    }
  }

  updateSelection(key: any, val: any) {
    this.group.get(key)?.setValue(val.target.value)
  }

  send() {
    if (this.group.valid) {
      this.next.emit(this.group.getRawValue())
    } else {
      this.bsService.show(ErrorModalComponent, {
        initialState: { message: "Данные не заполнены до конца" },
        class: 'modal-dialog-centered'
      })
      this.form.config?.forEach((val: InputConfig) => {
        if (!this.group.get(val.key!)?.valid){
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

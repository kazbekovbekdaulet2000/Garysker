import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import * as moment from 'moment';
import { InputConfig } from './datepicker.config';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { Select } from '@ngxs/store';
import { AppState } from '@core/states/app/app.state';
import { Observable } from 'rxjs';
import { LangType } from '@core/types/lang.type';

@Component({
  selector: 'app-input-date',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements ControlValueAccessor, OnInit {

  @Input() config: InputConfig | any;

  @Input() value: any;
  @Input() label!: string;
  @Input() hint = '';
  @Input() type = 'text';
  @Input() class = '';
  @Input() required: boolean = false;

  @Output() enter = new EventEmitter();

  disabled = false;

  @Select(AppState.lang) lang$!: Observable<LangType>

  constructor(
    @Self() @Optional() private control: NgControl,
    private localeService: BsLocaleService
  ) {
    this.lang$.subscribe(lang => {
      this.localeService.use(lang);
    })
    this.control.valueAccessor = this;
  }

  ngOnInit() {
    if (this.config) {
      this.hint = this.config.hint;
      this.label = this.config.label;
      this.type = this.config.type;
      this.required = this.config.required;
    }
  }

  onValueChange(value: any): void {
    var date = new Date(value);
    var formattedDate = moment(date).format('YYYY-MM-YY');
    this.value = value;
    this.onChange(formattedDate);
  }

  onReset(): void {
    this.value = null;
    this.onChange(null);
  }

  onChange = (_: any) => {
  };

  onTouch = (_: any) => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  writeValue(value: any): void {
    this.value = value;
  }
}

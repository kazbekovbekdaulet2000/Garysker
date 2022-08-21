import {Component, EventEmitter, Input, OnInit, Optional, Output, Self} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import { InputConfig } from './input.config';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor, OnInit {

  @Input() config: InputConfig | any;

  @Input() value: any;
  @Input() label!: string;
  @Input() hint = '';
  @Input() type = 'text';
  @Input() class = '';
  @Input() required: boolean = false;

  @Output() enter = new EventEmitter();

  disabled = false;

  constructor(
    @Self() @Optional() private control: NgControl
  ) {
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
    this.value = value;
    this.onChange(value);
  }

  onReset(): void {
    this.value = null;
    this.onChange(null);
  }

  onChange = (_:any) => {
  };

  onTouch = (_:any) => {
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

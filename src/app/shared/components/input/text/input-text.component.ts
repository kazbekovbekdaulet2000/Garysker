import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { AuthState } from '@core/states/auth/auth.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  animations: [opacityAnimation, heightOutAnimation]
})
export class InputTextComponent implements ControlValueAccessor, OnInit {

  @Input() value: any;
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() class = '';
  @Input() required: boolean = true;

  @Select(AuthState.access) access$!: Observable<string>;
  @Output() text = new EventEmitter<string>();

  constructor(
    @Self() @Optional() private control: NgControl
  ) {
    this.control.valueAccessor = this;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onValueChange(value: any): void {
    this.value = value;
    this.onChange(value);
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

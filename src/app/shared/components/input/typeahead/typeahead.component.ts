import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { NameModel } from '@core/models/name.model';
import { LocationService } from '@core/services/location.service';
import { AppState } from '@core/states/app/app.state';
import { LangType } from '@core/types/lang.type';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { InputConfig } from './typeahead.config';


@Component({
  selector: 'app-input-ahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
})
export class TypeaheadComponent implements ControlValueAccessor, OnInit {

  @Input() config: InputConfig | any;

  @Input() value: any;
  @Input() label!: string;
  @Input() hint = '';
  @Input() type = 'text';
  @Input() class = '';
  @Input() required: boolean = false;
  @Input() listType: 'countries' | 'cities' = 'countries'
  @Output() enter = new EventEmitter();

  @Select(AppState.lang) lang$!: Observable<LangType>

  disabled = false;
  listmodel!: NameModel[]
  list: string[] = []

  constructor(
    @Self() @Optional() private control: NgControl,
    private locationService: LocationService
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
    this.locationService.list(this.listType).subscribe(list => {
      this.listmodel = list
      this.lang$.subscribe(lang => {
        this.list = list.map(obj => {
          if (lang === 'kk') {
            return obj.name_kk
          }
          return obj.name_ru
        })
      })
    })
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

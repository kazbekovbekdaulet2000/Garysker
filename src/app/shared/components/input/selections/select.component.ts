import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectConfig, SelectListConfig } from './select.config';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {

  @Input() config: SelectConfig | any;

  @Input() value: any;
  @Input() label!: string;
  @Input() type = 'text';
  @Input() list: SelectListConfig[] = []
  @Input() class = '';
  @Input() required: boolean = false;

  @Output() selection = new EventEmitter<SelectListConfig>();

  disabled = false;

  constructor() {}

  ngOnInit() {
    if (this.config) {
      this.label = this.config.label;
      this.type = this.config.type;
    }
  }

  changeSelection(selection: SelectListConfig) {
    this.list.forEach(item => item.selected = false)
    selection.selected = true
    this.selection.emit(selection)
  }
}

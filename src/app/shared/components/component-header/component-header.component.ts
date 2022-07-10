import { Component, Input } from '@angular/core';
import { heightAnimation } from '@core/animations/height-animation';

@Component({
  selector: 'app-component-header',
  templateUrl: './component-header.component.html',
  styleUrls: ['./component-header.component.scss'],
  animations: [heightAnimation]
})
export class ComponentHeaderComponent {

  @Input() header: string = '';
  @Input() detail: string = '';

  @Input() show_detail: boolean = false;

  constructor(
  ) { }

  onShow(){
    this.show_detail = !this.show_detail
  }
}

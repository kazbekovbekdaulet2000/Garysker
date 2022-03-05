import { Component } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  updateSticky: Subject<boolean> = new Subject();

  constructor() { }

  updateMethod() {
    this.updateSticky.next(true);
  }
}

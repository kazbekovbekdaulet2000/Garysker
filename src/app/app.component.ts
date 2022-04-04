import { Component, OnInit } from '@angular/core';
import { Init } from '@core/states/app/app.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'garyshker-front';
  
  constructor(
    private store: Store
  ) {
    this.store.dispatch(Init);
  }
}

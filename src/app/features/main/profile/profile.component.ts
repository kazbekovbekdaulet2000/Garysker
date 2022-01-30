import { Component, OnInit } from '@angular/core';
import { RemoveToken } from '@core/states/auth/actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class MainProfileComponent {

  constructor(
    private store: Store
  ) { }

  logout() {
    this.store.dispatch(RemoveToken)
  }

}

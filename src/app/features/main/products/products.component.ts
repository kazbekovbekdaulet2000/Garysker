import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { AuthState } from '@core/states/auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [opacityAnimation]
})
export class ProductsComponent {
  @Select(AuthState.access) access$!: Observable<string>;

  constructor(
    private store: Store,
    private router: Router
  ) { }
  
  goRegister(){
    this.router.navigate(['auth/application'])
  }
}

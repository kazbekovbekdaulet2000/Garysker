import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { heightAnimation } from '@core/animations/height-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { DobroProjectModel } from '@core/models/api/dobro-project.model';
import { Select, Store } from '@ngxs/store'
import { Observable } from 'rxjs';
import { ListDobroProjects } from '../main.actions';
import { MainState } from '../main.state';

@Component({
  templateUrl: './dobro.component.html',
  styleUrls: ['./dobro.component.scss'],
  animations: [opacityAnimation, heightAnimation]
})
export class DobroComponent {
  @Select(MainState.dobro_projects) dobro_projects$!: Observable<DobroProjectModel[]>;

  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.store.dispatch(new ListDobroProjects())
  }

  parse(str: string){
    return parseFloat(str)
  }
}

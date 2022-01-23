import { Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DobroProjectModel } from '@core/models/api/dobro-project.model';
import { Select, Store } from '@ngxs/store'
import { Observable } from 'rxjs';
import { ClearDobroDetails, GetDobroProject } from '../../main.actions';
import { MainState } from '../../main.state';

@Component({
  templateUrl: './dobro-about.component.html',
  styleUrls: ['./dobro-about.component.scss']
})
export class DobroAboutComponent implements OnDestroy {
  @Select(MainState.dobro_project) dobro_project$!: Observable<DobroProjectModel>;

  tab: number = 1

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new GetDobroProject(Number(params.id)))
    })
  }
  ngOnDestroy(): void {
    this.store.dispatch(new ClearDobroDetails())
  }

  parse(str: string) {
    return parseFloat(str)
  }
  
  selectTab(indx: number) {
    this.tab = indx
  }
}

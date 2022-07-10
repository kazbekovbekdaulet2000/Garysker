import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { AuthState } from '@core/states/auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

interface ProjectPages {
  id: number
  name: string
  type: string
  color?: string
}

@Component({
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [opacityAnimation]
})
export class ProjectsComponent {
  types: ProjectPages[] = [
    {
      id: 1,
      name: 'projects.statuses.all',
      type: 'all'
    },
    {
      id: 2,
      name: 'projects.statuses.in_process',
      type: 'in_process'
    },
    {
      id: 3,
      name: 'projects.statuses.finished',
      type: 'finished',
    },
  ]
  selected_type: string = 'all'

  constructor(
    private store: Store,
    private router: Router
  ) { }

  onTypeSelect(type: ProjectPages){
    this.selected_type = type.type
  }
}

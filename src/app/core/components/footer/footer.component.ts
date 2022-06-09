import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'core-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private router: Router
  ) { }

  navigateAbout(stage: number) {
    this.router.navigate(['/about'], { queryParams: { stage } })
  }
}

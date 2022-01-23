import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';


@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(
    private router: Router,
  ) {}

  @HostListener('window:scroll')
  onScroll(): void {
  }
}

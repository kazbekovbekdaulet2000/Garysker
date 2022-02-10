import {ChangeDetectorRef, Component, ElementRef, HostListener, SimpleChanges, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';


@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}


  ngOnChanges(changes: SimpleChanges): void {
    this.changeDetector.detectChanges()
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges()
  }

  @HostListener('window:scroll')
  onScroll(): void {
  }
}

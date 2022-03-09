import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';


@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [opacityAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  updateSticky: Subject<boolean> = new Subject();

  @ViewChild('sidebar') sidebar!: ElementRef
  @ViewChild('content') content!: ElementRef

  destroy = new Subject();

  destroy$ = this.destroy.asObservable();

  constructor(
    private renderer: Renderer2,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$))
          .subscribe((e: Event) => {
            let contentLength = this.content.nativeElement.offsetHeight
            let diff = (document.documentElement.scrollTop + 507) - contentLength
            if (diff > 0) {
              this.renderer.setStyle(this.sidebar.nativeElement, 'margin-top', `${Math.round(-diff)}px`)
            } else {
              this.renderer.setStyle(this.sidebar.nativeElement, 'margin-top', `${0}px`)
            }
          });
      })
  }
}

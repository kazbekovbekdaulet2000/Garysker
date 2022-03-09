import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';


@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @ViewChild('sidebar') sidebar!: ElementRef
  @ViewChild('content') content!: ElementRef

  destroy = new Subject();

  destroy$ = this.destroy.asObservable();

  constructor(
    private router: Router,
    private renderer: Renderer2,
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
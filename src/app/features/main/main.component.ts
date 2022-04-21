import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {
  @ViewChild('sidebar') sidebar!: ElementRef
  @ViewChild('content') content!: ElementRef

  destroy = new Subject();

  destroy$ = this.destroy.asObservable();

  constructor(
    private renderer: Renderer2,
  ) {
    this.renderer.listen("window", "scroll", event => {
      let contentLength = this.content.nativeElement.offsetHeight
      let diff = (document.documentElement.scrollTop + 507) - contentLength
      if (diff > 0) {
        this.renderer.setStyle(this.sidebar.nativeElement, 'margin-top', `${Math.round(-diff)}px`)
      } else {
        this.renderer.setStyle(this.sidebar.nativeElement, 'margin-top', `${0}px`)
      }
    });
  }
  ngAfterViewInit(): void {
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        let contentLength = this.content.nativeElement.offsetHeight
        let diff = (document.documentElement.scrollTop + 507) - contentLength
        if (diff > 0) {
          this.renderer.setStyle(this.sidebar.nativeElement, 'margin-top', `${Math.round(-diff)}px`)
        } else {
          this.renderer.setStyle(this.sidebar.nativeElement, 'margin-top', `${0}px`)
        }
      });
    });
    observer.observe(this.content.nativeElement);
  }
}
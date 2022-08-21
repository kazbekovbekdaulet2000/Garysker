import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @ViewChild('content') content: ElementRef;
  contentHeight: number = 0;
  constructor(
    private renderer: Renderer2
  ) {
    this.renderer.listen("window", "scroll", () => {
      this.contentHeight=this.content.nativeElement.scrollHeight
    });
  }
}
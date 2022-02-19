import { Component, OnInit } from '@angular/core';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { PlyrComponent } from 'ngx-plyr';
import { videoI18n } from 'src/app/shared/components/videoplayer/videoplayer.i18n';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [opacityAnimation]
})
export class AboutComponent implements OnInit {

  constructor() { }

  sections: any = [
    { id: 0, name: 'О проекте' },
    { id: 1, name: 'Партнеры' },
    { id: 2, name: 'Связь' }
  ];

  selectedSection: number = 0;

  ngOnInit(): void {
  }

  changeTabs(index: number) {
    this.selectedSection = index;
  }
}

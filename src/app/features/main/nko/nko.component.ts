import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { opacityAnimation } from '@core/animations/opacity-animation';


@Component({
  templateUrl: './nko.component.html',
  styleUrls: ['./nko.component.scss'],
  animations: [opacityAnimation]
})
export class NKOComponent {

  constructor() { }

  downloadReport() {
    window.open('https://storage.yandexcloud.net/garysh-app/course/course_3/abdi', "_blank");
  }

  downloadNKO() {
    window.open('https://storage.yandexcloud.net/garysh-app/course/course_3/abdi', "_blank");
  }
}

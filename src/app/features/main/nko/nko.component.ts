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
    window.open('https://storage.yandexcloud.net/garysh-app/%D0%BE%D1%82%D1%87%D0%B5%D1%82-2021.pdf', "_blank");
  }

  downloadNKO() {
    window.open('https://storage.yandexcloud.net/garysh-app/Ustav_Fund.pdf', "_blank");
  }
}

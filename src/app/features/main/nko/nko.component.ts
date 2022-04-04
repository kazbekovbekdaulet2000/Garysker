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

  constructor(
    private http: HttpClient,
    // private fileSaver: FileSaverService,
  ) { }

  downloadReport() {
    const url = `https://storage.yandexcloud.net/garysh-app/course/course_3/abdi`;
    const options: any = { responseType: 'blob' };
    this.http.get(url, options)
      .subscribe((res: any) => {
        // this.fileSaver.save(res.body, 'file');
      });
  }

  downloadNKO() {
    window.open('https://storage.yandexcloud.net/garysh-app/course/course_3/abdi', "_blank");

    // const url = `https://storage.yandexcloud.net/garysh-app/course/course_3/abdi`;
    // const options: any = { responseType: 'blob' };
    // this.http.get(url, options)
    //   .subscribe((res: any) => {
    //     this.fileSaver.save(res.body, 'file');
    //   });
  }
}

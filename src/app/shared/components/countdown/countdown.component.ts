import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {

  @Input() leftSeconds: any;
  @Input() template: TemplateRef<any>;

  leftDays: any;
  leftHours: any;
  leftMinutes: any;
  leftSec: any;

  countdownInterval: any;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    clearInterval(this.countdownInterval);
  }

  startCountdown(): void {
    this.drawLeftTime();
    this.countdownInterval = setInterval(this.drawLeftTime, 1000);
  }

  drawLeftTime = (): void => {
    const duration = moment.duration(this.leftSeconds, 'seconds');

    if (this.leftSeconds < 0) {
      this.leftSeconds = 0;
      clearInterval(this.countdownInterval);
    }

    this.leftDays = duration.days();
    this.leftHours = duration.hours();
    this.leftMinutes = duration.minutes();
    this.leftSec = duration.seconds();

    this.leftSeconds--;
  };
}

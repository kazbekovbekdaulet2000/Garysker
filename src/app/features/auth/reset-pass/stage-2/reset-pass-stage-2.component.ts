import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { IdentityService } from '@core/services/identity.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';

@Component({
  templateUrl: './reset-pass-stage-2.component.html',
  styleUrls: ['./reset-pass-stage-2.component.scss'],
  animations: [opacityAnimation, heightOutAnimation]
})
export class ResetPassStageTwoComponent {

  formGroup: FormGroup;

  timer$!: Observable<number>;

  constructor(
    private formBuilder: FormBuilder,
    private identityService: IdentityService,
    private router: Router,
    private bsService: BsModalService
  ) {
    this.formGroup = this.formBuilder.group({
      email: [null, Validators.required],
      code: [null],
      password: [null, Validators.minLength(8)],
      re_password: [null, Validators.minLength(8)],
    });
    this.getEmail();
    this.timer$.subscribe(time => {
      if (time === 0) {
        this.timer$ = of(0)
        const modal = this.bsService.show(ConfirmModalComponent, {
          initialState: {
            icon: "err_sticker_2",
            message: "auth.error.expire",
            false_ans: "auth.buttons.back",
            true_ans: "auth.buttons.force_reset",
          },
          class: 'modal-dialog-centered'
        })
        modal.content!.onClose.subscribe(result => {
          if (result === true) {
            this.forceReset()
            this.formGroup.patchValue({
              code: null,
              password: null,
              re_password: null,
            })
          } else {
            localStorage.removeItem('resetEmail')
            this.navigateBack()
          }
        });
      }
    })
  }

  setTimer(expiry: number, nowTime: number) {
    const time = Math.floor((expiry - nowTime) / 1000)
    this.startTimer(time);
  }

  startTimer(counter: number) {
    this.timer$ = timer(0, 1000).pipe(
      take(counter),
      map(_ => --counter)
    );
  }

  navigateBack() {
    this.router.navigate(['auth', 'reset'])
  }

  getEmail() {
    const itemStr = localStorage.getItem('resetEmail')
    if (!itemStr) {
      this.navigateBack()
      return
    }
    const now = (new Date()).getTime()
    const item = JSON.parse(itemStr)
    if (now > item.expiry) {
      localStorage.removeItem('resetEmail')
      return
    } else {
      this.setTimer(item.expiry, now)
      this.formGroup.patchValue({ email: item?.email })
    }
  }

  getRequireMessage(name: string) {
    return this.formGroup.controls[name].invalid &&
      (this.formGroup.controls[name].dirty || this.formGroup.controls[name].touched)
  }

  getFalseMessage(name: string) {
    return this.formGroup.controls[name].errors?.incorrect
  }

  reset() {
    const payload = this.formGroup.getRawValue()
    if (!this.formGroup.controls['password'].value) {
      this.formGroup.controls['re_password'].setErrors({ 'invalid': true })
      this.formGroup.controls['password'].setErrors({ 'invalid': true })
      return
    }
    if (this.formGroup.controls['password'].value !== this.formGroup.controls['re_password'].value) {
      this.formGroup.controls['re_password'].setErrors({ 'incorrect': true })
      return
    }
    if (this.formGroup.valid && this.formGroup.controls['code'].value) {
      this.identityService.resetConfirm(payload)
        .toPromise()
        .then(() => {
          this.bsService.show(MessageModalComponent, {
            initialState: {
              title: 'auth.reset.success.title',
              message: "auth.reset.success.message",
              icon: 'err_sticker_2'
            },
            class: 'modal-dialog-centered'
          })
          localStorage.removeItem('resetEmail')
          this.router.navigate(['/auth'])
        })
        .catch((err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.bsService.show(MessageModalComponent, {
              initialState: { message: 'auth.reset.errors.not_found.message' },
              class: 'modal-dialog-centered'
            })
          }
          if (err.status === 408) {
            this.identityService.reset(payload).toPromise()
            this.bsService.show(MessageModalComponent, {
              initialState: {
                title: 'auth.reset.errors.expired.title',
                message: "auth.reset.errors.expired.message"
              },
              class: 'modal-dialog-centered'
            })
          }
          if (err.status === 400) {
            this.bsService.show(MessageModalComponent, {
              initialState: {
                title: 'auth.reset.errors.bad_req.title',
                message: "auth.reset.errors.bad_req.title"
              },
              class: 'modal-dialog-centered'
            })
          }
        })
    } else {
      this.formGroup.get('email')?.setErrors({ 'incorrect': true })
      this.bsService.show(MessageModalComponent, {
        initialState: { message: "auth.reset.errors.empty.message" },
        class: 'modal-dialog-centered'
      })
    }
  }

  forceReset() {
    const payload = this.formGroup.getRawValue()
    this.identityService.resetForce(payload).toPromise()
      .then(res => {
        const now = (new Date()).getTime()
        const item = {
          email: payload.email, expiry: now + (Number(res.time) * 1000),
        }
        localStorage.setItem('resetEmail', JSON.stringify(item))
        this.startTimer(res.time);
      })
  }
}

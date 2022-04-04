import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { IdentityService } from '@core/services/identity.service';
import { Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';

@Component({
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss'],
  animations: [opacityAnimation, heightOutAnimation]
})
export class ResetPassComponent {

  formGroup: FormGroup;

  stage: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
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
    this.getEmail()
  }

  getEmail() {
    const itemStr = localStorage.getItem('resetEmail')
    if (!itemStr) {
      return
    }
    const now = new Date()
    const item = JSON.parse(itemStr)
    if (now.getTime() > item.expiry) {
      localStorage.removeItem('resetEmail')
      return
    } else {
      this.formGroup.patchValue({ email: item?.email })
      this.stage += 1
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
    if (this.stage === 0) {
      if (this.formGroup.valid) {
        this.identityService.reset(payload)
          .toPromise()
          .then(res => {
            const now = new Date()
            const item = {
              email: payload?.email,
              expiry: now.getTime() + (Number(res?.time) * 1000),
            }
            localStorage.setItem('resetEmail', JSON.stringify(item))
            this.stage += 1
          })
          .catch((err: HttpErrorResponse) => {
            if (err.status === 404) {
              this.bsService.show(MessageModalComponent, {
                initialState: { message: err.error?.detail },
                class: 'modal-dialog-centered'
              })
            }
          })
      } else {
        this.formGroup.get('email')?.setErrors({ 'incorrect': true })
        this.bsService.show(MessageModalComponent, {
          initialState: {
            title: 'Упс, ошибка!?',
            message: "Email пустой"
          },
          class: 'modal-dialog-centered'
        })
      }
    }
    if (this.stage === 1) {
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
          .then(res => {
            this.bsService.show(MessageModalComponent, {
              initialState: {
                title: 'УРА!!',
                message: "Ваш пароль был успешно изменен",
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
                initialState: { message: err.error?.detail },
                class: 'modal-dialog-centered'
              })
            }
            if (err.status === 408) {
              this.identityService.reset(payload).toPromise()
              this.bsService.show(MessageModalComponent, {
                initialState: {
                  title: 'УПССС!!',
                  message: "Прежнии код истек, мы отправили вам новый код на почту"
                },
                class: 'modal-dialog-centered'
              })
            }
            if (err.status === 400) {
              this.bsService.show(MessageModalComponent, {
                initialState: {
                  title: 'УПССС!!',
                  message: "Неправильный код"
                },
                class: 'modal-dialog-centered'
              })
            }
          })
      } else {
        this.formGroup.get('email')?.setErrors({ 'incorrect': true })
        this.bsService.show(MessageModalComponent, {
          initialState: { message: "Напишите код" },
          class: 'modal-dialog-centered'
        })
      }
    }
  }

  forceReset() {
    const payload = this.formGroup.getRawValue()
    this.identityService.resetForce(payload)
      .toPromise()
      .then(res => {
        const now = new Date()
        const item = {
          email: payload?.email,
          expiry: now.getTime() + (Number(res?.time) * 1000),
        }
        localStorage.setItem('resetEmail', JSON.stringify(item))
      })
  }
}

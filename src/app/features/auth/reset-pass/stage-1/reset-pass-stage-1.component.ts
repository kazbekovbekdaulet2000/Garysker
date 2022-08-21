import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { IdentityService } from '@core/services/identity.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';

@Component({
  templateUrl: './reset-pass-stage-1.component.html',
  styleUrls: ['./reset-pass-stage-1.component.scss'],
  animations: [opacityAnimation, heightOutAnimation]
})
export class ResetPassStageOneComponent {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private identityService: IdentityService,
    private bsService: BsModalService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      email: [null, Validators.required],
    });
  }

  getRequireMessage(name: string) {
    return this.formGroup.controls[name].invalid &&
      (this.formGroup.controls[name].dirty || this.formGroup.controls[name].touched)
  }

  reset() {
    const payload = this.formGroup.getRawValue()
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
          this.router.navigate(['auth', 'reset', 'code'])
        })
        .catch((err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.bsService.show(MessageModalComponent, {
              initialState: { message: 'auth.message.err.not_found' },
              class: 'modal-dialog-centered'
            })
          }
        })
    } else {
      this.formGroup.get('email')?.setErrors({ 'incorrect': true })
      this.bsService.show(MessageModalComponent, {
        initialState: {
          message: "auth.message.err.empty_email"
        },
        class: 'modal-dialog-centered'
      })
    }
  }
}

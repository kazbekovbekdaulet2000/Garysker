import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from '@core/services/identity.service';
import { Login, UpdateProfile } from '@core/states/auth/actions';
import { Store } from '@ngxs/store';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private identityService: IdentityService,
  ) {
    this.formGroup = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  getRequireMessage(name: string) {
    return this.formGroup.controls[name].invalid &&
      (this.formGroup.controls[name].dirty || this.formGroup.controls[name].touched)
  }

  getFalseMessage(name: string) {
    return this.formGroup.controls[name].errors?.incorrect
  }

  login() {
    this.identityService.login(this.formGroup.getRawValue())
      .toPromise()
      .then(token => {
        this.store.dispatch(new Login(token))
        window.history.back()
      })
      .catch(error => {
        this.formGroup.controls['email'].setErrors({ 'incorrect': true });
        this.formGroup.controls['email'].markAsUntouched()
        this.formGroup.controls['email'].markAsPristine()

        this.formGroup.controls['password'].setErrors({ 'incorrect': true });
        this.formGroup.controls['password'].markAsUntouched()
        this.formGroup.controls['password'].markAsPristine()

        this.getFalseMessage("email")
        this.getFalseMessage("password")
      })
    this.store.dispatch(new UpdateProfile())
  }
}

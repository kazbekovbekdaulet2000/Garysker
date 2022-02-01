import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentityService } from '@core/services/identity.service';
import { Login, UpdateProfile } from '@core/states/auth/actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private identityService: IdentityService,
    private router: Router
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
        this.router.navigate([''])
        this.store.dispatch(new UpdateProfile())
      })
      .catch(error => {
        console.log(error)
        this.formGroup.controls['email'].setErrors({ 'incorrect': true });
        console.log(this.formGroup.controls['email'].markAsUntouched())
        console.log(this.formGroup.controls['email'].markAsPristine())

        this.formGroup.controls['password'].setErrors({ 'incorrect': true });
        console.log(this.formGroup.controls['password'].markAsUntouched())
        console.log(this.formGroup.controls['password'].markAsPristine())

        this.getFalseMessage("email")
        this.getFalseMessage("password")
      })
  }
}

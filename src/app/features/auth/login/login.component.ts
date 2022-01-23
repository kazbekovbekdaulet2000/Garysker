import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '@core/states/auth/actions';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.formGroup = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  getRequireMessage(name: string) {
    return this.formGroup.controls[name].invalid && 
            (this.formGroup.controls[name].dirty || this.formGroup.controls[name].touched)
  }

  login(){
    this.store.dispatch(new Login(this.formGroup.getRawValue()))
    this.store.dispatch(new Navigate(['/edu']))
  }
}

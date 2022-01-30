import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formGroup: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      full_name: ['', Validators.required],
      birth_date: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', Validators.required],
      re_password: ['', Validators.required],
    });
  }

  getRequireMessage(name: string) {
    return this.formGroup.controls[name].invalid && 
            (this.formGroup.controls[name].dirty || this.formGroup.controls[name].touched)
  }

  onSave() {
    console.log(this.formGroup.getRawValue())
  }
}
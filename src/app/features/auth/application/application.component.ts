import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { opacityUpDownAnimation } from '@core/animations/opacity-up-down-animation';
import { IdentityService } from '@core/services/identity.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';
import { SignUpPageFour, SignUpPageOne, SignUpPageThree, SignUpPageTwo, StageModel } from './sign-up-sections';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  animations: [opacityUpDownAnimation, opacityAnimation]
})

export class ApplicationComponent {

  modalRef!: BsModalRef;

  stage_num: number = 0;

  tabChanged: boolean = true;

  stages: StageModel[] = [
    SignUpPageOne,
    SignUpPageTwo,
    SignUpPageThree,
    SignUpPageFour,
  ]

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let re_pass = group.get('re_password')!.value
    return pass === re_pass ? null : { notSame: true }
  }

  forms: FormGroup[] = [
    this.formBuilder.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      birth_date: [null, [Validators.minLength(10), Validators.required]],
    }),
    this.formBuilder.group({
      city: null,
      country: null,
      user_type: [null, Validators.required],
      edu_place: null,
    }),
    this.formBuilder.group({
    }),
    this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]],
      re_password: [null, [Validators.required, Validators.minLength(8)]]
    })
  ]

  constructor(
    private bsService: BsModalService,
    private identityService: IdentityService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  getNextId(id: number) {
    if (id === 3) {
      return 1
    }
    if (id - 1 >= 0) {
      return id - 1
    } else {
      return 0
    }
  }

  onSelect(stage_num: number) {
    if (stage_num === this.stage_num) {
      return
    }
    if (this.forms[this.getNextId(stage_num)].valid) {
      if (this.stage_num !== stage_num) {
        this.tabChanged = false
        this.stage_num = stage_num
        setTimeout(() => {
          this.tabChanged = true
        }, 500)
      }
    } else {
      this.bsService.show(MessageModalComponent, {
        initialState: { message: "app.err.empty" },
        class: 'modal-dialog-centered'
      })
    }
  }

  prevSection() {
    this.stage_num -= 1
  }

  nextSection(event: any) {
    if (this.forms[this.stage_num].valid) {
      this.tabChanged = false
      if (this.stage_num === this.stages.length - 1) {
        let payload = { password: '', re_password: '', birth_date: '' }
        this.forms.forEach(form => {
          payload = { ...payload, ...form.getRawValue() }
        })
        let date = payload.birth_date.split('/')
        payload.birth_date = date.reverse().join("-")
        this.identityService.signup(payload)
          .toPromise()
          .then(() => {
            this.bsService.show(MessageModalComponent, {
              initialState: { message: "auth.message.success.login", icon: 'sticker2' },
              class: 'modal-dialog-centered'
            })
            this.router.navigate(['/auth'])
          })
          .catch(err => {
            if (err.error?.email) {
              this.bsService.show(MessageModalComponent, {
                initialState: { message: "auth.message.err.email" },
                class: 'modal-dialog-centered'
              })
            }
            if (err.error?.birth_date) {
              this.bsService.show(MessageModalComponent, {
                initialState: { message: "auth.message.err.birth_date" },
                class: 'modal-dialog-centered'
              })
            }
          })

        return
      }

      this.stage_num++
      setTimeout(() => {
        this.tabChanged = true
      }, 500)
    }
  }
}

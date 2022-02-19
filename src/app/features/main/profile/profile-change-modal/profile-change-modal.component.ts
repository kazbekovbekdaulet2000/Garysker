import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from '@core/models/api/user.model';
import { PatchUser, UpdateAvatar } from '@core/states/auth/actions';
import { AuthState } from '@core/states/auth/auth.state';
import { Select, Store } from '@ngxs/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './profile-change-modal.component.html',
  styleUrls: ['./profile-change-modal.component.scss']
})
export class ProfileChangeModalComponent {

  @Select(AuthState.profile) profile$!: Observable<UserModel>;

  formGroup!: FormGroup;

  constructor(
    private bsModalRef: BsModalRef,
    private store: Store,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      name: [null],
      surname: [null],
      description: [null],
    })
    this.profile$.subscribe(data=>{
      this.formGroup.patchValue(data)
    })
  }

  onChangeAvatarInputFile(event: any) {
    if (event.target.files.length > 0) {
      this.store.dispatch(new UpdateAvatar(event.target.files[0]));
    }
  }

  updateUser(){
    console.log(this.formGroup.getRawValue())
    this.store.dispatch(new PatchUser(this.formGroup.getRawValue()));
  }

}

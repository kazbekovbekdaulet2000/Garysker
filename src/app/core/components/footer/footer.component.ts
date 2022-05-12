import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateLang } from '@core/states/app/app.actions';
import { Store } from '@ngxs/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'core-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private store: Store,
    private bsModalService: BsModalService,
    private router: Router
  ) { }

  navigateAbout(stage: number) {
    this.router.navigate(['/about'], { queryParams: { stage } })
  }

  changeLang() {
    const modal = this.bsModalService.show(ConfirmModalComponent, {
      initialState: {
        icon: "err_sticker_2",
        message: "app.change_lang",
        false_ans: "app.lang.kk",
        true_ans: "app.lang.ru",
      },
      class: 'modal-dialog-centered'
    })
    modal.content!.onClose.subscribe(res => {
      if (res === true) {
        this.store.dispatch(new UpdateLang('ru'))
      } else if (res === false) {
        this.store.dispatch(new UpdateLang('kk'))
      }
    })
  }
}

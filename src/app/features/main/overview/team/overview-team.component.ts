import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { SupportService } from '@core/services/support.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';

@Component({
  selector: 'app-overview-team',
  templateUrl: './overview-team.component.html',
  styleUrls: ['./overview-team.component.scss'],
  animations: [opacityAnimation]
})
export class ProjectOverviewTeamComponent {

  email: FormControl = new FormControl('', [Validators.email, Validators.required]);

  members: any = [
    { img: 'assets/images/birzhan.png', name: 'Биржан Шакарим', prop: 'about.people.one', border: false },
    { img: 'assets/images/abdi.png', name: 'Абди Ринат', prop: 'about.people.two', border: false },
    { img: 'assets/images/beks.jpg', name: 'Бекдаулет Казбеков', prop: 'about.people.three', border: true },
    { img: 'assets/images/lui.png', name: 'Луи (кот)', prop: 'about.people.four', border: false },
  ]

  constructor(
    private supportService: SupportService,
    private bsModalService: BsModalService
  ) { }

  onSubmit() {
    this.supportService.sendEmail({ email: this.email.value }).subscribe(() => {
      this.email.reset()
      this.bsModalService.show(MessageModalComponent, {
        initialState: {
          message: "app.about.success_save_message",
          icon: 'sticker2'
        },
        class: 'modal-dialog-centered'
      })
    })
  }
}
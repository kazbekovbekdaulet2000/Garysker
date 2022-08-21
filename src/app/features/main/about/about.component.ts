import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageModalComponent } from 'src/app/shared/modals/err-modal/err-modal.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [opacityAnimation]
})
export class AboutComponent {

  selectedSection: "us" | "partners" | "contacts" = "us"

  sections: any = [
    { fragment: 'us', name: 'about.sections.project' },
    { fragment: 'partners', name: 'about.sections.partners' },
    { fragment: 'contacts', name: 'about.sections.contacts' }
  ];

  routers: any = [
    { name: 'about.edu.heading', body: 'about.edu.text', route: '/edu' },
    { name: 'about.projects.heading', body: 'about.projects.text', route: '/projects' },
    { name: 'about.shop.heading', body: 'about.shop.text', route: '/shop' },
    { name: 'about.event.heading', body: 'about.event.text', route: '/events' },
  ]

  people: any = [
    { img: 'assets/images/birzhan.png', name: 'Birzhan Shakarim', prop: 'about.people.one', border: false },
    { img: 'assets/images/abdi.png', name: 'Abdi Rinat', prop: 'about.people.two', border: false },
    { img: 'assets/images/beks.jpg', name: 'Бекдаулет Казбеков', prop: 'about.people.three', border: true },
    { img: 'assets/images/lui.png', name: 'Луи (кот)', prop: 'about.people.four', border: false },
  ]

  contacts: any = [
    { text: 'about.contacts.phone', hint: 'tel:8-702-000-6369', prop: '8 702 000 6369' },
    { text: 'about.contacts.email', hint: 'mailto:info@garyshker.com', prop: 'info@garyshker.com' },
    { text: 'about.contacts.volunteer', hint: 'mailto:volunteer@garyshker.com', prop: 'volunteer@garyshker.com' },
    { text: 'about.contacts.place', hint: 'https://go.2gis.com/gygevb', prop: 'г. Алматы ул. Желтоксан 168A' },
  ]

  viewform = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdrH_kgGxyZfHfrZLwAbYSEDEPwSWYevwCvD7Tkyx8qswAsNQ/formResponse'

  formData = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private bsModalService: BsModalService
  ) {
    this.activatedRoute.fragment.subscribe((fragment: any) => {
      if (fragment) {
        this.selectedSection = fragment
      }
    })
  }

  changeFragment(fragment: string) {
    this.router.navigate(['/about'], { fragment })
  }

  save() {
    if (this.formData.valid) {
      const rawValue = this.formData.getRawValue();
      let body = new HttpParams();
      body = body.append('entry.475930224', rawValue.email);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
      this.http.post(this.viewform, body, httpOptions).subscribe(() => { }, (err) => { });

      this.formData.patchValue({ 'email': '' })

      this.bsModalService.show(MessageModalComponent, {
        initialState: {
          message: "app.about.success_save_message",
          icon: 'sticker2'
        },
        class: 'modal-dialog-centered'
      })
    } else {
      this.bsModalService.show(MessageModalComponent, {
        initialState: {
          message: "app.about.fail_save_message"
        },
        class: 'modal-dialog-centered'
      })
    }
  }
}

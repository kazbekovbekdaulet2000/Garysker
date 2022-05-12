import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { environment } from '@env';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SelectListConfig } from 'src/app/shared/components/input/selections/select.config';
import { IokaPaymentComponent } from 'src/app/shared/components/payment/payment.component';

@Component({
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  animations: [opacityAnimation, heightOutAnimation],
})


export class SupportComponent {

  amount: SelectListConfig[] = [
    {
      title: '1000 ₸',
      selected: true,
      id: 1000
    },
    {
      title: '3000 ₸',
      id: 3000
    },
    {
      title: '5000 ₸',
      id: 5000
    },
    {
      title: '10000 ₸',
      id: 10000
    },
    {
      title: '20000 ₸',
      id: 20000
    },
    {
      title: 'support.another_amount',
    }
  ]

  type: SelectListConfig[] = [
    {
      title: 'support.type.every_month',
      selected: true,
      id: 1
    },
    {
      title: 'support.type.one_time',
      id: 2
    },
  ]
  selfAmount = false
  
  formData = this.formBuilder.group({
    type: [2, Validators.required],
    amount: [1000, Validators.required],
    name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    rules: []
  });

  reqAmount: number = 1000 * 0.038

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  selectAmount(selection: SelectListConfig) {
    if (selection.id) {
      this.formData.patchValue({
        amount: selection.id
      })
      this.reqAmount = 0.038 * selection.id
    } else {
      this.selfAmount = true
    }
  }

  selectType(selection: SelectListConfig) {
    if (selection.id) {
      this.formData.patchValue({
        type: selection.id
      })
    }
  }

  rulesContr() {
    this.formData.patchValue({
      rules: this.formData.get('rules')?.value
    })
  }

  helpProject() {
    const payload = this.formData.getRawValue()
    if (payload.rules) {
      payload.amount = (Number(payload.amount) + Number((this.formData.get('amount')?.value || 1000) * 0.038)) * 100
    } else {
      payload.amount = (payload.amount) * 100
    }
    const url = `${environment.API}/payment/donation/`;
    const link = window.location.href
    this.http.post(url, { amount: payload.amount, back_url: link }).subscribe((data: any) => {
      window.open(data.order.checkout_url)
    })
  }
}

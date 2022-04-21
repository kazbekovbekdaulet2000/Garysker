import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { environment } from '@env';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SelectListConfig } from 'src/app/shared/components/input/selections/select.config';
import { IokaPaymentComponent } from 'src/app/shared/components/payment/payment.component';

@Component({
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  animations: [opacityAnimation]
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

  formData = this.formBuilder.group({
    type: [1, Validators.required],
    amount: [1000, Validators.required],
    name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    rules: [false]
  });

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  selectAmount(selection: SelectListConfig) {
    if (selection.id) {
      this.formData.patchValue({
        amount: selection.id
      })
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
    console.log(this.formData.getRawValue())
    // this.http.post('https://stage-api.ioka.kz/v2/orders', {
    //   "amount": 240000,
    //   "capture_method": "AUTO",
    //   "success_url": 'https://garyshker-dev.web.app',
    //   "failure_url": 'https://garyshker-dev.web.app',
    // }, {
    //   headers: {
    //     'API-KEY': `${environment.iokaAccess}`
    //   }
    // }).subscribe((data: any) => {
    //   window.open(data.order.checkout_url);
    //   this.bsModalService.show(IokaPaymentComponent, {
    //     initialState: {
    //       orderId: data.order.id
    //     }
    //   })
    // })
  }
}

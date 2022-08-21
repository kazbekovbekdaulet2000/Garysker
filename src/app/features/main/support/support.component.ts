import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { heightOutAnimation } from '@core/animations/height-out-animation';
import { opacityAnimation } from '@core/animations/opacity-animation';
import { DonationService } from '@core/services/donation.service';
import { environment } from '@env';
import { SelectListConfig } from 'src/app/shared/components/input/selections/select.config';

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
    amount: [1000, Validators.required],
    full_name: [null, Validators.required],
    donation: [4],
    email: [null, [Validators.required, Validators.email]],
    rules: [false, Validators.required]
  });

  reqAmount: number = 1000 / 0.982

  constructor(
    private formBuilder: FormBuilder,
    private donationService: DonationService
  ) { }

  get getAmount(): number {
    return parseFloat(this._amount.toFixed(0))
  }

  get _amount(): number {
    return this.formData.get('amount')?.value / 0.982 - this.formData.get('amount')?.value
  }

  selectAmount(selection: SelectListConfig) {
    if (selection.id) {
      this.formData.patchValue({
        amount: selection.id
      })
      this.reqAmount = selection.id / 0.982
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
      payload.amount = Number((this.formData.get('amount')?.value || 1000) / 0.982).toFixed(0)
    } 
    this.donationService.fetch(payload).subscribe(data=>{
      window.open(data.ioka_answer.order.checkout_url)
    })
  }
}

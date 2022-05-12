import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '@env';
declare let IokaWidget: any;
// const zoid = require('zoid');

@Component({
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class IokaPaymentComponent implements AfterViewInit, OnDestroy {

  id!: number
  orderId: string = '';
  IokaWidgetItem: any

  constructor() { }

  ngAfterViewInit(): void {
    this.IokaWidgetItem = new IokaWidget({
      orderId: this.orderId,
      orderAccessToken: '',
      isSaveCard: false,
      elementId: "ioka-widget",
      options: {
        onError: (err: any) => {
          this.onError(err);
        },
        onSuccess: (res: any) => {
          this.onSuccess(res);
        },
        widgetProps: {
          cardForm: {
            hideEmail: true,
            hideResultMessage: true,
            buttonText: "Пополнить - ",
            title: "Пополнить счёт garyshker.com",
            cardNumberLabel: "",
            expireMonthLabel: "",
            expireYearLabel: "",
            cvcLabel: "",
            cardHolderLabel: "",
          },
          styles: {
            cardFormContainer: {
              backgroundColor: "#ffffff00"
            },
            inputContainer: {
              border: "1px solid #CBCBCC",
              borderRadius: "4px",
              height: "32px",
            },
            inputs: {
              padding: "8px",
              height: "100%",
            },
            submitButton: {
              height: "32px",
              borderRadius: "4px",
            },
            buttonTextStyle: {
              fontSize: "14px",
            },
            middleContainer: {
              margin: "0",
            },
            brandImage: {
              top: "-4px",
            },
          },
        },

      },
    });

    this.IokaWidgetItem.initPayment();
  }

  ngOnDestroy(): void {
    window.location.reload()
  }

  payFunction() {
    this.IokaWidgetItem.initPayment();
  }

  onError = (err: any) => {
    console.log("on error", err);
  };

  onSuccess = (err: any) => {
    console.log("on success", err);
  };
}

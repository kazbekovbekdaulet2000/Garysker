import { Component, OnDestroy, OnInit } from '@angular/core';
declare let IokaWidget: any;

@Component({
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class IokaPaymentComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    this.IokaWidgetItem.initPayment();
  }

  ngOnDestroy(): void {
    console.log(this.IokaWidgetItem)
  }

  IokaWidgetItem = new IokaWidget({
    orderId: "ord_tFeXcNiJ40",
    orderAccessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE3NjcyNjIyNzIsImlhdCI6MTY0NjgyNzExNywiYXpwIjoiZGFzaGJvYXJkIiwiaXNzIjoiZ2FybWl1cyIsInN1YiI6InVzcl9hNDNhMmU3NC0zYWUzLTRmOGMtYTk2Ni03NjA2NTNkOGFjODQiLCJhdWQiOlsic3BsaXQiLCJpZGVudGl0eSIsInRva2VuaXplciIsImN1c3RvbWVyIiwicGF5b3V0cyIsIndhbGxldCIsImNvcmUiXSwicmVzb3VyY2VfYWNjZXNzIjp7InNwbGl0Ijp7InJvbGVzIjpbInNwbGl0czpyZWFkIiwic3BsaXRzOndyaXRlIiwic3BsaXRzOnJlbW92ZSIsInNwbGl0cy5ldmVudHM6cmVhZCIsInNwbGl0cy53ZWJob29rczp3cml0ZSIsInNwbGl0cy53ZWJob29rczpyZWFkIiwic3BsaXRzLndlYmhvb2tzOnJlbW92ZSJdfSwiaWRlbnRpdHkiOnsicm9sZXMiOlsiaWRlbnRpdGllcy5jbGFzc2VzOnJlYWQiLCJpZGVudGl0aWVzLmNsYXNzZXM6d3JpdGUiLCJpZGVudGl0aWVzLmNsYXNzZXM6cmVtb3ZlIiwiaWRlbnRpdGllczpyZWFkIiwiaWRlbnRpdGllczp3cml0ZSIsImlkZW50aXRpZXM6cmVtb3ZlIl19LCJ0b2tlbml6ZXIiOnsicm9sZXMiOlsicGF5bWVudC1tZXRob2RzOndyaXRlIl19LCJjdXN0b21lciI6eyJyb2xlcyI6WyJjdXN0b21lcnM6d3JpdGUiLCJjdXN0b21lcnM6cmVhZCIsImN1c3RvbWVycy4qLmNhcmRzOndyaXRlIiwiY3VzdG9tZXJzLiouY2FyZHM6cmVhZCJdfSwicGF5b3V0cyI6eyJyb2xlcyI6WyJwYXlvdXQtb3JkZXJzOndyaXRlIiwicGF5b3V0LW9yZGVyczpyZWFkIiwicmVjZWl2ZXJzOnJlYWQiLCJyZWNlaXZlcnM6d3JpdGUiLCJwYXlvdXQtd2ViaG9va3M6d3JpdGUiLCJwYXlvdXQtd2ViaG9va3M6cmVhZCJdfSwid2FsbGV0Ijp7InJvbGVzIjpbIndhbGxldHM6cmVhZCIsIndhbGxldHM6d3JpdGUiLCJ3YWxsZXRzOnJlbW92ZSIsIndhbGxldHMuYWNjb3VudDpyZWFkIiwid2FsbGV0cy5ldmVudHM6cmVhZCIsIndhbGxldHMudHJhbnNhY3Rpb25zOnJlYWQiLCJ3YWxsZXRzLnRyYW5zYWN0aW9uczp3cml0ZSIsIndhbGxldHMudHJhbnNhY3Rpb25zOnJlbW92ZSIsIndhbGxldHMudzJ3OndyaXRlIiwid2FsbGV0cy53Mnc6cmVhZCIsIndhbGxldHMud2ViaG9va3M6d3JpdGUiLCJ3YWxsZXRzLndlYmhvb2tzOnJlYWQiLCJ3YWxsZXRzLndlYmhvb2tzOnJlbW92ZSIsIndpdGhkcmF3YWxzOnJlYWQiLCJ3aXRoZHJhd2Fsczp3cml0ZSIsIndpdGhkcmF3YWxzOnJlbW92ZSJdfSwiY29yZSI6eyJyb2xlcyI6WyJvcmRlcnM6d3JpdGUiLCJvcmRlcnM6cmVhZCIsIm9yZGVycy4qLnBheW1lbnRzOndyaXRlIiwib3JkZXJzLioucGF5bWVudHM6cmVhZCIsIm9yZGVycy4qLnBheW1lbnRzLioucmVmdW5kczp3cml0ZSIsIm9yZGVycy4qLnBheW1lbnRzLioucmVmdW5kczpyZWFkIiwid2ViaG9va3M6d3JpdGUiLCJ3ZWJob29rczpyZWFkIiwic3Vic2NyaXB0aW9uczp3cml0ZSIsInN1YnNjcmlwdGlvbnM6cmVhZCIsInN1YnNjcmlwdGlvbnMuKi5vcmRlcnMuKi5wYXltZW50czp3cml0ZSIsInN1YnNjcmlwdGlvbnMuKi5vcmRlcnMuKi5wYXltZW50czpyZWFkIl19fSwidXNlciI6eyJpZCI6InVzcl9hNDNhMmU3NC0zYWUzLTRmOGMtYTk2Ni03NjA2NTNkOGFjODQiLCJkaXNwbGF5X25hbWUiOiJBaWt1bWlzIEthbGkiLCJ1c2VybmFtZSI6ImEua2FsaUBpb2thLmt6IiwiZmlyc3RfbmFtZSI6IkFpa3VtaXMiLCJsYXN0X25hbWUiOiJLYWxpIiwiZW1haWwiOiJhLmthbGlAaW9rYS5reiIsInN0YXR1cyI6IkFDVElWRSJ9LCJzaG9wIjp7ImlkIjoic2hwX0NHVDlURUEyTU0iLCJvd25lcl9pZCI6InVzcl9hNDNhMmU3NC0zYWUzLTRmOGMtYTk2Ni03NjA2NTNkOGFjODQiLCJiaW4iOiIxMzEzMTMiLCJkaXNwbGF5X25hbWUiOiJzdGFnZS1nYXJ5c2hrZXIiLCJzdGF0dXMiOiJBQ0NFUFRFRCJ9LCJsb2NhbGUiOiJydSJ9.PpC5P3SPjFwBOWRemf47s1KBQj-Rm2ZWx1DTwZnJTqzUlhp0PHpPghqXyPU421fi3P-12gz9pxKWRjzeLcYEzZ6L9WBe52SNzpZ1Ju12_GBzguwdXNxUfNo0718cmfTaPzbr-ajbGd7VLcnWRsZb9miP9WMTfEHfCIb4v4Pv1wjxdwpIcr6Znak2C_Rflp7fSqWhmWjK9DX9XQwQN2Pc0qcQhfwnPf3eRORTrTbR_tTdrOa1v0IZRXVsQ0NjIWy8Bs5ZRyhqXtNJyqhXhbp8ALMmTjkhdu0L6wrhcKjKrugNoQSmq-OB8ThoabeDBB8PcCLH1eBxGDuafjwvTSSGpw",
    isSaveCard: false,
    elementId: "ioka-widget",
    options: {
      onError: (err:any) => {
        this.onError(err);
      },
      onSuccess: (res:any) => {
        this.onSuccess(res);
        // this.close();
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

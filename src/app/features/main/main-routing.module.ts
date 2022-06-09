import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IokaPaymentComponent } from 'src/app/shared/components/payment/payment.component';
import { AboutComponent } from './about/about.component';

import { MainComponent } from './main.component';
import { NKOComponent } from './nko/nko.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from "./profile/ProfileComponent";
import { QuestionsComponent } from './questions/questions.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'edu'
      },
      {
        path: 'edu',
        loadChildren: () => import('./edu/edu.module').then(m => m.EduModule)
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'nko',
        component: NKOComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'shop',
        // component: ProductsComponent
        loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: 'events',
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'support',
        component: SupportComponent
      },
      {
        path: 'questions',
        component: QuestionsComponent
      },
      {
        path: 'payment',
        component: IokaPaymentComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}

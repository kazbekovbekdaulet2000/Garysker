import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DobroAboutComponent } from './dobro/about/dobro-about.component';
import { DobroComponent } from './dobro/dobro.component';
import { EduComponent } from './edu/edu.component';
import { ReportModuleModule } from './edu/report-module/report-module.module';
import { VideoModuleModule } from './edu/video-module/video-module.module';
import { EventsComponent } from './events/events.component';

import { MainComponent } from './main.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionsComponent } from './questions/questions.component';
import { ShopComponent } from './shop/shop.component';
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
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'edu',
        component: EduComponent
      },
      {
        path: 'edu/:id',
        component: EduComponent
      },
      {
        path: 'edu/reports/:id',
        loadChildren: () => ReportModuleModule,
      },
      {
        path: 'edu/videos/:id',
        loadChildren: () => VideoModuleModule,
      },
      {
        path: 'questions',
        component: QuestionsComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'shop',
        component: ShopComponent
      },
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'support',
        component: SupportComponent
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

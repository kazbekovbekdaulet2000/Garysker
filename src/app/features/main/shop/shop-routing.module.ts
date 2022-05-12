import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopOrganizationRequestComponent } from './list/organization-request/organization-request.component';
import { ShopProductComponent } from './list/own-product-list/product-list.component';
import { ShopComponent } from './list/shop-list.component';


const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        component: ShopProductComponent
      },
      {
        path: 'organization',
        component: ShopOrganizationRequestComponent
      },
      {
        path: 'delivery',
        component: ShopOrganizationRequestComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}

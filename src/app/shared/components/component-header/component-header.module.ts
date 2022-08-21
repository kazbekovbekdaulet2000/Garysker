import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentHeaderComponent } from "./component-header.component";

@NgModule({
  declarations: [
    ComponentHeaderComponent
  ],
  exports: [
    ComponentHeaderComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ],
})
export class ComponentHeaderModule {
}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SectionHeaderComponent } from "./section-header.component";

@NgModule({
  declarations: [
    SectionHeaderComponent
  ],
  exports: [
    SectionHeaderComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ],
})
export class SectionHeaderModule {
}

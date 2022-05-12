import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { NgxsModule } from '@ngxs/store';
import { DatePipeModule } from 'src/app/shared/pipes/date/date-pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EventsRoutingModule } from './events-routing.module';
import { EventListComponent } from './list/events-list.component';
import { EventsState } from './events.state';
import { BackgroundImageModule } from 'src/app/shared/directives/background-image.module';
import { LangPipeModule } from 'src/app/shared/pipes/lang/lang-pipe.module';
import { EventDetailModalComponent } from './list/detail/detail-modal.component';
import { EventDetailFormModalComponent } from './list/detail/form/detail-modal-form.component';
import { InputModule } from 'src/app/shared/components/input/input.module';
import { ComponentHeaderModule } from 'src/app/shared/components/component-header/component-header.module';

@NgModule({
  declarations: [
    EventListComponent,
    EventDetailModalComponent,
    EventDetailFormModalComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    NgxsModule.forFeature([EventsState]),
    DatePipeModule,
    TranslateModule,
    ComponentHeaderModule,
    InputModule,
    LangPipeModule,
    BackgroundImageModule
  ]
})
export class EventsModule {
}

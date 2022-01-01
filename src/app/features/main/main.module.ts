import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SideMenuComponent } from '@core/components/side-menu/side-menu.component';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { NgxsModule } from '@ngxs/store';
import { MainState } from './main.state';
import { EduComponent } from './edu/edu.component';
import { DatePipeModule } from 'src/app/shared/pipes/name/date-pipe.module';
import { DobroComponent } from './dobro/dobro.component';
import { DobroAboutComponent } from './dobro/about/dobro-about.component';

@NgModule({
  declarations: [
    MainComponent,
    EduComponent,
    DobroComponent,
    SideMenuComponent,
    DobroAboutComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CardModule,
    NgxsModule.forFeature([MainState]),
    DatePipeModule
  ],
})
export class MainModule {
}

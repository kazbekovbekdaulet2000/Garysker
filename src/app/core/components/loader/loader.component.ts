import {Component} from '@angular/core';
import { PushLoaderQueue } from '@core/states/loader/actions';
import { LoaderState } from '@core/states/loader/loader.state';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'core-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Select(LoaderState.queue) queue$!: Observable<string[]>;
}

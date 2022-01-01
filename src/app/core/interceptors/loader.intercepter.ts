import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import { PopLoaderQueue, PushLoaderQueue } from '@core/states/loader/actions';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private store: Store
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(new PushLoaderQueue(req.url));

    return next.handle(req)
      .pipe(
        finalize(() => {
          this.store.dispatch(new PopLoaderQueue(req.url));
        })
      );
  }
}

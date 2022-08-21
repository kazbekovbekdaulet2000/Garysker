import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment, UrlTree } from "@angular/router";
import { environment } from "@env";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DevEnvGuard implements CanLoad {
  constructor() { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return !environment.production
  }
}
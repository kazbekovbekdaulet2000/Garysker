import { Injectable } from '@angular/core';
import { JSONSchema, StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private storage: StorageMap) { }

  getItem(key: string): Observable<any> {
    return this.storage.get(key)
  }

  watchGenericItem(key: string, schema: JSONSchema): Observable<any> {
    return this.storage.watch<any>(key, schema)
  }

  watchItem(key: string): Observable<any> {
    return this.storage.watch(key)
  }

  setItem(key: string, value: any): Observable<undefined> {
    return this.storage.set(key, value)
  }

  removeItem(key: string): Observable<undefined> {
    return this.storage.delete(key)
  }

  clear(): Observable<undefined> {
    return this.storage.clear()
  }
}
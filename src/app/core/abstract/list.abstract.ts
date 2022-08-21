import { Component, OnDestroy, OnInit } from '@angular/core';
import { emptyListResponse, ListResponseModel } from '@core/models/api/list.model';
import { Observable, Subscription } from 'rxjs';

@Component({ template: '' })
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class ListAbstract<T> implements OnDestroy, OnInit {
  list: ListResponseModel<T> = emptyListResponse;
  page: number = 1;
  page_size: number = 10;
  loaded: boolean = false;
  category_sub: Subscription;
  list_sub: Subscription;

  constructor() {}
  
  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.list = emptyListResponse;
    this.category_sub.unsubscribe();
    if(this.list_sub){
      this.list_sub.unsubscribe();
    }
  }

  init(){
    this.category_sub = this.listAction.subscribe(list=>{
      this.list = list
    })
  }

  onScroll(event: boolean) {
    if (!!this.list.next && event) {
      this.page++
      this.list_sub =this.listAction.subscribe(list=>{
        this.list = {...list, results: [...this.list.results, ...list.results]}
      })
    }
  }

  get params(): Object {
    return { page: this.page, page_size: this.page_size, ...this.additionalParams }
  }

  get additionalParams(): Object {
    return {}
  }

  abstract get listAction(): Observable<ListResponseModel<T>>
}
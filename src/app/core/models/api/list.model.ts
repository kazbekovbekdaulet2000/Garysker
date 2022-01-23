export interface ListResponseModel<T> {
  count: number,
  next: string,
  previous: string,
  results: Array<T>,
}

export const emptyListResponse = {
  count: 0,
  next: '',
  previous: '',
  results: [],
};
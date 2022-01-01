export class PushLoaderQueue {
  static readonly type = '[Loader] PushLoaderQueue';

  constructor(public event: string) {
  }
}

export class PopLoaderQueue {
  static readonly type = '[Loader] PopLoaderQueue';

  constructor(public event: string) {
  }
}

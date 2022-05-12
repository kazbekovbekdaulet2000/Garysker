export class UpdateTop {
  static readonly type = '[Scroll] UpdateTop';
  constructor(public top: number) {
  }
}


export class UpdateHorizontal {
  static readonly type = '[Scroll] UpdateHorizontal';
  constructor(public horizontal: number) {
  }
}
export class GetBackStorageUUID {
  static readonly type = '[Shop] GetBackStorageUUID';
}

export class GetUserBagProductList {
  static readonly type = '[Shop] GetUserBagProductList';
  constructor(public uuid: string){}
}

export class ClearUserBagProductList {
  static readonly type = '[Shop] ClearUserBagProductList';
}
export class GetBackStorageUUID {
  static readonly type = '[Shop] GetBackStorageUUID';
}

export class GetUserBagProductList {
  static readonly type = '[Shop] GetUserBagProductList';
  constructor(public uuid: string){}
}

export class GetUserBagProduct {
  static readonly type = '[Shop] GetUserBagProduct';
  constructor(public uuid: string, public id: number){}
}

export class AddUserBagProduct {
  static readonly type = '[Shop] AddUserBagProduct';
  constructor(public uuid: string, public body: any){}
}

export class PatchUserBagProduct {
  static readonly type = '[Shop] PatchUserBagProduct';
  constructor(public uuid: string, public id: number, public body: any){}
}

export class DeleteUserBagProduct {
  static readonly type = '[Shop] DeleteUserBagProduct';
  constructor(public uuid: string, public id: number){}
}

export class CreateOrder {
  static readonly type = '[Shop] CreateOrder';
  constructor(public body: any){}
}

export class ClearUserBagProductList {
  static readonly type = '[Shop] ClearUserBagProductList';
}
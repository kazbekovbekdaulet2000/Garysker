import { TokenModel } from "../../models/api/token.model";

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public payload: any) {
  }
}

export class UpdateToken {
  static readonly type = '[Auth] UpdateToken';
  constructor(public access: string){}
}

export class RemoveToken {
  static readonly type = '[Auth] RemoveToken';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

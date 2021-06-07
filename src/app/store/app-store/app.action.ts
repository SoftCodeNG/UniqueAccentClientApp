
export class SetHeaderVisibility {
  static readonly type = '[App] SetHeaderVisibility';
  constructor(public headerVisibility: string) {}
}

export class SetToken {
  static readonly type = '[App] SetToken';
  constructor(public token: string) {}
}

export class SetRefreshToken {
  static readonly type = '[App] SetRefreshToken';
  constructor(public refreshToken: string) {}
}

export class SetDecodedToken {
  static readonly type = '[App] SetDecodedToken';
  constructor(public decodedToken: any) {}
}

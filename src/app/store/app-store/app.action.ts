
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

export class SetUserProfile {
  static readonly type = '[App] SetUserProfile';
  constructor(public userProfile: any) {}
}

export class SetUserCourses {
  static readonly type = '[App] SetUserCourses';
  constructor(public userCourses: any) {}
}

export class SetCourseList {
  static readonly type = '[App] SetCourseList';
  constructor(public courseList: any) {}
}

export class SetItemView {
  static readonly type = '[App] SetItemView';
  constructor(public itemView: string) {}
}

export class SetIsNetworkRequestOngoing {
  static readonly type = '[App] SetIsNetworkRequestOngoing';
  constructor(public isNetworkRequestOngoing: boolean) {}
}

export class SetReturningURL {
  static readonly type = '[App] SetReturningURL';
  constructor(public returningURL: string) {}
}

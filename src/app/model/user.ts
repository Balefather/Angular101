export class User {
  constructor(
    public userID: number,
    public username: string,
    public password: string,
    public firstName: string,
    public lastName: string
  ) {  }
}

export class Role {
  constructor(
    public roleID: number,
    public roleName: string,
  ) {  }
}



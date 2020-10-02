export interface IUser {
  _id: string;
  loginId: string;
  displayName: string;
  password: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}

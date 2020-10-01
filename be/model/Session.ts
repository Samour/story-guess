export interface ISession {
  _id: string;
  userId: string;
  sessionSecret: string;
  sessionExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum SessionRemovedReason {
  LOGOUT = 'LOGOUT',
  FORCE_EXPIRY = 'FORCE_EXPIRY',
}

export interface ISessionRemoved {
  reason: SessionRemovedReason;
  removedBy: string;
  removedAt: Date;
}

export interface ISession {
  _id: string;
  userId: string;
  sessionSecret: string;
  sessionExpiry: Date;
  removed?: ISessionRemoved;
  createdAt: Date;
  updatedAt: Date;
}

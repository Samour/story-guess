import { Request } from 'express';
import { UserToken } from './UserToken';

export interface AuthenticatedRequest extends Request {
  user: UserToken;
}

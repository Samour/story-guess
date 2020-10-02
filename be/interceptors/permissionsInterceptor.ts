import { RequestHandler } from 'express';
import { AuthenticatedRequest } from '../domain/AuthenticatedRequest';
import AuthorizationError from '../exceptions/AuthorizationError';

export default (permission: string): RequestHandler => {
  return (req: AuthenticatedRequest, res, next) => {
    if (!req.user.permissions.includes(permission)) {
      next(new AuthorizationError());
    } else {
      next();
    }
  };
};

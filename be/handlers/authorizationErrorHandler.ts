import { Request, Response, NextFunction } from 'express';
import { ApiErrorCode, ApiErrorDto } from '../../ts-shared/dtos/error';
import AuthorizationError from '../exceptions/AuthorizationError';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AuthorizationError) {
    const response: ApiErrorDto = {
      errorCode: ApiErrorCode.ERR1002,
    };
    res.status(403);
    res.send(response);
  } else {
    next(err);
  }
}

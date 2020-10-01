import { Request, Response, NextFunction } from 'express';
import { ApiErrorCode, ApiErrorDto } from '../../ts-shared/dtos/error';
import AuthenticationError from '../exceptions/AuthenticationError';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AuthenticationError) {
    console.group();
    console.warn('Authentication error occurred');
    console.warn(err);
    console.groupEnd();

    const response: ApiErrorDto = {
      errorCode: ApiErrorCode.ERR1001,
    };
    res.status(401);
    res.send(response);
  } else {
    next(err);
  }
}

import { Request, Response, NextFunction } from 'express';
import { ApiErrorCode, ApiErrorDto } from '../../ts-shared/dtos/error';
import NotFoundError from '../exceptions/NotFoundError';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof NotFoundError) {
    const response: ApiErrorDto = {
      errorCode: ApiErrorCode.ERR1003,
    };
    res.status(404);
    res.send(response);
  } else {
    next(err);
  }
}

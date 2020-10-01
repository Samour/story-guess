import { Request, Response, NextFunction } from 'express';
import { ApiErrorCode, ApiErrorDto } from '../../ts-shared/dtos/error';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  console.group();
  console.error('Unhandled exception');
  console.error(err);
  console.groupEnd();

  const response: ApiErrorDto = {
    errorCode: ApiErrorCode.ERR1000,
    message: 'Unknown exception occurred',
  };
  res.status(500);
  res.send(response);
}

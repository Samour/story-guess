import { RequestHandler, Request, Response, NextFunction } from 'express';

export default <T>(handler: (req?: Request, res?: Response) => Promise<T>): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => handler(req, res).then((d) => res.send(d)).catch(next);

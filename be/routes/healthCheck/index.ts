import { Router } from 'express';
import { IConfig } from '../../config';
import routeBridge from '../../utils/routeBridge';

export default (config: IConfig): Router => {
  const router = Router();

  const handler = routeBridge(async () => ({
    appName: config.appName,
  }));

  router.get('/', handler)
    .get('/secure', handler);

  return router;
};

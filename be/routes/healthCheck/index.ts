import { Router } from 'express';
import { IConfig } from '../../config';
import routeBridge from '../../utils/routeBridge';

export default (config: IConfig): Router => {
  const router = Router();

  router.get('/', routeBridge(async () => ({
    appName: config.appName,
  })));

  return router;
};

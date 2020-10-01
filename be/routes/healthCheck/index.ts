import { Router } from 'express';
import routeBridge from '../../utils/routeBridge';

export default (): Router => {
  const router = Router();

  router.get('/', routeBridge(async () => ({
    appName: 'story-guess-be',
  })));

  return router;
};

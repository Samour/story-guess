import { Router } from 'express';
import { ISessionService } from '../../services/SessionService';
import routeBridge from '../../utils/routeBridge'

export default (sessionService: ISessionService): Router => {
  const router = Router();

  router.post('/', routeBridge(async (req) => sessionService.createSession(req.body)));

  router.post('/refresh', routeBridge(async (req) => sessionService.fetchToken(req.body)));

  return router;
};

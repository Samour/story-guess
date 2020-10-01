import { Router } from 'express';
import { AuthenticatedRequest } from '../../domain/AuthenticatedRequest';
import { ISessionService } from '../../services/SessionService';
import routeBridge from '../../utils/routeBridge'

export default (sessionService: ISessionService): Router => {
  const router = Router();

  router.post('/', routeBridge(async (req) => sessionService.createSession(req.body)))
    .post('/refresh', routeBridge(async (req) => sessionService.fetchToken(req.body)))
    .post('/logout', routeBridge(async (req: AuthenticatedRequest) => sessionService.logout(req.user.sessionId)));

  return router;
};

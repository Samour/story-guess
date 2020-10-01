import { Router } from 'express';
import { IUserService } from '../../services/UserService';
import routeBridge from '../../utils/routeBridge';

export default (userService: IUserService): Router => {
  const router = Router();

  router.post('/', routeBridge((req) => userService.registerUser(req.body)));

  return router;
};

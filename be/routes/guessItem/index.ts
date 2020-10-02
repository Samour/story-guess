import { Router } from 'express'
import { IGuessItemService } from '../../services/GuessItemService';
import routeBridge from '../../utils/routeBridge';
import permission from '../../interceptors/permissionsInterceptor';

export default (guessItemService: IGuessItemService): Router => {
  const router = Router();

  router.post('/', permission('createGuessItem'), routeBridge(async (req) =>
    guessItemService.createGuessItem(req.body)
  )).put('/:itemId', permission('updateGuessItem'), routeBridge(async (req) =>
    guessItemService.updateGuessItem(req.params.itemId, req.body)
  )).delete('/:itemId', permission('deleteGuessItem'), routeBridge(async (req) =>
    guessItemService.deleteGuessItem(req.params.itemId)
  ));

  return router;
};

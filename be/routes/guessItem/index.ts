import { Router } from 'express'
import { IGuessItemService } from '../../services/GuessItemService';
import routeBridge from '../../utils/routeBridge';

export default (guessItemService: IGuessItemService): Router => {
  const router = Router();

  router.post('/', routeBridge(async (req) => guessItemService.createGuessItem(req.body)))
    .put('/:itemId', routeBridge(async (req) => guessItemService.updateGuessItem(req.params.itemId, req.body)))
    .delete('/:itemId', routeBridge(async (req) => guessItemService.deleteGuessItem(req.params.itemId)));

  return router;
};

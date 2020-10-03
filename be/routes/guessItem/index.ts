import { Router } from 'express'
import { IGuessItemService } from '../../services/GuessItemService';
import routeBridge from '../../utils/routeBridge';
import permission from '../../interceptors/permissionsInterceptor';
import { Category } from '../../../ts-shared/dtos/guess/GuessItem';

export default (guessItemService: IGuessItemService): Router => {
  const router = Router();

  router.get('/', permission('readGuessItemData'), routeBridge(async (req) =>
    guessItemService.loadGuessItems(
      req.query.category as Category,
      req.query.search as string,
      Number.parseInt(req.query.offset as string || '0'),
      Number.parseInt(req.query.limit as string || '100'),
    )
  )).post('/', permission('createGuessItem'), routeBridge(async (req) =>
    guessItemService.createGuessItem(req.body)
  )).get('/:itemId', permission('readGuessItemData'), routeBridge(async (req) =>
    guessItemService.getGuessItem(req.params.itemId)
  )).put('/:itemId', permission('updateGuessItem'), routeBridge(async (req) =>
    guessItemService.updateGuessItem(req.params.itemId, req.body)
  )).delete('/:itemId', permission('deleteGuessItem'), routeBridge(async (req) =>
    guessItemService.deleteGuessItem(req.params.itemId)
  ));

  return router;
};

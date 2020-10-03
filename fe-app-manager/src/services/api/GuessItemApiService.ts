import { GuessItemDto } from '../../../../ts-shared/dtos/guess/GuessItem';
import { PageResponse } from '../../../../ts-shared/dtos/page';
import { IApiService } from './ApiService';

export interface IGuessItemApiService {
  getItems(offset: number, limit: number): Promise<PageResponse<GuessItemDto>>;
}

export class GuessItemApiService implements IGuessItemApiService {

  constructor(private readonly apiService: IApiService) { }

  async getItems(offset: number, limit: number): Promise<PageResponse<GuessItemDto>> {
    const url = await this.apiService.buildUrl('/guessItem');
    url.searchParams.set('offset', `${offset}`);
    url.searchParams.set('limit', `${limit}`)

    return this.apiService.invoke(url.toString());
  }
}

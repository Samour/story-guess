import { Category, GuessItemDto } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import { PageResponse } from '@story-guess/ts-shared/dtos/page';
import { IApiService } from './ApiService';

interface IGuessItemFilterOptions {
  category?: Category;
  search?: string;
}

export interface IGuessItemApiService {
  getItems(offset: number, limit: number, filter?: IGuessItemFilterOptions): Promise<PageResponse<GuessItemDto>>;
}

export class GuessItemApiService implements IGuessItemApiService {

  constructor(private readonly apiService: IApiService) { }

  async getItems(offset: number, limit: number, filter: IGuessItemFilterOptions = {}): Promise<PageResponse<GuessItemDto>> {
    const url = await this.apiService.buildUrl('/guessItem');
    url.searchParams.set('offset', `${offset}`);
    url.searchParams.set('limit', `${limit}`)
    if (filter.category) {
      url.searchParams.set('category', filter.category);
    }
    if (filter.search) {
      url.searchParams.set('search', filter.search);
    }

    return this.apiService.invoke(url.toString());
  }
}

import { Category, GuessItemDto } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import { PageResponse } from '@story-guess/ts-shared/dtos/page';
import { IApiService } from './ApiService';

interface IGuessItemFilterOptions {
  category?: Category;
  search?: string;
}

export interface IGuessItemApiService {
  getItem(id: string): Promise<GuessItemDto>;
  getItems(offset: number, limit: number, filter?: IGuessItemFilterOptions): Promise<PageResponse<GuessItemDto>>;
  createItem(data: GuessItemDto): Promise<void>;
  updateItem(id: string, data: GuessItemDto): Promise<void>;
}

export class GuessItemApiService implements IGuessItemApiService {

  constructor(private readonly apiService: IApiService) { }

  async getItem(id: string): Promise<GuessItemDto> {
    const url = await this.apiService.buildUrl(`/guessItem/${id}`);
    return this.apiService.invoke(url.toString());
  }

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

  async createItem(data: GuessItemDto): Promise<void> {
    const url = await this.apiService.buildUrl('/guessItem');

    return this.apiService.invoke(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async updateItem(id: string, data: GuessItemDto): Promise<void> {
    const url = await this.apiService.buildUrl(`/guessItem/${id}`);

    return this.apiService.invoke(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}

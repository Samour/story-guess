import { v4 as uuid } from 'uuid';
import { Category, GuessItemDto } from '../../ts-shared/dtos/guess/GuessItem';
import { PageResponse } from '../../ts-shared/dtos/page';
import { IGuessItemConverter } from '../converters/GuessItemConverter';
import NotFoundError from '../exceptions/NotFoundError';
import { IGuessItem } from '../model/GuessItem';
import { IGuessItemRepository } from '../repositories/GuessItemRepository';

export interface IGuessItemService {
  loadGuessItems(category: Category | null, search: string | null, offset: number, limit: number): Promise<PageResponse<GuessItemDto>>;
  createGuessItem(data: GuessItemDto): Promise<GuessItemDto>;
  updateGuessItem(id: string, data: GuessItemDto): Promise<GuessItemDto>;
  deleteGuessItem(id: string): Promise<void>;
}

export class GuessItemService implements IGuessItemService {

  constructor(private readonly guessItemConverter: IGuessItemConverter,
    private readonly guessItemRepository: IGuessItemRepository) { }

  async loadGuessItems(category: Category | null, search: string | null, offset: number, limit: number): Promise<PageResponse<GuessItemDto>> {
    const [items, total] = await Promise.all([
      this.guessItemRepository.searchItems(category, search, offset, limit),
      this.guessItemRepository.countItems(category, search),
    ]);

    return {
      items: items.map((i) => this.guessItemConverter.entityToDto(i)),
      total,
      offset,
      limit,
    };
  }

  async createGuessItem(data: GuessItemDto): Promise<GuessItemDto> {
    const item: IGuessItem = {
      ...this.guessItemConverter.dtoToEntity(data),
      _id: uuid(),
    };
    if (!item.alternateNames.includes(item.title)) {
      item.alternateNames.push(item.title);
    }

    await this.guessItemRepository.save(item);

    return this.guessItemConverter.entityToDto(item);
  }

  async updateGuessItem(id: string, data: GuessItemDto): Promise<GuessItemDto> {
    const item: IGuessItem = await this.guessItemRepository.findById(id);
    if (!item) {
      throw new NotFoundError();
    }
    item.category = data.category;
    item.title = data.title;
    item.alternateNames = data.alternateNames;
    if (!item.alternateNames.includes(item.title)) {
      item.alternateNames.push(item.title);
    }
    item.hints = data.hints;

    await this.guessItemRepository.save(item);

    return this.guessItemConverter.entityToDto(item);
  }

  async deleteGuessItem(id: string): Promise<void> {
    await this.guessItemRepository.deleteById(id);
  }
}

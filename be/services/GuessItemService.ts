import { v4 as uuid } from 'uuid';
import { Category, GuessItemDto } from '../../ts-shared/dtos/guess/GuessItem';
import { PageResponse } from '../../ts-shared/dtos/page';
import { IGuessItemConverter } from '../converters/GuessItemConverter';
import NotFoundError from '../exceptions/NotFoundError';
import { IGuessItem } from '../model/GuessItem';
import { IGuessItemRepository } from '../repositories/GuessItemRepository';

export interface IGuessItemService {
  loadGuessItems(category: Category | null, search: string | null, offset: number, limit: number): Promise<PageResponse<GuessItemDto>>;
  getGuessItem(id: string): Promise<GuessItemDto>;
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

  async getGuessItem(id: string): Promise<GuessItemDto> {
    return this.guessItemConverter.entityToDto(await this.guessItemRepository.findById(id));
  }

  async createGuessItem(data: GuessItemDto): Promise<GuessItemDto> {
    const item: IGuessItem = {
      ...this.guessItemConverter.dtoToEntity(data),
      _id: uuid(),
    };
    this.normalizeAltNames(item);
    this.normaliseHints(item);

    await this.guessItemRepository.save(item);

    return this.guessItemConverter.entityToDto(item);
  }

  async updateGuessItem(id: string, data: GuessItemDto): Promise<GuessItemDto> {
    const item: IGuessItem = await this.guessItemRepository.findById(id);
    if (!item) {
      throw new NotFoundError();
    }
    item.category = data.category;
    item.status = data.status;
    item.title = data.title;
    item.alternateNames = data.alternateNames;
    this.normalizeAltNames(item);
    item.hints = data.hints;
    this.normaliseHints(item);

    await this.guessItemRepository.save(item);

    return this.guessItemConverter.entityToDto(item);
  }

  private normalizeAltNames(item: IGuessItem): void {
    if (!item.alternateNames.includes(item.title)) {
      item.alternateNames.push(item.title);
    }

    item.alternateNames = item.alternateNames.map((i) => i.trim())
      .filter((i) => i.length);
    item.alternateNames.sort();
  }

  private normaliseHints(item: IGuessItem): void {
    item.hints.forEach((h) => h.text = h.text.trim());
    item.hints = item.hints.filter(({ text }) => !!text.length);
    item.hints.filter(({ id }) => !id)
      .forEach((h) => h.id = uuid());
    item.hints.sort((a, b) => {
      const c1 = a.level - b.level;
      if (c1 !== 0) {
        return c1;
      } else if (a.text === b.text) {
        return 0;
      } else if (a.text < b.text) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  async deleteGuessItem(id: string): Promise<void> {
    await this.guessItemRepository.deleteById(id);
  }
}

import { GuessItemDto } from '../../ts-shared/dtos/guess/GuessItem';
import { IGuessItem } from '../model/GuessItem';

export interface IGuessItemConverter {
  dtoToEntity(dto: GuessItemDto): IGuessItem;
  entityToDto(entity: IGuessItem): GuessItemDto;
}

export class GuessItemConverter implements IGuessItemConverter {

  dtoToEntity(dto: GuessItemDto): IGuessItem {
    return {
      _id: dto.id,
      status: dto.status,
      category: dto.category,
      title: dto.title,
      alternateNames: dto.alternateNames,
      hints: dto.hints,
      createdAt: null,
      updatedAt: null,
    };
  }

  entityToDto(entity: IGuessItem): GuessItemDto {
    return {
      id: entity._id,
      status: entity.status,
      category: entity.category,
      title: entity.title,
      alternateNames: entity.alternateNames,
      hints: entity.hints,
    };
  }
}

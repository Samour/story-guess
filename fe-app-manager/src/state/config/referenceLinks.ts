import { Category } from '@story-guess/ts-shared/dtos/guess/GuessItem';

export interface IReferenceLinkProfileConfig {
  validCategories: Category[];
  searchLocation: string;
  imgSrc: string;
  alt: string;
}

export interface IReferenceLinksConfig {
  profiles: IReferenceLinkProfileConfig[];
}

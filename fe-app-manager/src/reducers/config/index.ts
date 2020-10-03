import { Category } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import { IEvent } from '../../events/IEvent';
import { IConfig } from '../../state/config';

const initialState: IConfig = {
  guessItemsTable: {
    colWidths: {
      answer: 500,
      category: 100,
    },
    pageSize: 25,
  },
  referenceLinks: {
    profiles: [
      {
        validCategories: [Category.BOOK, Category.MOVIE, Category.TV_SHOW],
        searchLocation: 'https://en.wikipedia.org/w/index.php?search=%s',
        imgSrc: '/img/3rdparty/wikipedia.svg',
        alt: 'Wikipedia',
      },
      {
        validCategories: [Category.BOOK],
        searchLocation: 'https://www.goodreads.com/search?query=%s',
        imgSrc: '/img/3rdparty/goodreads.png',
        alt: 'Goodreads',
      },
      {
        validCategories: [Category.MOVIE, Category.TV_SHOW],
        searchLocation: 'https://www.imdb.com/find?q=%s',
        imgSrc: '/img/3rdparty/imdb.png',
        alt: 'IMDb',
      },
      {
        validCategories: [Category.BOOK, Category.MOVIE, Category.TV_SHOW],
        searchLocation: 'https://www.google.com/search?q=%s',
        imgSrc: '/img/3rdparty/google.svg',
        alt: 'Google',
      },
    ],
  },
};

export default function (state: IConfig | undefined, event: IEvent): IConfig {
  return initialState;
}

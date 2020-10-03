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
};

export default function (state: IConfig | undefined, event: IEvent): IConfig {
  return initialState;
}

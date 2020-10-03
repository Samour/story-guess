import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Grid,
  FormGroup,
  FormLabel,
  Input,
  Hidden,
} from '@material-ui/core';
import { Category } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import Table from './Table';
import { IState } from '../../state';
import { guessItemsFilterCategoryEvent } from '../../events/GuessItemsFilterCategoryEvent';
import { guessItemsSearchEvent } from '../../events/GuessItemsSearchEvent';
import { getManager } from '../../services/manager';
import CategorySelect from '../shared/CategorySelect';

interface ICState {
  strings: {
    search: string;
  };
  filterCategory: Category | 'ALL';
  search: string;
}

const mapState = (state: IState): ICState => ({
  strings: {
    search: state.strings.guessItemsList.filter.search,
  },
  filterCategory: state.guessItemsList.category,
  search: state.guessItemsList.search,
});

interface IActions {
  setCategory: (category: Category | 'ALL') => void;
  setSearch: (search: string) => void;
}

const mapActions = (dispatch: Dispatch): IActions => ({
  setCategory: (category) => dispatch(guessItemsFilterCategoryEvent(category)),
  setSearch: (search) => dispatch(guessItemsSearchEvent(search)),
});

function GuessItemsList({ strings, filterCategory, search, setCategory, setSearch }: ICState & IActions): JSX.Element {
  const captureKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      getManager().getGuessItemsListService().initialise();
    }
  };

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <Grid container direction="row">
          <Grid item xs={12} md={9}>
            <FormGroup>
              <FormLabel>{strings.search}</FormLabel>
              <Input value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={captureKey} />
            </FormGroup>
          </Grid>
          <Hidden smDown>
            <Grid item md={1}></Grid>
          </Hidden>
          <Grid item xs={2}>
            <CategorySelect allOption value={filterCategory} onChange={setCategory} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row">
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default connect(mapState, mapActions)(GuessItemsList);

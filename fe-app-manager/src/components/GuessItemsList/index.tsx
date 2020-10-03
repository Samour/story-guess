import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Grid,
  FormGroup,
  FormLabel,
  Input,
  Hidden,
  Fab,
  makeStyles,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Category } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import Table from './Table';
import { IState } from '../../state';
import { guessItemsFilterCategoryEvent } from '../../events/GuessItemsFilterCategoryEvent';
import { guessItemsSearchEvent } from '../../events/GuessItemsSearchEvent';
import { getManager } from '../../services/manager';
import CategorySelect from '../shared/CategorySelect';
import { openNewGuessItemEvent } from '../../events/OpenNewGuessItemEvent';

const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    bottom: 50,
    right: 50,
  },
});

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
  openNewGuessItem: () => void;
}

const mapActions = (dispatch: Dispatch): IActions => ({
  setCategory: (category) => dispatch(guessItemsFilterCategoryEvent(category)),
  setSearch: (search) => dispatch(guessItemsSearchEvent(search)),
  openNewGuessItem: () => dispatch(openNewGuessItemEvent()),
});

function GuessItemsList({
  strings,
  filterCategory,
  search,
  setCategory,
  setSearch,
  openNewGuessItem,
}: ICState & IActions): JSX.Element {
  const classes = useStyles();

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
      <Fab className={classes.fab} color="primary" onClick={openNewGuessItem}>
        <Add />
      </Fab>
    </Grid>
  );
}

export default connect(mapState, mapActions)(GuessItemsList);

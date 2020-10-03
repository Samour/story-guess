import React from 'react';
import { Dispatch } from 'redux';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  FormGroup,
  FormLabel,
  Input,
  Hidden,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { Category } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import Table from './Table';
import { IState } from '../../state';
import { guessItemsFilterCategoryEvent } from '../../events/GuessItemsFilterCategoryEvent';
import { connect } from 'react-redux';
import { guessItemsSearchEvent } from '../../events/GuessItemsSearchEvent';
import { getManager } from '../../services/manager';

const useStyles = makeStyles(() => createStyles({
  select: {
    width: '100%',
  },
}));

interface ICState {
  filterCategory: Category | 'ALL';
  search: string;
}

const mapState = (state: IState): ICState => ({
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

function GuessItemsList({ filterCategory, search, setCategory, setSearch }: ICState & IActions): JSX.Element {
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
              <FormLabel>Search</FormLabel>
              <Input value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={captureKey} />
            </FormGroup>
          </Grid>
          <Hidden smDown>
            <Grid item md={1}></Grid>
          </Hidden>
          <Grid item xs={2}>
            <FormControl className={classes.select}>
              <InputLabel>Category</InputLabel>
              <Select value={filterCategory} onChange={(e) => setCategory(e.target.value as any)}>
                <MenuItem value={'ALL'}>All</MenuItem>
                <MenuItem value={Category.BOOK}>Books</MenuItem>
                <MenuItem value={Category.MOVIE}>Movies</MenuItem>
                <MenuItem value={Category.TV_SHOW}>TV Shows</MenuItem>
              </Select>
            </FormControl>
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

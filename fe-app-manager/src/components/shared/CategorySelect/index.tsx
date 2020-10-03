import React from 'react';
import { connect } from 'react-redux';
import { MenuItem, FormControl, InputLabel, Select, makeStyles } from '@material-ui/core';
import { Category } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import { IState } from '../../../state';

const useStyles = makeStyles({
  select: {
    width: '100%',
  },
});

interface IProps {
  allOption?: boolean;
  value: Category | 'ALL';
  onChange: (value: Category | 'ALL') => void;
}

interface ICState {
  strings: {
    category: string;
    categoryAll: string;
    categoryNames: Map<Category, string>;
  };
}

const mapState = (state: IState): ICState => ({
  strings: {
    category: state.strings.guessItemsList.filter.category,
    categoryAll: state.strings.categories.all,
    categoryNames: state.strings.categories.categories,
  },
});

function CategorySelect({ allOption, value, onChange, strings }: IProps & ICState): JSX.Element {
  const classes = useStyles();

  const AllOption = () => {
    if (!allOption) {
      return null;
    }
    return <MenuItem value={'ALL'}>{strings.categoryAll}</MenuItem>;
  }
  const categoryOptions = [
    Category.BOOK,
    Category.MOVIE,
    Category.TV_SHOW,
  ].map((c) => <MenuItem key={c} value={c}>{strings.categoryNames.get(c)}</MenuItem>);

  return (
    <FormControl className={classes.select}>
      <InputLabel>{strings.category}</InputLabel>
      <Select value={value} onChange={(e) => onChange(e.target.value as any)}>
        {AllOption()}
        {categoryOptions}
      </Select>
    </FormControl>
  );
}

export default connect(mapState)(CategorySelect);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  FormGroup,
  FormLabel,
  Hidden,
  Input,
  CircularProgress,
  TextField,
  Fab,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Category, GuessItemDto, GuessItemStatus } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import CategorySelect from '../shared/CategorySelect';
import { IState } from '../../state';
import { getManager } from '../../services/manager';
import HintsTable from './HintsTable';
import { Dispatch } from 'redux';
import { updateViewGuessItemTitleEvent } from '../../events/UpdateViewGuessItemTitleEvent';
import { updateViewGuessItemCategoryEvent } from '../../events/UpdateViewGuessItemCategoryEvent';
import { updateViewGuessItemAltNamesEvent } from '../../events/UpdateViewGuessItemAltNamesEvent';
import { closeGuessItemViewEvent } from '../../events/CloseGuessItemViewEvent';
import { updateViewGuessItemHintTextEvent } from '../../events/UpdateViewGuessItemHintTextEvent';
import { updateViewGuessItemHintLevelEvent } from '../../events/UpdateViewGuessItemHintLevelEvent';
import { viewGuessItemAddHintEvent } from '../../events/ViewGuessItemAddHintEvent';
import { viewGuessItemRemoveHintEvent } from '../../events/ViewGuessItemRemoveHintEvent';
import { updateViewGuessItemStatusEvent } from '../../events/UpdateViewGuessItemStatusEvent';

const useStyles = makeStyles({
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  noMargin: {
    margin: 'unset',
  },
  select: {
    width: '100%',
  },
});

interface ICState {
  strings: {
    title: string,
    alternateNames: string,
    hints: string,
    backBtn: string,
    saveBtn: string,
  },
  itemId: string | null;
  item: GuessItemDto | null;
}

const mapState = (state: IState): ICState => ({
  strings: {
    title: state.strings.guessItemView.title,
    alternateNames: state.strings.guessItemView.alternateNames,
    hints: state.strings.guessItemView.hints,
    backBtn: state.strings.guessItemView.backBtn,
    saveBtn: state.strings.guessItemView.saveBtn,
  },
  itemId: state.guessItemView.itemId,
  item: state.guessItemView.item,
});

interface IActions {
  setTitle: (title: string) => void;
  setCategory: (category: Category) => void;
  setStatus: (status: GuessItemStatus) => void;
  setAlternateNames: (namesText: string) => void;
  setHintText: (hintId: string, title: string) => void;
  setHintLevel: (hintId: string, level: string) => void;
  addHint: () => void;
  removeHint: (hintId: string) => void;
  closeView: () => void;
}

const mapActions = (dispatch: Dispatch): IActions => ({
  setTitle: (title) => dispatch(updateViewGuessItemTitleEvent(title)),
  setCategory: (category) => dispatch(updateViewGuessItemCategoryEvent(category)),
  setStatus: (status) => dispatch(updateViewGuessItemStatusEvent(status)),
  setAlternateNames: (namesText) => dispatch(updateViewGuessItemAltNamesEvent(namesText.split('\n'))),
  setHintText: (hintId, title) => dispatch(updateViewGuessItemHintTextEvent(hintId, title)),
  setHintLevel: (hintId, level) => dispatch(updateViewGuessItemHintLevelEvent(hintId, level)),
  addHint: () => dispatch(viewGuessItemAddHintEvent()),
  removeHint: (hintId) => dispatch(viewGuessItemRemoveHintEvent(hintId)),
  closeView: () => dispatch(closeGuessItemViewEvent()),
});

function GuessItemView({
  strings,
  itemId,
  item,
  setTitle,
  setCategory,
  setStatus,
  setAlternateNames,
  setHintText,
  setHintLevel,
  addHint,
  removeHint,
  closeView,
}: ICState & IActions): JSX.Element {
  useEffect(() => {
    getManager().getGuessItemViewService().initialise();
  }, [itemId]);

  const classes = useStyles();

  const save = () => getManager().getGuessItemViewService().save();

  if (!item) {
    return (
      <Grid item xs={12} className={classes.center}>
        <CircularProgress />
      </Grid>
    );
  }

  const altNames: string = item.alternateNames.join('\n');

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} sm={9}>
            <FormGroup>
              <FormLabel>{strings.title}</FormLabel>
              <Input value={item.title} onChange={(e) => setTitle(e.target.value)} />
            </FormGroup>
          </Grid>
          <Hidden xsDown>
            <Grid item sm={1}></Grid>
          </Hidden>
          <Grid item xs={2}>
            <CategorySelect value={item.category} onChange={(c) => setCategory(c as Category)} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row-reverse">
          <Grid item xs={4}>
            <FormControl className={classes.select}>
              <InputLabel>Status</InputLabel>
              <Select value={item.status} onChange={(e) => setStatus(e.target.value as GuessItemStatus)}>
                <MenuItem value={GuessItemStatus.ACTIVE}>Show item to app users</MenuItem>
                <MenuItem value={GuessItemStatus.HIDDEN}>Hide item from app users</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          <FormLabel>{strings.alternateNames}</FormLabel>
          <TextField multiline value={altNames} onChange={(e) => setAlternateNames(e.target.value)} />
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <h2 className={classes.noMargin}>{strings.hints}</h2>
      </Grid>
      <Grid item xs={12}>
        <HintsTable items={item.hints} onChangeText={setHintText} onChangeLevel={setHintLevel} onRemove={removeHint} />
      </Grid>
      <Grid item xs={12}>
        <Fab color="primary" onClick={addHint}>
          <Add />
        </Fab>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Button variant="contained" onClick={closeView}>{strings.backBtn}</Button>
          </Grid>
          <Grid item xs={6} className={classes.right}>
            <Button variant="contained" color="primary" onClick={save}>{strings.saveBtn}</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default connect(mapState, mapActions)(GuessItemView);

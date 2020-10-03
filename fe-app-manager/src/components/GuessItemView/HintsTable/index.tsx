import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { ItemHintDto } from '@story-guess/ts-shared/dtos/guess/GuessItem';
import Row from './Row';
import { IState } from '../../../state';

const useStyles = makeStyles({
  wideCol: {
    minWidth: 300,
  },
});

interface IProps {
  items: ItemHintDto[];
  onChangeText: (hintId: string, title: string) => void;
  onChangeLevel: (hintId: string, level: string) => void;
  onRemove: (hintId: string) => void;
}

interface ICState {
  strings: {
    hintText: string;
    hintDifficultly: string;
  };
}

const mapState = (state: IState): ICState => ({
  strings: {
    hintText: state.strings.guessItemView.hintText,
    hintDifficultly: state.strings.guessItemView.hintDifficulty,
  },
});

function HintsTable({ items, onChangeText, onChangeLevel, onRemove, strings }: IProps & ICState): JSX.Element {
  const classes = useStyles();

  const rows = items.map((i) => (
    <Row key={i.id}
      hint={i}
      onChangeText={(t) => onChangeText(i.id, t)}
      onChangeLevel={(l) => onChangeLevel(i.id, l)}
      onRemove={() => onRemove(i.id)} />
  ));

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.wideCol}>{strings.hintText}</TableCell>
            <TableCell>{strings.hintDifficultly}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default connect(mapState)(HintsTable);

import React from 'react';
import { TableRow, TableCell, Input, IconButton, makeStyles } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import { ItemHintDto } from '@story-guess/ts-shared/dtos/guess/GuessItem';

const useStyles = makeStyles({
  input: {
    width: '100%',
  },
});

interface IProps {
  hint: ItemHintDto;
  onChangeText: (title: string) => void;
  onChangeLevel: (level: string) => void;
  onRemove: () => void;
}

export default function Row({ hint, onChangeText, onChangeLevel, onRemove }: IProps): JSX.Element {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell>
        <Input multiline className={classes.input} value={hint.text} onChange={(e) => onChangeText(e.target.value)} />
      </TableCell>
      <TableCell>
        <Input className={classes.input} value={hint.level} onChange={(e) => onChangeLevel(e.target.value)} />
      </TableCell>
      <TableCell>
        <IconButton onClick={onRemove}>
          <Cancel />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

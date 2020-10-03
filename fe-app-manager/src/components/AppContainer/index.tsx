import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Container, Button, Box, makeStyles, createStyles } from '@material-ui/core';
import { getManager } from '../../services/manager';
import { IState } from '../../state';
import GuessItemsList from '../GuessItemsList';

const useStyles = makeStyles(() => createStyles({
  spacer: {
    flexGrow: 1,
  },
  content: {
    paddingTop: 50,
  },
}));

interface ICState {
  strings: {
    logOutBtn: string;
  };
}

const mapState = (state: IState): ICState => ({
  strings: {
    logOutBtn: state.strings.appBar.logOutBtn,
  },
});

function AppContainer({ strings }: ICState): JSX.Element {
  const classes = useStyles();

  const logOut = () => getManager().getLogInService().logOut();

  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar>
          <Box className={classes.spacer} />
          <Button variant="outlined" onClick={logOut}>{strings.logOutBtn}</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.content}>
        <GuessItemsList />
      </Container>
    </>
  );
}

export default connect(mapState)(AppContainer);

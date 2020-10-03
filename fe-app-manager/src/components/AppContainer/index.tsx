import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Container, Button, Box, makeStyles } from '@material-ui/core';
import { getManager } from '../../services/manager';
import { IState } from '../../state';
import GuessItemsList from '../GuessItemsList';
import GuessItemView from '../GuessItemView';

const useStyles = makeStyles({
  spacer: {
    flexGrow: 1,
  },
  content: {
    paddingTop: 50,
  },
});

interface ICState {
  strings: {
    logOutBtn: string;
  };
  itemView: boolean;
}

const mapState = (state: IState): ICState => ({
  strings: {
    logOutBtn: state.strings.appBar.logOutBtn,
  },
  itemView: !!state.guessItemView.itemId,
});

function AppContainer({ strings, itemView }: ICState): JSX.Element {
  const classes = useStyles();

  const logOut = () => getManager().getLogInService().logOut();

  const MainComponent = () => {
    if (itemView) {
      return <GuessItemView />;
    } else {
      return <GuessItemsList />;
    }
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar>
          <Box className={classes.spacer} />
          <Button variant="outlined" onClick={logOut}>{strings.logOutBtn}</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.content}>
        {MainComponent()}
      </Container>
    </>
  );
}

export default connect(mapState)(AppContainer);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogIn from './components/LogIn';
import { IState } from './state';
import { getManager } from './services/manager';
import AppContainer from './components/AppContainer';

interface ICState {
  loggedIn: boolean;
}

const mapState = (state: IState): ICState => ({
  loggedIn: state.currentUser.loggedIn,
});

function App({ loggedIn }: ICState): JSX.Element {
  // Initial app start - check if we have a user session
  useEffect(() => {
    getManager().getLogInService().initialise();
  }, []);

  if (loggedIn) {
    return <AppContainer />;
  } else {
    return <LogIn />;
  }
}

export default connect(mapState)(App);

import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Button, Container, FormGroup, FormLabel, Grid, TextField, createStyles, makeStyles } from '@material-ui/core';
import { IState } from '../../state';
import { logInFormSetUsernameEvent } from '../../events/LogInFormSetUsernameEvent';
import { logInFormSetPasswordEvent } from '../../events/LogInFormSetPasswordEvent';
import { getManager } from '../../services/manager';

const useStyles = makeStyles(() => createStyles({
  centered: {
    textAlign: 'center',
  },
}));

interface ICState {
  username: string;
  password: string;
  error: boolean;
  strings: {
    username: string;
    password: string;
    logInBtn: string;
    failureMessage: string;
  };
}

const mapState = (state: IState): ICState => ({
  username: state.logInForm.username,
  password: state.logInForm.password,
  error: state.logInForm.error,
  strings: {
    username: state.strings.logInForm.usernameField,
    password: state.strings.logInForm.passwordField,
    logInBtn: state.strings.logInForm.logInBtn,
    failureMessage: state.strings.logInForm.failureMessage,
  },
});

interface IActions {
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
}

const mapActions = (dispatch: Dispatch): IActions => ({
  setUsername: (username) => dispatch(logInFormSetUsernameEvent(username)),
  setPassword: (password) => dispatch(logInFormSetPasswordEvent(password)),
});

function LogIn({ username, password, error, strings, setUsername, setPassword }: ICState & IActions): JSX.Element {
  const classes = useStyles();

  const onSubmit = () => getManager().getLogInService().logIn();

  return (
    <Container maxWidth="xs">
      <form className="log-in-form">
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <FormGroup>
              <FormLabel error={error}>{strings.username}</FormLabel>
              <TextField value={username} error={error} onChange={(e) => setUsername(e.target.value)} />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormLabel error={error}>{strings.password}</FormLabel>
              <TextField type="password"
                value={password}
                error={error}
                helperText={error && strings.failureMessage}
                onChange={(e) => setPassword(e.target.value)} />
            </FormGroup>
          </Grid>
          <Grid item xs={12} className={classes.centered}>
            <Button variant="contained" color="primary" onClick={onSubmit}>{strings.logInBtn}</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default connect(mapState, mapActions)(LogIn);

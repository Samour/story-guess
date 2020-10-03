import { combineReducers } from 'redux';
import config from './config';
import strings from './strings';
import currentUser from './currentUser';
import logInForm from './logInForm';
import guessItemsList from './guessItemsList';
import guessItemView from './guessItemView';

export default combineReducers({
  config,
  strings,
  currentUser,
  logInForm,
  guessItemsList,
  guessItemView,
});

import { combineReducers } from 'redux';
import config from './config';
import strings from './strings';
import guessItemsList from './guessItemsList';

export default combineReducers({
  config,
  strings,
  guessItemsList,
});
